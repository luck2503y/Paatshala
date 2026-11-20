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

  // State
  let currentBook = null;
  let currentChapterIndex = 0;
  let activeCategory = 'all';
  let searchQuery = '';
  let bookmarkedBookIds = JSON.parse(localStorage.getItem('paatshala-book-bookmarks') || '[]');
  let currentProseSizeRem = 1.0625;

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

  // 7. Category Filter Chips
  categoryChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category') || 'all';
      renderBooksGrid();
    });
  });

  // 8. Open Book Reader Functionality
  function openBookReader(book) {
    currentBook = book;
    currentChapterIndex = 0;

    // Populate Reader Meta
    readerBarTitle.textContent = book.title;
    readerCoverWrap.innerHTML = book.coverIllustration;
    readerCategoryPill.textContent = book.category;
    readerTitle.textContent = book.title;
    readerSubtitle.innerHTML = book.author 
      ? `<span class="reader-author-pill"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> By ${book.author}</span><div>${book.subtitle}</div>` 
      : book.subtitle;
    readerReadTime.textContent = book.readTime;
    readerChaptersCount.textContent = `${book.chapters.length} Chapters`;
    readerOverviewText.textContent = book.overview;

    // Bookmark State in Reader
    const isBookmarked = bookmarkedBookIds.includes(book.id);
    readerBookmarkBtn.classList.toggle('bookmarked', isBookmarked);

    // Build Chapter Tabs
    chapterTabsBar.innerHTML = '';
    book.chapters.forEach((ch, idx) => {
      const tab = document.createElement('button');
      tab.className = `chapter-tab-btn ${idx === 0 ? 'active' : ''}`;
      tab.textContent = `Ch ${ch.number}: ${ch.title}`;
      tab.addEventListener('click', () => {
        loadChapter(idx);
      });
      chapterTabsBar.appendChild(tab);
    });

    // Load First Chapter
    loadChapter(0);

    // Switch View
    homeView.style.display = 'none';
    readerView.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    showToast(`Reading: ${book.title}`);
  }

  // 9. Load Specific Chapter
  function loadChapter(index) {
    if (!currentBook || !currentBook.chapters[index]) return;
    currentChapterIndex = index;
    const chapter = currentBook.chapters[index];

    // Update chapter badge and title
    currentChapterBadge.textContent = `Chapter ${chapter.number}`;
    currentChapterTitle.textContent = chapter.title;
    storyProseContent.innerHTML = chapter.content;

    // Update active tab pill
    const tabs = chapterTabsBar.querySelectorAll('.chapter-tab-btn');
    tabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === index);
      if (idx === index) {
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });

    // Update Pager Buttons
    prevChapterBtn.disabled = index === 0;
    nextChapterBtn.disabled = index === currentBook.chapters.length - 1;

    // Update Reading Progress Bar
    const progressPercent = Math.round(((index + 1) / currentBook.chapters.length) * 100);
    readingProgressFill.style.width = `${progressPercent}%`;

    // Scroll smoothly to chapter heading
    currentChapterBadge.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Chapter Next / Prev Click Handlers
  prevChapterBtn.addEventListener('click', () => {
    if (currentChapterIndex > 0) {
      loadChapter(currentChapterIndex - 1);
    }
  });

  nextChapterBtn.addEventListener('click', () => {
    if (currentBook && currentChapterIndex < currentBook.chapters.length - 1) {
      loadChapter(currentChapterIndex + 1);
    }
  });

  // Reader Bookmark Toggle
  readerBookmarkBtn.addEventListener('click', () => {
    if (currentBook) {
      toggleBookmark(currentBook.id);
    }
  });

  // 10. Close Reader & Return to Library
  function returnToLibrary() {
    readerView.style.display = 'none';
    homeView.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderBooksGrid();
  }

  readerBackBtn.addEventListener('click', returnToLibrary);
  finishReadingBtn.addEventListener('click', returnToLibrary);

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

  // Initial Render
  renderBooksGrid();

  // 12. Floating Action Button "D"
  const floatingDBtn = document.getElementById('floatingDBtn');
  if (floatingDBtn) {
    floatingDBtn.addEventListener('click', () => {
      showToast('Paatshala - Discover India through stories!');
    });
  }
});
