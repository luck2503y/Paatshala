/**
 * Paatshala - Mobile Chatting App Login Screen Interaction Script
 * Clean, lightweight, zero-dependency frontend interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const usernameGroup = document.getElementById('usernameGroup');
  const passwordGroup = document.getElementById('passwordGroup');
  const usernameFeedback = document.getElementById('usernameFeedback');
  const passwordFeedback = document.getElementById('passwordFeedback');
  const passwordToggleBtn = document.getElementById('passwordToggleBtn');
  const loginBtn = document.getElementById('loginBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeText = document.getElementById('themeText');
  const viewToggleBtn = document.getElementById('viewToggleBtn');
  const currentTimeDisplay = document.getElementById('currentTime');

  // 1. Clock Update for Simulated Status Bar
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (currentTimeDisplay) {
      currentTimeDisplay.textContent = `${hours}:${minutes}`;
    }
  }
  updateClock();
  setInterval(updateClock, 30000);

  // 2. Show / Hide Password Toggle
  if (passwordToggleBtn && passwordInput) {
    passwordToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      passwordToggleBtn.classList.toggle('revealed', isPassword);
      passwordToggleBtn.setAttribute(
        'aria-label',
        isPassword ? 'Hide password' : 'Show password'
      );
    });
  }

  // 3. Clear validation errors on input
  usernameInput.addEventListener('input', () => {
    usernameGroup.classList.remove('has-error');
    usernameFeedback.textContent = '';
  });

  passwordInput.addEventListener('input', () => {
    passwordGroup.classList.remove('has-error');
    passwordFeedback.textContent = '';
  });

  // 4. Form Submission Simulation (Frontend only, no backend)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    let hasError = false;

    // Basic frontend presence check
    if (!username) {
      usernameGroup.classList.add('has-error');
      usernameFeedback.textContent = 'Please enter your username';
      usernameInput.focus();
      hasError = true;
    }

    if (!password) {
      passwordGroup.classList.add('has-error');
      passwordFeedback.textContent = 'Please enter your password';
      if (!hasError) passwordInput.focus();
      hasError = true;
    }

    if (hasError) return;

    // Simulate login button loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;

    setTimeout(() => {
      loginBtn.classList.remove('loading');
      loginBtn.disabled = false;

      // Show in-app toast feedback
      showToast(`Welcome back, @${username}! (Frontend demo)`);
    }, 850);
  });

  // 5. Toast Notification Helper
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toastNotification.classList.add('show');

    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3800);
  }

  // 6. Theme Switcher (Light / Dark)
  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (themeText) {
      themeText.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
    localStorage.setItem('paatshala-theme', theme);
  }

  const savedTheme = localStorage.getItem('paatshala-theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  }

  // 7. Preview View Toggle (Phone Frame vs Responsive Full Width)
  if (viewToggleBtn) {
    viewToggleBtn.addEventListener('click', () => {
      const isFullWidth = document.body.classList.toggle('full-width-mode');
      const textSpan = viewToggleBtn.querySelector('.btn-text');
      if (textSpan) {
        textSpan.textContent = isFullWidth ? 'Full Width' : 'Frame Mode';
      }
    });
  }
});
