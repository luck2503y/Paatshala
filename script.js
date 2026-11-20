/**
 * Paatshala - Modern Responsive Web Login Screen Interaction Script
 * Lightweight, zero-dependency frontend interactions.
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

  // 1. Show / Hide Password Toggle
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

  // 2. Clear validation errors on input
  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      usernameGroup.classList.remove('has-error');
      usernameFeedback.textContent = '';
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      passwordGroup.classList.remove('has-error');
      passwordFeedback.textContent = '';
    });
  }

  // 3. Form Submission Simulation (Frontend only, no backend)
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      let hasError = false;

      // Basic presence check
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

      // Save username for chat screen personalization
      localStorage.setItem('paatshala-user', username);

      setTimeout(() => {
        // Navigate to the Books & Stories Home Screen
        window.location.href = 'home.html';
      }, 600);
    });
  }

  // 4. Toast Notification Helper
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toastNotification.classList.add('show');

    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3800);
  }

  // 5. Theme Switcher (Light / Dark) with Persistence
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

  // 6. Floating Action Button "D"
  const floatingDBtn = document.getElementById('floatingDBtn');
  if (floatingDBtn) {
    floatingDBtn.addEventListener('click', () => {
      showToast('Paatshala - Ready to explore stories!');
    });
  }
});
