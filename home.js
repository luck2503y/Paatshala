/**
 * Paatshala - Books & Stories Home Screen and Reader Controller
 * Fictional educational stories inspired by Indian Government initiatives & national progress.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Home View
  const homeView = document.getElementById('homeView');
  const readerView = document.getElementById('readerView');
  const booksGrid = document.getElementById('booksGrid');
  const bookSearchInput = document.getElementById('bookSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const noBooksState = document.getElementById('noBooksState');
  const booksCountBadge = document.getElementById('booksCountBadge');
  const categoryChips = document.querySelectorAll('.chip-btn');
  const chipsScrollViewport = document.getElementById('chipsScrollViewport');
  const chipsPrevBtn = document.getElementById('chipsPrevBtn');
  const chipsNextBtn = document.getElementById('chipsNextBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const avatarMenuBtn = document.getElementById('avatarMenuBtn');
  const userPopover = document.getElementById('userPopover');
  const avatarInitials = document.getElementById('avatarInitials');
  const popoverUserName = document.getElementById('popoverUserName');
  const savedBookmarksBtn = document.getElementById('savedBookmarksBtn');
  const bookmarkCountDot = document.getElementById('bookmarkCountDot');
  const appToast = document.getElementById('appToast');
  const appToastText = document.getElementById('appToastText');

  // DOM Elements - Reader View
  const readerBackBtn = document.getElementById('readerBackBtn');
  const finishReadingBtn = document.getElementById('finishReadingBtn');
  const readerBarTitle = document.getElementById('readerBarTitle');
  const readerCoverWrap = document.getElementById('readerCoverWrap');
  const readerCategoryPill = document.getElementById('readerCategoryPill');
  const readerTitle = document.getElementById('readerTitle');
  const readerSubtitle = document.getElementById('readerSubtitle');
  const readerReadTime = document.getElementById('readerReadTime');
  const readerChaptersCount = document.getElementById('readerChaptersCount');
  const readerOverviewText = document.getElementById('readerOverviewText');
  const chapterTabsBar = document.getElementById('chapterTabsBar');
  const currentChapterBadge = document.getElementById('currentChapterBadge');
  const currentChapterTitle = document.getElementById('currentChapterTitle');
  const storyProseContent = document.getElementById('storyProseContent');
  const prevChapterBtn = document.getElementById('prevChapterBtn');
  const nextChapterBtn = document.getElementById('nextChapterBtn');
  const readerBookmarkBtn = document.getElementById('readerBookmarkBtn');
  const fontDecBtn = document.getElementById('fontDecBtn');
  const fontIncBtn = document.getElementById('fontIncBtn');
  const readingProgressFill = document.getElementById('readingProgressFill');
  const langBtnEn = document.getElementById('langBtnEn');
  const langBtnHinglish = document.getElementById('langBtnHinglish');
  const chapterABtn = document.getElementById('chapterABtn');
  const chapterDBtn = document.getElementById('chapterDBtn');

  // Visibility manager for A & D chat icons:
  // "A" icon: ONLY inside "Man's Search for Meaning"
  // "D" icon: ONLY inside "Starting Strength" (in the exact same position)
  // Both icons are completely hidden from all other books and from the library.
  function updateChatButtonsVisibility(bookId) {
    if (chapterABtn) {
      chapterABtn.style.display = (bookId === 'mans-search-for-meaning') ? 'flex' : 'none';
    }
    if (chapterDBtn) {
      chapterDBtn.style.display = (bookId === 'starting-strength') ? 'flex' : 'none';
    }
    if (window.setDChatVisibility) {
      window.setDChatVisibility(false);
    }
  }

  // State
  let currentBook = null;
  let currentChapterIndex = 0;
  let activeCategory = 'all';
  let searchQuery = '';
  let bookmarkedBookIds = JSON.parse(localStorage.getItem('paatshala-book-bookmarks') || '[]');
  let currentProseSizeRem = 1.0625;
  let currentLanguage = localStorage.getItem('paatshala-reading-lang') || 'en';

  // 1. Theme Management (Sync with Login page)
  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('paatshala-theme', theme);
  }
  const savedTheme = localStorage.getItem('paatshala-theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'light';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // 2. Personalize User Profile
  const loggedInUser = localStorage.getItem('paatshala-user');
  if (loggedInUser) {
    if (popoverUserName) popoverUserName.textContent = loggedInUser;
    if (avatarInitials) {
      const initials = loggedInUser.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      avatarInitials.textContent = initials || 'PS';
    }
  }

  if (avatarMenuBtn && userPopover) {
    avatarMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userPopover.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!userPopover.contains(e.target) && !avatarMenuBtn.contains(e.target)) {
        userPopover.classList.remove('show');
      }
    });
  }

  // 3. Toast Feedback Helper
  let toastTimer = null;
  function showToast(message) {
    if (!appToast || !appToastText) return;
    if (toastTimer) clearTimeout(toastTimer);
    appToastText.textContent = message;
    appToast.classList.add('show');
    toastTimer = setTimeout(() => {
      appToast.classList.remove('show');
    }, 2800);
  }

  // 4. Bookmark Helpers
  function updateBookmarkBadge() {
    if (bookmarkCountDot) {
      if (bookmarkedBookIds.length > 0) {
        bookmarkCountDot.style.display = 'block';
      } else {
        bookmarkCountDot.style.display = 'none';
      }
    }
  }
  updateBookmarkBadge();

  function toggleBookmark(bookId) {
    const index = bookmarkedBookIds.indexOf(bookId);
    let isBookmarked = false;
    if (index > -1) {
      bookmarkedBookIds.splice(index, 1);
      isBookmarked = false;
      showToast('Removed from saved bookmarks');
    } else {
      bookmarkedBookIds.push(bookId);
      isBookmarked = true;
      showToast('Story saved to bookmarks!');
    }
    localStorage.setItem('paatshala-book-bookmarks', JSON.stringify(bookmarkedBookIds));
    updateBookmarkBadge();
    renderBooksGrid();

    if (currentBook && currentBook.id === bookId) {
      readerBookmarkBtn.classList.toggle('bookmarked', isBookmarked);
    }
  }

  if (savedBookmarksBtn) {
    savedBookmarksBtn.addEventListener('click', () => {
      if (bookmarkedBookIds.length === 0) {
        showToast('No saved bookmarks yet. Tap the bookmark icon on any book.');
      } else {
        showToast(`${bookmarkedBookIds.length} bookmarked storybooks in your library.`);
      }
    });
  }

  // 5. Render Books Grid
  function renderBooksGrid() {
    if (!booksGrid) return;
    booksGrid.innerHTML = '';

    const filtered = BOOKS_DATA.filter((book) => {
      const matchesCategory = activeCategory === 'all' || book.category.toLowerCase() === activeCategory.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        book.title.toLowerCase().includes(q) || 
        book.subtitle.toLowerCase().includes(q) || 
        (book.author && book.author.toLowerCase().includes(q)) ||
        book.category.toLowerCase().includes(q) || 
        book.shortDescription.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      noBooksState.style.display = 'flex';
      booksGrid.style.display = 'none';
      if (booksCountBadge) booksCountBadge.textContent = '0 Books';
    } else {
      noBooksState.style.display = 'none';
      booksGrid.style.display = 'grid';
      if (booksCountBadge) booksCountBadge.textContent = `${filtered.length} Book${filtered.length > 1 ? 's' : ''}`;

      filtered.forEach((book) => {
        const isBookmarked = bookmarkedBookIds.includes(book.id);

        const card = document.createElement('article');
        card.className = 'book-card';
        card.setAttribute('data-id', book.id);

        card.innerHTML = `
          <div class="book-cover-container">
            ${book.coverIllustration}
            <div class="book-spine-shadow" aria-hidden="true"></div>
            <span class="card-badge-tag">${book.coverBadge}</span>
            <button class="card-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" title="Bookmark story" data-book-id="${book.id}">
              <svg viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
          <div class="book-info-body">
            <div class="book-meta-top">
              <span class="book-category">${book.category}</span>
              <span class="book-time">${book.readTime}</span>
            </div>
            <h4 class="book-title">${book.title}</h4>
            ${book.author ? `<p class="book-author"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>By ${book.author}</p>` : ''}
            <p class="book-subtitle">${book.subtitle}</p>
            <p class="book-description">${book.shortDescription}</p>
            <div class="book-card-cta">
              <span>Read Story</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        `;

        // Card Bookmark Button Handler
        const bmBtn = card.querySelector('.card-bookmark-btn');
        bmBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleBookmark(book.id);
        });

        // Open Book Reader Handler
        card.addEventListener('click', () => {
          openBookReader(book);
        });

        booksGrid.appendChild(card);
      });
    }
  }

  // 6. Search Bar Filtering
  if (bookSearchInput) {
    bookSearchInput.addEventListener('input', () => {
      searchQuery = bookSearchInput.value.trim();
      if (searchQuery.length > 0) {
        clearSearchBtn.classList.add('show');
      } else {
        clearSearchBtn.classList.remove('show');
      }
      renderBooksGrid();
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        bookSearchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.remove('show');
        renderBooksGrid();
        bookSearchInput.focus();
      });
    }
  }

  // 7. Category Filter Chips & Smooth Sliding Controls
  function updateChipsNavButtons() {
    if (!chipsScrollViewport || !chipsPrevBtn || !chipsNextBtn) return;
    const scrollLeft = chipsScrollViewport.scrollLeft;
    const maxScroll = chipsScrollViewport.scrollWidth - chipsScrollViewport.clientWidth;

    // Show/hide left button
    chipsPrevBtn.style.display = scrollLeft > 10 ? 'flex' : 'none';
    // Show/hide right button
    chipsNextBtn.style.display = scrollLeft < maxScroll - 10 ? 'flex' : 'none';
  }

  if (chipsScrollViewport) {
    // Arrow button click handlers
    if (chipsNextBtn) {
      chipsNextBtn.addEventListener('click', () => {
        chipsScrollViewport.scrollBy({ left: 240, behavior: 'smooth' });
      });
    }

    if (chipsPrevBtn) {
      chipsPrevBtn.addEventListener('click', () => {
        chipsScrollViewport.scrollBy({ left: -240, behavior: 'smooth' });
      });
    }

    chipsScrollViewport.addEventListener('scroll', updateChipsNavButtons);
    window.addEventListener('resize', updateChipsNavButtons);
    // Initial check
    setTimeout(updateChipsNavButtons, 200);

    // Mouse wheel horizontal scrolling
    chipsScrollViewport.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        chipsScrollViewport.scrollLeft += e.deltaY * 1.5;
        updateChipsNavButtons();
      }
    }, { passive: false });

    // Mouse drag-to-slide
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    chipsScrollViewport.addEventListener('mousedown', (e) => {
      isDown = true;
      hasDragged = false;
      chipsScrollViewport.classList.add('is-dragging');
      startX = e.pageX - chipsScrollViewport.offsetLeft;
      scrollStart = chipsScrollViewport.scrollLeft;
    });

    chipsScrollViewport.addEventListener('mouseleave', () => {
      isDown = false;
      chipsScrollViewport.classList.remove('is-dragging');
    });

    chipsScrollViewport.addEventListener('mouseup', () => {
      isDown = false;
      chipsScrollViewport.classList.remove('is-dragging');
    });

    chipsScrollViewport.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - chipsScrollViewport.offsetLeft;
      const walk = (x - startX) * 1.6;
      if (Math.abs(walk) > 4) {
        hasDragged = true;
      }
      chipsScrollViewport.scrollLeft = scrollStart - walk;
      updateChipsNavButtons();
    });

    // Chip click handling
    categoryChips.forEach((chip) => {
      chip.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategory = chip.getAttribute('data-category') || 'all';
        renderBooksGrid();

        // Smoothly center the clicked chip in view
        chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }

  // Language Helpers for English / Hinglish Toggle
  function getBookSubtitle(book) {
    if (currentLanguage === 'hinglish' && window.HINGLISH_DATA && window.HINGLISH_DATA[book.id] && window.HINGLISH_DATA[book.id].subtitle) {
      return window.HINGLISH_DATA[book.id].subtitle;
    }
    return book.subtitle;
  }

  function getBookOverview(book) {
    if (currentLanguage === 'hinglish' && window.HINGLISH_DATA && window.HINGLISH_DATA[book.id] && window.HINGLISH_DATA[book.id].overview) {
      return window.HINGLISH_DATA[book.id].overview;
    }
    return book.overview;
  }

  function getChapterData(book, index) {
    const defaultChapter = book.chapters[index];
    if (currentLanguage === 'hinglish' && window.HINGLISH_DATA && window.HINGLISH_DATA[book.id] && window.HINGLISH_DATA[book.id].chapters && window.HINGLISH_DATA[book.id].chapters[index]) {
      const hCh = window.HINGLISH_DATA[book.id].chapters[index];
      return {
        number: defaultChapter.number,
        title: hCh.title || defaultChapter.title,
        content: hCh.content || defaultChapter.content
      };
    }
    return defaultChapter;
  }

  function syncLanguageToggleState() {
    if (langBtnEn && langBtnHinglish) {
      langBtnEn.classList.toggle('active', currentLanguage === 'en');
      langBtnHinglish.classList.toggle('active', currentLanguage === 'hinglish');
      langBtnEn.setAttribute('aria-pressed', currentLanguage === 'en' ? 'true' : 'false');
      langBtnHinglish.setAttribute('aria-pressed', currentLanguage === 'hinglish' ? 'true' : 'false');
    }
  }

  function setLanguage(lang) {
    if (currentLanguage === lang) return;
    currentLanguage = lang;
    localStorage.setItem('paatshala-reading-lang', currentLanguage);
    syncLanguageToggleState();

    if (currentBook) {
      // Re-populate Subtitle & Overview in selected language
      const sub = getBookSubtitle(currentBook);
      readerSubtitle.innerHTML = currentBook.author 
        ? `<span class="reader-author-pill"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> By ${currentBook.author}</span><div>${sub}</div>` 
        : sub;
      readerOverviewText.textContent = getBookOverview(currentBook);

      // Re-render chapter tabs with translated titles
      renderChapterTabs();

      // Reload current chapter without jumping scroll
      loadChapter(currentChapterIndex, false);
    }
  }

  if (langBtnEn) {
    langBtnEn.addEventListener('click', () => setLanguage('en'));
  }
  if (langBtnHinglish) {
    langBtnHinglish.addEventListener('click', () => setLanguage('hinglish'));
  }

  // Expose current reading state for D chat navigation & restore
  window.getCurrentReadingState = function () {
    if (currentBook) {
      return {
        bookId: currentBook.id,
        chapterIndex: currentChapterIndex || 0,
        scrollY: Math.round(window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0)
      };
    }
    return null;
  };

  // Parse deep-linked book hash (#book=id&ch=index&scroll=pos)
  function parseBookHash(hashStr) {
    if (!hashStr || !hashStr.startsWith('#book=')) return null;
    const raw = hashStr.substring(6);
    const parts = raw.split('&');
    const bookId = decodeURIComponent(parts[0] || '');
    let chapterIndex = 0;
    let scrollY = 0;
    for (let i = 1; i < parts.length; i++) {
      const pair = parts[i].split('=');
      if (pair[0] === 'ch') chapterIndex = parseInt(pair[1], 10) || 0;
      if (pair[0] === 'scroll') scrollY = parseInt(pair[1], 10) || 0;
    }
    return { bookId, chapterIndex, scrollY };
  }

  // 8. Open Book Reader Functionality
  function openBookReader(book, pushHistory = true, initialChapter = 0, initialScroll = null) {
    currentBook = book;
    currentChapterIndex = initialChapter;

    syncLanguageToggleState();

    // Populate Reader Meta
    readerBarTitle.textContent = book.title;
    readerCoverWrap.innerHTML = book.coverIllustration;
    readerCategoryPill.textContent = book.category;
    readerTitle.textContent = book.title;
    const sub = getBookSubtitle(book);
    readerSubtitle.innerHTML = book.author 
      ? `<span class="reader-author-pill"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> By ${book.author}</span><div>${sub}</div>` 
      : sub;
    readerReadTime.textContent = book.readTime;
    readerChaptersCount.textContent = `${book.chapters.length} Chapters`;
    readerOverviewText.textContent = getBookOverview(book);

    // Bookmark State in Reader
    const isBookmarked = bookmarkedBookIds.includes(book.id);
    readerBookmarkBtn.classList.toggle('bookmarked', isBookmarked);

    // Build Chapter Tabs
    renderChapterTabs();

    // Load Requested Chapter (skip auto-scroll inside loadChapter if custom initialScroll is set)
    loadChapter(initialChapter, initialScroll === null);

    // Switch View
    homeView.style.display = 'none';
    readerView.style.display = 'flex';

    // Display chat icon strictly according to current book:
    // "A" icon only for "Man's Search for Meaning"
    // "D" icon only for "Starting Strength"
    updateChatButtonsVisibility(book.id);

    // Scroll restoration: restore exact reading scroll position if provided
    if (initialScroll !== null && !isNaN(initialScroll) && initialScroll > 0) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: initialScroll, behavior: 'auto' });
        setTimeout(() => {
          window.scrollTo({ top: initialScroll, behavior: 'auto' });
        }, 80);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Track state in browser history so browser Back/Forward cleanly toggles between book & library
    if (pushHistory) {
      history.pushState(
        { view: 'reader', bookId: book.id, chapter: initialChapter },
        document.title,
        window.location.pathname + '#book=' + encodeURIComponent(book.id) + '&ch=' + initialChapter
      );
    }
  }

  function renderChapterTabs() {
    if (!currentBook) return;
    chapterTabsBar.innerHTML = '';
    currentBook.chapters.forEach((ch, idx) => {
      const chData = getChapterData(currentBook, idx);
      const tab = document.createElement('button');
      tab.className = `chapter-tab-btn ${idx === currentChapterIndex ? 'active' : ''}`;
      tab.textContent = `Ch ${chData.number}: ${chData.title}`;
      tab.addEventListener('click', () => {
        loadChapter(idx, true);
      });
      chapterTabsBar.appendChild(tab);
    });
  }

  // 9. Load Specific Chapter
  function loadChapter(index, shouldScroll = true) {
    if (!currentBook || !currentBook.chapters[index]) return;
    currentChapterIndex = index;
    const chapter = getChapterData(currentBook, index);

    // Update chapter badge and title
    currentChapterBadge.textContent = `Chapter ${chapter.number}`;
    currentChapterTitle.textContent = chapter.title;
    storyProseContent.innerHTML = chapter.content;

    // Update active tab pill
    const tabs = chapterTabsBar.querySelectorAll('.chapter-tab-btn');
    tabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === index);
      if (idx === index && shouldScroll) {
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });

    // Update Pager Buttons
    prevChapterBtn.disabled = index === 0;
    nextChapterBtn.disabled = index === currentBook.chapters.length - 1;

    // Update Reading Progress Bar
    const progressPercent = Math.round(((index + 1) / currentBook.chapters.length) * 100);
    readingProgressFill.style.width = `${progressPercent}%`;

    // Sync history state with current chapter
    if (window.history && window.history.replaceState && currentBook) {
      history.replaceState(
        { view: 'reader', bookId: currentBook.id, chapter: index },
        document.title,
        window.location.pathname + '#book=' + encodeURIComponent(currentBook.id) + '&ch=' + index
      );
    }

    // Scroll smoothly to chapter heading if requested
    if (shouldScroll) {
      currentChapterBadge.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Chapter Next / Prev Click Handlers
  prevChapterBtn.addEventListener('click', () => {
    if (currentChapterIndex > 0) {
      loadChapter(currentChapterIndex - 1, true);
    }
  });

  nextChapterBtn.addEventListener('click', () => {
    if (currentBook && currentChapterIndex < currentBook.chapters.length - 1) {
      loadChapter(currentChapterIndex + 1, true);
    }
  });

  // Reader Bookmark Toggle
  readerBookmarkBtn.addEventListener('click', () => {
    if (currentBook) {
      toggleBookmark(currentBook.id);
    }
  });

  // 10. Close Reader & Return to Library
  function returnToLibrary(pushHistory = false) {
    currentBook = null;
    readerView.style.display = 'none';
    homeView.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderBooksGrid();

    // Ensure any password modal is closed and cannot linger
    if (window.closeChatPasswordModal) {
      window.closeChatPasswordModal();
    } else {
      const modal = document.getElementById('dPwdModalBackdrop');
      if (modal) modal.classList.remove('open');
    }

    // Hide chat icons when returning to library homepage
    updateChatButtonsVisibility(null);

    if (pushHistory) {
      history.pushState({ view: 'library' }, document.title, window.location.pathname);
    }
  }

  readerBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    returnToLibrary(true);
  });

  finishReadingBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    returnToLibrary(true);
  });

  // Browser Back & Forward Popstate Handler (Keeps navigation between Library & Book pages)
  window.addEventListener('popstate', (e) => {
    // Close password modal on any navigation
    if (window.closeChatPasswordModal) {
      window.closeChatPasswordModal();
    } else {
      const modal = document.getElementById('dPwdModalBackdrop');
      if (modal) modal.classList.remove('open');
    }

    const state = e.state;
    const hash = window.location.hash;

    if (state && state.view === 'reader' && state.bookId) {
      const targetBook = BOOKS_DATA.find(b => b.id === state.bookId);
      if (targetBook) {
        const ch = typeof state.chapter === 'number' ? state.chapter : 0;
        openBookReader(targetBook, false, ch, null);
        return;
      }
    } else if (hash && hash.startsWith('#book=')) {
      const parsed = parseBookHash(hash);
      if (parsed && parsed.bookId) {
        const targetBook = BOOKS_DATA.find(b => b.id === parsed.bookId);
        if (targetBook) {
          openBookReader(targetBook, false, parsed.chapterIndex || 0, parsed.scrollY || null);
          return;
        }
      }
    }

    // Default: Return to library view
    returnToLibrary(false);
  });

  // 11. Font Size Adjustment Controls
  fontDecBtn.addEventListener('click', () => {
    if (currentProseSizeRem > 0.85) {
      currentProseSizeRem -= 0.075;
      document.documentElement.style.setProperty('--prose-font-size', `${currentProseSizeRem}rem`);
      showToast('Text size reduced');
    }
  });

  fontIncBtn.addEventListener('click', () => {
    if (currentProseSizeRem < 1.45) {
      currentProseSizeRem += 0.075;
      document.documentElement.style.setProperty('--prose-font-size', `${currentProseSizeRem}rem`);
      showToast('Text size increased');
    }
  });

  if (chapterABtn) {
    chapterABtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.openChatPasswordModal) {
        window.openChatPasswordModal('A');
      }
    });
  }

  if (chapterDBtn) {
    chapterDBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.openChatPasswordModal) {
        window.openChatPasswordModal('D');
      }
    });
  }

  // Initial Library Render & History State
  if (!history.state || history.state.view !== 'library') {
    history.replaceState({ view: 'library' }, document.title, window.location.pathname);
  }

  renderBooksGrid();

  // Handle return-from-chat intent or deep-linked book hash
  let returnState = null;
  try {
    const savedReturn = sessionStorage.getItem('paatshala_return_to_reading');
    if (savedReturn) {
      sessionStorage.removeItem('paatshala_return_to_reading');
      returnState = JSON.parse(savedReturn);
    }
  } catch (e) {}

  if (returnState && returnState.bookId) {
    const matchedBook = BOOKS_DATA.find(b => b.id === returnState.bookId);
    if (matchedBook) {
      // Restore reader cleanly without pushing duplicate history entries
      openBookReader(matchedBook, false, returnState.chapterIndex || 0, returnState.scrollY || 0);
      if (window.history && window.history.replaceState) {
        history.replaceState(
          { view: 'reader', bookId: matchedBook.id, chapter: returnState.chapterIndex || 0 },
          document.title,
          window.location.pathname + '#book=' + encodeURIComponent(matchedBook.id) + '&ch=' + (returnState.chapterIndex || 0)
        );
      }
    }
  } else if (window.location.hash && window.location.hash.startsWith('#book=')) {
    const parsed = parseBookHash(window.location.hash);
    if (parsed && parsed.bookId) {
      const matchedBook = BOOKS_DATA.find(b => b.id === parsed.bookId);
      if (matchedBook) {
        openBookReader(matchedBook, false, parsed.chapterIndex || 0, parsed.scrollY || null);
      }
    }
  } else {
    // Hide chat icons on main library page
    updateChatButtonsVisibility(null);
  }

  // Ensure password modal is completely closed on initial page load or restore
  if (window.closeChatPasswordModal) {
    window.closeChatPasswordModal();
  }
  window.addEventListener('pageshow', () => {
    if (window.closeChatPasswordModal) {
      window.closeChatPasswordModal();
    }
  });
});
