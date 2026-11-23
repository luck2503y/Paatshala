/**
 * Paatshala - Floating "D" Button with Password Access Modal
 * Prompts for password when clicking D button, then navigates to dedicated chat page.
 */

(function () {
  // Modal HTML Markup
  const WIDGET_AND_MODAL_HTML = `
    <!-- Password Verification Modal Backdrop -->
    <div class="d-pwd-modal-backdrop" id="dPwdModalBackdrop" role="dialog" aria-modal="true" aria-labelledby="dPwdTitle">
      <div class="d-pwd-modal-card">
        
        <!-- Close Corner Button -->
        <button type="button" class="d-pwd-modal-close" id="dPwdModalClose" aria-label="Cancel and close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Header -->
        <div class="d-pwd-header">
          <div class="d-pwd-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 class="d-pwd-title" id="dPwdTitle">Protected Chat Access</h3>
        </div>

        <!-- Password Form -->
        <form class="d-pwd-form" id="dPwdForm" novalidate>
          <div class="d-pwd-field">
            <label for="dPwdInput" class="d-pwd-label">Password</label>
            <div class="d-pwd-input-wrap" id="dPwdInputWrap">
              <span class="d-pwd-input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input 
                type="password" 
                id="dPwdInput" 
                class="d-pwd-input" 
                placeholder="Enter password" 
                autocomplete="current-password"
                required
              >
              <button type="button" class="d-pwd-toggle-btn" id="dPwdToggleBtn" aria-label="Show password">
                <svg class="pwd-eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg class="pwd-eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
            <span class="d-pwd-error-msg" id="dPwdErrorMsg"></span>
          </div>

          <button type="submit" class="d-pwd-submit-btn" id="dPwdSubmitBtn">
            <span>Unlock &amp; Enter Chat</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>

      </div>
    </div>
  `;

  // Global visibility controller for floating D chat button
  window.setDChatVisibility = function (visible) {
    const widget = document.getElementById('dChatWidget');
    if (widget) {
      widget.classList.toggle('visible', !!visible);
    }
  };

  document.addEventListener('DOMContentLoaded', initPasswordChatWidget);

  function initPasswordChatWidget() {
    // Clean up existing standalone button if present
    const oldBtn = document.getElementById('floatingDBtn');
    if (oldBtn) oldBtn.remove();

    const oldBackdrop = document.getElementById('dPwdModalBackdrop');
    if (oldBackdrop) oldBackdrop.remove();

    const oldWidget = document.getElementById('dChatWidget');
    if (oldWidget) oldWidget.remove();

    // Inject modal & widget markup
    document.body.insertAdjacentHTML('beforeend', WIDGET_AND_MODAL_HTML);

    // Initial visibility: only visible if book reader is currently open
    const readerView = document.getElementById('readerView');
    const isReaderOpen = readerView && readerView.style.display === 'flex';
    window.setDChatVisibility(isReaderOpen);

    // Elements
    const floatingDBtn = document.getElementById('floatingDBtn');
    const dPwdModalBackdrop = document.getElementById('dPwdModalBackdrop');
    const dPwdModalClose = document.getElementById('dPwdModalClose');
    const dPwdForm = document.getElementById('dPwdForm');
    const dPwdInput = document.getElementById('dPwdInput');
    const dPwdInputWrap = document.getElementById('dPwdInputWrap');
    const dPwdToggleBtn = document.getElementById('dPwdToggleBtn');
    const dPwdErrorMsg = document.getElementById('dPwdErrorMsg');
    const dPwdSubmitBtn = document.getElementById('dPwdSubmitBtn');
    const dBtnPing = document.getElementById('dBtnPing');
    const dPwdTitle = document.getElementById('dPwdTitle');

    let currentParticipantRole = 'D';

    // 1. Open Password Modal when clicking "D" or "A"
    function openPasswordModal(participant = 'D') {
      currentParticipantRole = participant === 'A' ? 'A' : 'D';
      if (dPwdTitle) {
        dPwdTitle.textContent = `Participant ${currentParticipantRole} Chat Access`;
      }

      // Capture source book reading state before opening password modal
      if (window.getCurrentReadingState) {
        const state = window.getCurrentReadingState();
        if (state && state.bookId) {
          sessionStorage.setItem('paatshala_chat_source_book', JSON.stringify(state));
        }
      }

      dPwdModalBackdrop.classList.add('open');
      dPwdErrorMsg.classList.remove('visible');
      dPwdErrorMsg.textContent = '';
      dPwdInputWrap.classList.remove('error');
      dPwdInput.value = '';
      setTimeout(() => {
        dPwdInput.focus();
      }, 150);
    }

    // Expose modal controllers globally
    window.openChatPasswordModal = openPasswordModal;
    window.closeChatPasswordModal = closePasswordModal;

    // 2. Close Modal
    function closePasswordModal() {
      dPwdModalBackdrop.classList.remove('open');
      if (dPwdErrorMsg) {
        dPwdErrorMsg.classList.remove('visible');
        dPwdErrorMsg.textContent = '';
      }
      if (dPwdInputWrap) {
        dPwdInputWrap.classList.remove('error');
      }
    }

    // Ensure modal is strictly closed on page navigation, back/forward or BFCache restore
    window.addEventListener('pageshow', closePasswordModal);
    window.addEventListener('popstate', closePasswordModal);
    window.addEventListener('pagehide', closePasswordModal);

    if (floatingDBtn) {
      floatingDBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPasswordModal('D');
      });
    }

    // Bind click event to "D" icon
    const chapterDBtn = document.getElementById('chapterDBtn');
    if (chapterDBtn) {
      chapterDBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPasswordModal('D');
      });
    }

    // Bind click event to "A" icon
    const chapterABtn = document.getElementById('chapterABtn');
    if (chapterABtn) {
      chapterABtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPasswordModal('A');
      });
    }

    // Delegated click listener for "D" and "A" icons
    document.addEventListener('click', (e) => {
      const dBtn = e.target.closest('#chapterDBtn, .chapter-d-btn, #floatingDBtn');
      if (dBtn) {
        e.stopPropagation();
        openPasswordModal('D');
        return;
      }
      const aBtn = e.target.closest('#chapterABtn, .chapter-a-btn');
      if (aBtn) {
        e.stopPropagation();
        openPasswordModal('A');
        return;
      }
    });

    if (dPwdModalClose) {
      dPwdModalClose.addEventListener('click', closePasswordModal);
    }

    // Close when clicking backdrop outside card
    dPwdModalBackdrop.addEventListener('click', (e) => {
      if (e.target === dPwdModalBackdrop) {
        closePasswordModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dPwdModalBackdrop.classList.contains('open')) {
        closePasswordModal();
      }
    });

    // 3. Password Toggle Visibility
    if (dPwdToggleBtn) {
      dPwdToggleBtn.addEventListener('click', () => {
        const isPassword = dPwdInput.getAttribute('type') === 'password';
        dPwdInput.setAttribute('type', isPassword ? 'text' : 'password');
        dPwdToggleBtn.classList.toggle('revealed', isPassword);
      });
    }

    // Clear error on input typing
    dPwdInput.addEventListener('input', () => {
      dPwdInputWrap.classList.remove('error');
      dPwdErrorMsg.classList.remove('visible');
      dPwdErrorMsg.textContent = '';
    });

    // 4. Submit & Verify Password
    dPwdForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPassword = dPwdInput.value.trim().toLowerCase();

      // Accepted passwords (including 2011, paatshala, and standard demo passwords)
      const validPasswords = ['2011', 'paatshala', '1234', 'admin', 'lucky', 'pass'];

      if (!enteredPassword) {
        dPwdInputWrap.classList.add('error');
        dPwdErrorMsg.textContent = 'Please enter the password';
        dPwdErrorMsg.classList.add('visible');
        dPwdInput.focus();
        return;
      }

      if (validPasswords.includes(enteredPassword)) {
        // Correct Password: Show success feedback and navigate
        dPwdSubmitBtn.innerHTML = `
          <span>Access Granted! Loading...</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        dPwdSubmitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        dPwdSubmitBtn.disabled = true;

        // Ensure source reading state is up to date
        if (window.getCurrentReadingState) {
          const state = window.getCurrentReadingState();
          if (state && state.bookId) {
            sessionStorage.setItem('paatshala_chat_source_book', JSON.stringify(state));
          }
        }

        // Generate one-time secure authorization ticket
        const accessTicket = 'auth_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('paatshala_chat_authorized_ticket', accessTicket);
        sessionStorage.setItem('paatshala_chat_authenticated', 'true');
        sessionStorage.setItem('paatshala_chat_user', currentParticipantRole);

        let queryParams = 'auth=' + accessTicket + '&user=' + encodeURIComponent(currentParticipantRole);
        try {
          const storedSource = sessionStorage.getItem('paatshala_chat_source_book');
          if (storedSource) {
            const parsed = JSON.parse(storedSource);
            if (parsed && parsed.bookId) {
              queryParams += `&fromBook=${encodeURIComponent(parsed.bookId)}&ch=${parsed.chapterIndex || 0}&scroll=${parsed.scrollY || 0}`;
            }
          }
        } catch (e) {}

        setTimeout(() => {
          // Immediately close and reset password modal BEFORE navigating away
          closePasswordModal();
          dPwdSubmitBtn.disabled = false;
          dPwdSubmitBtn.style.background = '';
          dPwdSubmitBtn.innerHTML = `
            <span>Unlock &amp; Enter Chat</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          `;
          // Open dedicated chat page strictly passing the authorized ticket and source book params
          window.location.href = 'chat.html?' + queryParams;
        }, 350);

      } else {
        // Incorrect Password
        dPwdInputWrap.classList.add('error');
        dPwdErrorMsg.textContent = 'Incorrect password. Please try again.';
        dPwdErrorMsg.classList.add('visible');
        dPwdInput.select();
      }
    });

    // 5. Real-Time Online Status Sync for A & D Icons on Book Reading Page
    const presenceChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('paatshala_presence_sync') : null;

    function applyPresence(presence) {
      // Online/offline indicator is shown inside the chat page only, not on floating icons
      return;
    }

    async function checkServerPresence() {
      try {
        const res = await fetch('/api/presence?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const presence = await res.json();
          applyPresence(presence);
        }
      } catch (e) {}
    }

    // Initial check & periodic polling
    checkServerPresence();
    setInterval(checkServerPresence, 2000);

    // BroadcastChannel cross-tab instant sync
    if (presenceChannel) {
      presenceChannel.onmessage = (event) => {
        // Presence is monitored for chat page only, not shown on floating icons
      };
    }

    // LocalStorage fallback sync
    window.addEventListener('storage', (e) => {
      if (e.key === 'paatshala_presence_A' || e.key === 'paatshala_presence_D') {
        const aOnline = localStorage.getItem('paatshala_presence_A') === 'online';
        const dOnline = localStorage.getItem('paatshala_presence_D') === 'online';
        applyPresence({ A: aOnline, D: dOnline });
      }
    });

    window.addEventListener('pageshow', checkServerPresence);
  }
})();
