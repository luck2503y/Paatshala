# Paatshala - Mobile Chatting App Login Screen

A modern, clean, and mobile-friendly login screen for **Paatshala**, a mobile chatting application.

---

## 📱 Features Included

- **App Branding:** **Paatshala** title with an emblem blending educational & chatting aesthetics ("Classroom & Campus Chat").
- **Heading:** Clear **Login** header with a welcoming subtitle.
- **Input Fields:**
  - **Username Field:** With icon and validation states.
  - **Password Field:** With lock icon and an interactive **Show/Hide password** toggle button.
- **Login Button:** Gradient button with hover elevation, active touch feedback, and smooth loading state simulation.
- **Mobile First & Responsive:**
  - On desktop screens, it defaults to an iPhone/Android style mobile frame preview (with simulated status bar, time, dynamic island, and home indicator).
  - A toolbar at the top lets you toggle between **Frame Mode** and **Full-Screen Responsive Mode**.
  - On actual mobile devices (`< 480px`), it natively scales 100% full-bleed with safe-area padding for notches.
- **Theme Support:** One-click toggle between **Light Mode** and **Dark Mode** with `localStorage` persistence.
- **Zero Backend Dependencies:** Strictly frontend design — no database, authentication, or external npm dependencies required.

---

## 🚀 How to Run & Preview

### Option 1: Open Directly in Any Browser
Simply double-click or open `index.html` in your favorite web browser (Chrome, Edge, Safari, Firefox).

```bash
# Windows PowerShell command to launch in default browser:
Start-Process index.html
```

### Option 2: Run with a Local Static Server
If you prefer running a local development server (e.g., using Node.js or Python):

```bash
# Using Python:
python -m http.server 3000

# Or using npx serve:
npx serve .
```
Then visit `http://localhost:3000`.

---

## 📂 File Structure

```
Paatshala/
├── index.html        # Semantic HTML5 layout with SVG icons & accessibility attributes
├── style.css         # Modern CSS with custom properties (CSS variables) for light/dark themes
├── script.js         # Lightweight vanilla JS for password toggle, theme switcher, & demo UX
└── README.md         # Documentation & guide
```

---

## 🎨 Design System Specifications

| Token | Light Theme | Dark Theme |
| :--- | :--- | :--- |
| **Primary Color** | `#4F46E5` (Indigo) | `#6366F1` (Electric Indigo) |
| **Background** | `#EEF2F6` | `#07090E` |
| **Card / Screen**| `#FFFFFF` | `#0F172A` |
| **Text Primary** | `#0F172A` | `#F8FAFC` |
| **Text Secondary**| `#475569` | `#CBD5E1` |
| **Typography** | Plus Jakarta Sans / Inter / System UI | Plus Jakarta Sans / Inter / System UI |
| **Border Radius**| `14px` (Inputs & Buttons) | `14px` (Inputs & Buttons) |

---

## 🔌 Connecting to Backend (When Ready)

When you are ready to add real authentication and database support, update the form submission handler in `script.js`:

```javascript
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // Example API call:
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username, password })
  // });
  // const data = await response.json();
});
```
