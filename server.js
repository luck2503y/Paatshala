import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let PORT = parseInt(process.env.PORT || '5500', 10);
const DB_FILE = path.join(__dirname, 'chat-db.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Database Read/Write Helpers
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading chat DB:', err);
    return [];
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing chat DB:', err);
    return false;
  }
}

function requestHandler(req, res) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqUrl = req.url.split('?')[0];

  // REST API Endpoints for Shared Chat Synchronization
  if (reqUrl === '/api/messages') {
    if (req.method === 'GET') {
      const messages = readDb();
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(JSON.stringify({ messages }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 50 * 1024 * 1024) { // 50MB protection
          req.destroy();
        }
      });

      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          let messages = readDb();

          if (payload.action === 'send' && payload.message) {
            messages.push(payload.message);
          } else if (payload.action === 'edit' && payload.id) {
            const target = messages.find(m => m.id === payload.id);
            if (target) {
              target.text = payload.text;
              target.isEdited = true;
            }
          } else if (payload.action === 'deleteForEveryone' && payload.id) {
            messages = messages.filter(m => m.id !== payload.id);
          } else if (payload.action === 'deleteForMe' && payload.id && payload.user) {
            const target = messages.find(m => m.id === payload.id);
            if (target) {
              if (!target.deletedFor) target.deletedFor = [];
              if (!target.deletedFor.includes(payload.user)) {
                target.deletedFor.push(payload.user);
              }
            }
          } else if (payload.action === 'markRead' && payload.reader) {
            messages.forEach(m => {
              if (m.sender !== payload.reader && m.status !== 'read') {
                m.status = 'read';
              }
            });
          } else if (payload.action === 'clear') {
            const clearUser = payload.user;
            if (clearUser) {
              // Participant-specific clear: hide existing messages only for this user
              messages.forEach(m => {
                if (!m.deletedFor) m.deletedFor = [];
                if (!m.deletedFor.includes(clearUser)) {
                  m.deletedFor.push(clearUser);
                }
              });
            }
          } else if (payload.action === 'sync' && Array.isArray(payload.messages)) {
            messages = payload.messages;
          } else if (Array.isArray(payload)) {
            messages = payload;
          } else if (Array.isArray(payload.messages)) {
            messages = payload.messages;
          }

          writeDb(messages);
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          });
          res.end(JSON.stringify({ success: true, messages }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }
  }

  // Static File Serving
  if (reqUrl === '/') reqUrl = '/index.html';

  const filePath = path.join(__dirname, reqUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
}

function startServer(portToTry) {
  const srv = http.createServer(requestHandler);
  srv.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${portToTry} is in use, trying ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  srv.listen(portToTry, '0.0.0.0', () => {
    console.log(`SERVER_READY_AT http://localhost:${portToTry}/`);
  });
}

startServer(PORT);
