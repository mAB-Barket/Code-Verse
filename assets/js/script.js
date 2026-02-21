/* ============================================
   CodeVerse - Liquid Crystal Engine v3.0
   Apple-Inspired Interactive Experience
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // =========================
    // SCROLL PROGRESS BAR
    // =========================
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        // Auto-inject scroll progress bar if missing
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.prepend(bar);
    }

    function updateScrollProgress() {
        const bar = document.querySelector('.scroll-progress');
        if (!bar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // =========================
    // THEME MANAGEMENT
    // =========================
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('codeverse-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('codeverse-theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        themeToggle.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
        themeToggle.setAttribute('aria-label',
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    // =========================
    // STICKY HEADER
    // =========================
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    // =========================
    // MOBILE MENU
    // =========================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            mainNav.classList.toggle('mobile-open');
            document.body.style.overflow =
                mainNav.classList.contains('mobile-open') ? 'hidden' : '';
        });
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.closest('.nav-dropdown') &&
                    link.parentElement.classList.contains('nav-dropdown')) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        link.parentElement.classList.toggle('dropdown-open');
                        return;
                    }
                }
                mobileBtn.classList.remove('active');
                mainNav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            });
        });
    }

    // =========================
    // HEADER SEARCH
    // =========================
    (function initHeaderSearch() {
        const headerSearch = document.querySelector('.header-search');
        if (!headerSearch) return;

        const toggleBtn = headerSearch.querySelector('.header-search-toggle');
        const input = headerSearch.querySelector('.header-search-input');
        const dropdown = headerSearch.querySelector('.header-search-dropdown');
        if (!toggleBtn || !input || !dropdown) return;

        // Determine base path (are we in a subdirectory?)
        const inSubdir = window.location.pathname.includes('/cpp/') ||
                         window.location.pathname.includes('/python/') ||
                         window.location.pathname.includes('/javascript/') ||
                         window.location.pathname.includes('/java/') ||
                         window.location.pathname.includes('/csharp/') ||
                         window.location.pathname.includes('/go/') ||
                         window.location.pathname.includes('/rust/') ||
                         window.location.pathname.includes('/webdev/');
        const base = inSubdir ? '../' : '';

        const headerIndex = [
            { title: 'C++ Programming', meta: '55 Lessons · 10 Modules', url: base + 'cpp/index.html', icon: 'C++', cat: 'Courses' },
            { title: 'Python', meta: 'Coming Soon', url: base + 'python/index.html', icon: 'Py', cat: 'Courses' },
            { title: 'JavaScript', meta: 'Coming Soon', url: base + 'javascript/index.html', icon: 'JS', cat: 'Courses' },
            { title: 'Java', meta: 'Coming Soon', url: base + 'java/index.html', icon: 'Jv', cat: 'Courses' },
            { title: 'C#', meta: 'Coming Soon', url: base + 'csharp/index.html', icon: 'C#', cat: 'Courses' },
            { title: 'Web Development', meta: 'Coming Soon', url: base + 'webdev/index.html', icon: 'Web', cat: 'Courses' },
            { title: 'Rust', meta: 'Coming Soon', url: base + 'rust/index.html', icon: 'Rs', cat: 'Courses' },
            { title: 'Go', meta: 'Coming Soon', url: base + 'go/index.html', icon: 'Go', cat: 'Courses' },
            { title: 'Introduction to C++', meta: 'Lesson 1', url: base + 'cpp/introduction.html', icon: '1', cat: 'C++ Lessons' },
            { title: 'Setting Up C++', meta: 'Lesson 2', url: base + 'cpp/setup.html', icon: '2', cat: 'C++ Lessons' },
            { title: 'First Program', meta: 'Lesson 3', url: base + 'cpp/first-program.html', icon: '3', cat: 'C++ Lessons' },
            { title: 'Basic Syntax', meta: 'Lesson 4', url: base + 'cpp/basic-syntax.html', icon: '4', cat: 'C++ Lessons' },
            { title: 'Comments', meta: 'Lesson 5', url: base + 'cpp/comments.html', icon: '5', cat: 'C++ Lessons' },
            { title: 'Variables', meta: 'Lesson 6', url: base + 'cpp/variables.html', icon: '6', cat: 'C++ Lessons' },
            { title: 'Data Types', meta: 'Lesson 7', url: base + 'cpp/data-types.html', icon: '7', cat: 'C++ Lessons' },
            { title: 'Input & Output', meta: 'Lesson 8', url: base + 'cpp/input-output.html', icon: '8', cat: 'C++ Lessons' },
            { title: 'Operators', meta: 'Lesson 9', url: base + 'cpp/operators.html', icon: '9', cat: 'C++ Lessons' },
            { title: 'If-Else Statements', meta: 'Lesson 10', url: base + 'cpp/if-else.html', icon: '10', cat: 'C++ Lessons' },
            { title: 'Switch Statement', meta: 'Lesson 11', url: base + 'cpp/switch.html', icon: '11', cat: 'C++ Lessons' },
            { title: 'For Loops', meta: 'Lesson 12', url: base + 'cpp/for-loops.html', icon: '12', cat: 'C++ Lessons' },
            { title: 'While Loops', meta: 'Lesson 13', url: base + 'cpp/while-loops.html', icon: '13', cat: 'C++ Lessons' },
            { title: 'Nested Loops', meta: 'Lesson 14', url: base + 'cpp/nested-loops.html', icon: '14', cat: 'C++ Lessons' },
            { title: 'Break & Continue', meta: 'Lesson 15', url: base + 'cpp/break-continue.html', icon: '15', cat: 'C++ Lessons' },
            { title: 'Functions', meta: 'Lesson 16', url: base + 'cpp/functions.html', icon: '16', cat: 'C++ Lessons' },
            { title: 'Function Parameters', meta: 'Lesson 17', url: base + 'cpp/function-parameters.html', icon: '17', cat: 'C++ Lessons' },
            { title: 'Return Values', meta: 'Lesson 18', url: base + 'cpp/return-values.html', icon: '18', cat: 'C++ Lessons' },
            { title: 'Function Overloading', meta: 'Lesson 19', url: base + 'cpp/function-overloading.html', icon: '19', cat: 'C++ Lessons' },
            { title: 'Recursion', meta: 'Lesson 20', url: base + 'cpp/recursion.html', icon: '20', cat: 'C++ Lessons' },
            { title: 'Inline & Lambda', meta: 'Lesson 21', url: base + 'cpp/inline-lambda.html', icon: '21', cat: 'C++ Lessons' },
            { title: 'Arrays', meta: 'Lesson 22', url: base + 'cpp/arrays.html', icon: '22', cat: 'C++ Lessons' },
            { title: 'Multi-Dimensional Arrays', meta: 'Lesson 23', url: base + 'cpp/multi-arrays.html', icon: '23', cat: 'C++ Lessons' },
            { title: 'C-Strings', meta: 'Lesson 24', url: base + 'cpp/c-strings.html', icon: '24', cat: 'C++ Lessons' },
            { title: 'Strings', meta: 'Lesson 25', url: base + 'cpp/strings.html', icon: '25', cat: 'C++ Lessons' },
            { title: 'Pointers', meta: 'Lesson 26', url: base + 'cpp/pointers.html', icon: '26', cat: 'C++ Lessons' },
            { title: 'Pointer Arithmetic', meta: 'Lesson 27', url: base + 'cpp/pointer-arithmetic.html', icon: '27', cat: 'C++ Lessons' },
            { title: 'Dynamic Memory', meta: 'Lesson 28', url: base + 'cpp/dynamic-memory.html', icon: '28', cat: 'C++ Lessons' },
            { title: 'References', meta: 'Lesson 29', url: base + 'cpp/references.html', icon: '29', cat: 'C++ Lessons' },
            { title: 'Classes & Objects', meta: 'Lesson 30', url: base + 'cpp/classes-objects.html', icon: '30', cat: 'C++ Lessons' },
            { title: 'Constructors', meta: 'Lesson 31', url: base + 'cpp/constructors.html', icon: '31', cat: 'C++ Lessons' },
            { title: 'Access Specifiers', meta: 'Lesson 32', url: base + 'cpp/access-specifiers.html', icon: '32', cat: 'C++ Lessons' },
            { title: 'Encapsulation', meta: 'Lesson 33', url: base + 'cpp/encapsulation.html', icon: '33', cat: 'C++ Lessons' },
            { title: 'Inheritance', meta: 'Lesson 34', url: base + 'cpp/inheritance.html', icon: '34', cat: 'C++ Lessons' },
            { title: 'Polymorphism', meta: 'Lesson 35', url: base + 'cpp/polymorphism.html', icon: '35', cat: 'C++ Lessons' },
            { title: 'Abstraction', meta: 'Lesson 36', url: base + 'cpp/abstraction.html', icon: '36', cat: 'C++ Lessons' },
            { title: 'Function Templates', meta: 'Lesson 37', url: base + 'cpp/function-templates.html', icon: '37', cat: 'C++ Lessons' },
            { title: 'Class Templates', meta: 'Lesson 38', url: base + 'cpp/class-templates.html', icon: '38', cat: 'C++ Lessons' },
            { title: 'Vectors', meta: 'Lesson 39', url: base + 'cpp/vectors.html', icon: '39', cat: 'C++ Lessons' },
            { title: 'Lists & Deques', meta: 'Lesson 40', url: base + 'cpp/lists-deques.html', icon: '40', cat: 'C++ Lessons' },
            { title: 'Maps & Sets', meta: 'Lesson 41', url: base + 'cpp/maps-sets.html', icon: '41', cat: 'C++ Lessons' },
            { title: 'Iterators', meta: 'Lesson 42', url: base + 'cpp/iterators.html', icon: '42', cat: 'C++ Lessons' },
            { title: 'STL Algorithms', meta: 'Lesson 43', url: base + 'cpp/stl-algorithms.html', icon: '43', cat: 'C++ Lessons' },
            { title: 'Exceptions', meta: 'Lesson 44', url: base + 'cpp/exceptions.html', icon: '44', cat: 'C++ Lessons' },
            { title: 'File I/O', meta: 'Lesson 45', url: base + 'cpp/file-io.html', icon: '45', cat: 'C++ Lessons' },
            { title: 'Namespaces', meta: 'Lesson 46', url: base + 'cpp/namespaces.html', icon: '46', cat: 'C++ Lessons' },
            { title: 'Smart Pointers', meta: 'Lesson 47', url: base + 'cpp/smart-pointers.html', icon: '47', cat: 'C++ Lessons' },
            { title: 'Move Semantics', meta: 'Lesson 48', url: base + 'cpp/move-semantics.html', icon: '48', cat: 'C++ Lessons' },
            { title: 'Multithreading', meta: 'Lesson 49', url: base + 'cpp/multithreading.html', icon: '49', cat: 'C++ Lessons' },
            { title: 'Modern C++', meta: 'Lesson 50', url: base + 'cpp/modern-cpp.html', icon: '50', cat: 'C++ Lessons' },
            { title: 'Debugging', meta: 'Lesson 51', url: base + 'cpp/debugging.html', icon: '51', cat: 'C++ Lessons' },
            { title: 'Code Style', meta: 'Lesson 52', url: base + 'cpp/code-style.html', icon: '52', cat: 'C++ Lessons' },
            { title: 'Version Control', meta: 'Lesson 53', url: base + 'cpp/version-control.html', icon: '53', cat: 'C++ Lessons' },
            { title: 'Testing', meta: 'Lesson 54', url: base + 'cpp/testing.html', icon: '54', cat: 'C++ Lessons' },
            { title: 'Projects', meta: 'Lesson 55', url: base + 'cpp/projects.html', icon: '55', cat: 'C++ Lessons' },
            { title: 'About CodeVerse', meta: 'Platform', url: base + 'about.html', icon: '&#9432;', cat: 'Pages' },
            { title: 'Resources', meta: 'Platform', url: base + 'resources.html', icon: '&#128218;', cat: 'Pages' },
        ];

        let navIdx = -1;

        function renderHeaderDropdown(query) {
            if (!query) { dropdown.classList.remove('visible'); navIdx = -1; return; }
            const q = query.toLowerCase();
            const results = headerIndex.filter(item =>
                item.title.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q)
            );
            if (results.length === 0) {
                dropdown.innerHTML = '<div class="dropdown-empty">&#128269; No results for "' + query + '"</div>';
                dropdown.classList.add('visible'); navIdx = -1; return;
            }
            const groups = {};
            results.forEach(item => { if (!groups[item.cat]) groups[item.cat] = []; groups[item.cat].push(item); });
            let html = '';
            Object.entries(groups).forEach(([cat, items]) => {
                html += '<div class="dropdown-header">' + cat + '</div>';
                items.slice(0, 8).forEach(item => {
                    html += '<a class="dropdown-item" href="' + item.url + '">'
                        + '<div class="item-icon">' + item.icon + '</div>'
                        + '<div class="item-info"><div class="item-title">' + item.title + '</div>'
                        + '<div class="item-meta">' + item.meta + '</div></div></a>';
                });
            });
            dropdown.innerHTML = html;
            dropdown.classList.add('visible'); navIdx = -1;
        }

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            input.focus();
        });

        input.addEventListener('input', () => renderHeaderDropdown(input.value.trim()));

        input.addEventListener('keydown', (e) => {
            const items = dropdown.querySelectorAll('.dropdown-item');
            if (e.key === 'ArrowDown' && items.length) {
                e.preventDefault(); navIdx = Math.min(navIdx + 1, items.length - 1);
                items.forEach((it, i) => it.classList.toggle('active', i === navIdx));
                items[navIdx].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp' && items.length) {
                e.preventDefault(); navIdx = Math.max(navIdx - 1, 0);
                items.forEach((it, i) => it.classList.toggle('active', i === navIdx));
                items[navIdx].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter' && navIdx >= 0 && items[navIdx]) {
                e.preventDefault(); items[navIdx].click();
            } else if (e.key === 'Escape') {
                input.value = ''; dropdown.classList.remove('visible'); input.blur();
            }
        });

        document.addEventListener('click', (e) => {
            if (!headerSearch.contains(e.target)) {
                dropdown.classList.remove('visible');
            }
        });
    })();

    // =========================
    // BACK TO TOP
    // =========================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================
    // SCROLL DOWN FAST BUTTON
    // =========================
    (function initScrollDown() {
        // Only add on tutorial pages (pages with main content)
        const mainContent = document.querySelector('.tutorial-content, .content-wrapper, main');
        if (!mainContent) return;

        // Create the scroll-down button
        const scrollDownBtn = document.createElement('button');
        scrollDownBtn.className = 'scroll-down-btn';
        scrollDownBtn.setAttribute('aria-label', 'Scroll down');
        scrollDownBtn.innerHTML = '&#8595;';
        document.body.appendChild(scrollDownBtn);

        // Show/hide: visible when NOT near bottom, hidden when at bottom
        function updateVisibility() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const nearBottom = scrollTop >= docHeight - 100;
            scrollDownBtn.classList.toggle('visible', scrollTop < docHeight - 100 && docHeight > 500);
        }
        window.addEventListener('scroll', updateVisibility, { passive: true });
        updateVisibility();

        // Smooth scroll down ~80% of viewport on each click
        scrollDownBtn.addEventListener('click', () => {
            const scrollAmount = window.innerHeight * 0.8;
            window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        });
    })();

    // =========================
    // SCROLL REVEAL ANIMATIONS
    // (with staggered delay support)
    // =========================
    const revealElements = document.querySelectorAll(
        '.animate-on-scroll, .reveal-left, .reveal-right, .reveal-scale'
    );

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class with optional stagger delay
                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, parseInt(delay, 10));
                    } else {
                        entry.target.classList.add('visible');
                    }
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Auto-stagger children inside .stagger-children containers
    document.querySelectorAll('.stagger-children').forEach(container => {
        const children = container.querySelectorAll('.animate-on-scroll');
        children.forEach((child, i) => {
            const delay = i * 80;
            child.dataset.delay = String(delay);
            child.style.transitionDelay = delay + 'ms';
        });
    });

    // =========================
    // PARALLAX ELEMENTS
    // =========================
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        let parallaxTicking = false;
        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    parallaxElements.forEach(el => {
                        const speed = parseFloat(el.dataset.parallax) || 0.3;
                        const rect = el.getBoundingClientRect();
                        const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
                        el.style.transform = `translateY(${offset * -0.1}px)`;
                    });
                    parallaxTicking = false;
                });
                parallaxTicking = true;
            }
        }, { passive: true });
    }

    // =========================
    // TABS
    // =========================
    document.querySelectorAll('.tabs').forEach(tabContainer => {
        const buttons = tabContainer.querySelectorAll('.tab-btn');
        const parentSection = tabContainer.closest('section') || tabContainer.parentElement;
        const contents = parentSection.querySelectorAll('.tab-content');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const target = document.getElementById(btn.dataset.tab);
                if (target) target.classList.add('active');
            });
        });
    });

    // =========================
    // QUIZ ENGINE
    // Pool-based: JSON quiz data in <script id="quizData">
    // Shows "Go for Quiz" button after tutorial content.
    // Quiz panel loads 10 random questions from 150-question pool.
    // Validates all answered, tracks score, allows retake.
    // =========================

    const quizDataScript = document.getElementById('quizData');
    if (quizDataScript) {
        const allQuestions = JSON.parse(quizDataScript.textContent);
        const quizSection = document.querySelector('.quiz-section');
        const quizPool = document.getElementById('quizPool');
        const goForQuizBtn = document.getElementById('goForQuizBtn');
        const quizPanel = document.getElementById('quizPanel');
        let currentQuestions = [];
        let usedIndices = new Set();
        let quizAttempts = 0;
        let totalScore = 0;
        let totalAnswered = 0;

        // Load saved quiz stats for this page
        const pageId = document.body.dataset.page || window.location.pathname;
        const savedProgress = JSON.parse(localStorage.getItem('codeverse-progress') || '{}');
        if (savedProgress[pageId]) {
            quizAttempts = savedProgress[pageId].attempts || 0;
            totalScore = savedProgress[pageId].totalScore || 0;
            totalAnswered = savedProgress[pageId].totalAnswered || 0;
        }

        function shuffleArray(arr) {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        function getRandomQuestions(count) {
            if (usedIndices.size >= allQuestions.length) {
                usedIndices.clear();
            }
            const available = allQuestions
                .map((q, i) => ({ q, i }))
                .filter(item => !usedIndices.has(item.i));
            const shuffled = shuffleArray(available);
            const selected = shuffled.slice(0, Math.min(count, shuffled.length));
            selected.forEach(item => usedIndices.add(item.i));
            return selected.map(item => item.q);
        }

        function updateScoreboard() {
            const scoreboard = quizSection.querySelector('.quiz-scoreboard');
            if (!scoreboard) return;
            const overallPct = totalAnswered > 0 ? Math.round((totalScore / totalAnswered) * 100) : 0;
            scoreboard.innerHTML = `
                <div class="scoreboard-stat"><span class="scoreboard-label">Attempts</span><span class="scoreboard-value">${quizAttempts}</span></div>
                <div class="scoreboard-stat"><span class="scoreboard-label">Questions Answered</span><span class="scoreboard-value">${totalAnswered} / ${allQuestions.length}</span></div>
                <div class="scoreboard-stat"><span class="scoreboard-label">Overall Score</span><span class="scoreboard-value">${totalScore} / ${totalAnswered} (${overallPct}%)</span></div>
                <div class="scoreboard-progress"><div class="scoreboard-progress-bar" style="width:${overallPct}%"></div></div>
            `;
        }

        function renderQuestions(questions) {
            if (!quizPool) return;
            quizPool.innerHTML = '';
            // Remove old results/warnings
            quizSection.querySelectorAll('.quiz-result, .quiz-warning').forEach(r => r.remove());

            questions.forEach((q, idx) => {
                const qDiv = document.createElement('div');
                qDiv.className = 'quiz-question';
                qDiv.dataset.answered = 'false';
                qDiv.innerHTML = `<h3>${idx + 1}. ${q.q}</h3>`;
                const optDiv = document.createElement('div');
                optDiv.className = 'quiz-options';
                const optionsWithIndex = q.o.map((text, i) => ({ text, isCorrect: i === q.a }));
                const shuffledOpts = shuffleArray(optionsWithIndex);
                shuffledOpts.forEach(opt => {
                    const optEl = document.createElement('div');
                    optEl.className = 'quiz-option';
                    optEl.textContent = opt.text;
                    if (opt.isCorrect) optEl.dataset.correct = 'true';
                    optEl.addEventListener('click', function () {
                        if (quizSection.classList.contains('submitted')) return;
                        Array.from(this.parentElement.children).forEach(s => s.classList.remove('selected'));
                        this.classList.add('selected');
                        this.closest('.quiz-question').dataset.answered = 'true';
                        this.closest('.quiz-question').classList.remove('unanswered');
                        // Update progress indicator
                        const answered = quizPool.querySelectorAll('.quiz-question[data-answered="true"]').length;
                        const progressIndicator = quizSection.querySelector('.quiz-progress-indicator');
                        if (progressIndicator) {
                            progressIndicator.textContent = `${answered} of ${questions.length} answered`;
                            progressIndicator.className = 'quiz-progress-indicator' + (answered === questions.length ? ' all-done' : '');
                        }
                    });
                    optDiv.appendChild(optEl);
                });
                qDiv.appendChild(optDiv);
                quizPool.appendChild(qDiv);
            });

            // Reset UI
            const submitBtn = quizSection.querySelector('.submit-quiz');
            if (submitBtn) {
                submitBtn.textContent = 'Submit Answers';
                submitBtn.disabled = false;
            }
            quizSection.classList.remove('submitted');

            // Update counter & progress
            const counter = quizSection.querySelector('.quiz-counter');
            if (counter) {
                counter.textContent = `Showing 10 of ${allQuestions.length} questions (randomized)`;
            }
            const progressIndicator = quizSection.querySelector('.quiz-progress-indicator');
            if (progressIndicator) {
                progressIndicator.textContent = `0 of ${questions.length} answered`;
                progressIndicator.className = 'quiz-progress-indicator';
            }

            updateScoreboard();
        }

        // GO FOR QUIZ button handler
        if (goForQuizBtn && quizPanel) {
            goForQuizBtn.addEventListener('click', function () {
                quizPanel.classList.add('active');
                this.style.display = 'none';
                currentQuestions = getRandomQuestions(10);
                renderQuestions(currentQuestions);
                quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        } else if (quizSection) {
            // Fallback: if no goForQuizBtn, just render immediately
            currentQuestions = getRandomQuestions(10);
            renderQuestions(currentQuestions);
        }

        // Submit handler with validation
        const submitBtn = quizSection ? quizSection.querySelector('.submit-quiz') : null;
        if (submitBtn) {
            submitBtn.addEventListener('click', function () {
                if (quizSection.classList.contains('submitted')) return;

                // Check all questions answered
                const questionDivs = quizPool.querySelectorAll('.quiz-question');
                const unanswered = quizPool.querySelectorAll('.quiz-question[data-answered="false"]');

                if (unanswered.length > 0) {
                    // Remove existing warning
                    quizSection.querySelectorAll('.quiz-warning').forEach(w => w.remove());
                    const warning = document.createElement('div');
                    warning.className = 'quiz-warning';
                    warning.innerHTML = `&#9888; Please answer all ${unanswered.length} remaining question${unanswered.length > 1 ? 's' : ''} before submitting.`;
                    this.parentNode.insertBefore(warning, this);
                    // Highlight unanswered
                    unanswered.forEach(q => {
                        q.classList.add('unanswered');
                    });
                    // Scroll to first unanswered
                    unanswered[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }

                // Remove warnings
                quizSection.querySelectorAll('.quiz-warning').forEach(w => w.remove());

                quizSection.classList.add('submitted');
                let score = 0;
                const total = questionDivs.length;

                quizPool.querySelectorAll('.quiz-option').forEach(option => {
                    const correct = option.dataset.correct === 'true';
                    if (option.classList.contains('selected')) {
                        option.classList.add(correct ? 'correct' : 'incorrect');
                        if (correct) score++;
                    }
                    if (correct && !option.classList.contains('selected')) {
                        option.classList.add('correct');
                    }
                    option.style.pointerEvents = 'none';
                });

                const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
                this.textContent = `Score: ${score}/${total} (${percentage}%)`;
                this.disabled = true;

                // Update cumulative stats
                quizAttempts++;
                totalScore += score;
                totalAnswered += total;

                // Save progress
                const progress = JSON.parse(localStorage.getItem('codeverse-progress') || '{}');
                progress[pageId] = {
                    score, total, percentage,
                    attempts: quizAttempts,
                    totalScore: totalScore,
                    totalAnswered: totalAnswered,
                    date: new Date().toISOString()
                };
                localStorage.setItem('codeverse-progress', JSON.stringify(progress));

                // Show result badge
                const resultDiv = document.createElement('div');
                resultDiv.className = `quiz-result ${percentage >= 70 ? 'pass' : percentage >= 40 ? 'warning' : 'fail'}`;
                if (percentage >= 70) {
                    resultDiv.innerHTML = `&#127942; Excellent! You scored <strong>${percentage}%</strong> (${score}/${total})`;
                } else if (percentage >= 40) {
                    resultDiv.innerHTML = `&#128170; Good effort! You scored <strong>${percentage}%</strong> (${score}/${total}). Review the incorrect answers and try again!`;
                } else {
                    resultDiv.innerHTML = `&#128218; Keep studying! You scored <strong>${percentage}%</strong> (${score}/${total}). Re-read the tutorial and try another quiz.`;
                }
                this.parentNode.insertBefore(resultDiv, this.nextSibling);

                // Show "Try Another Quiz" button
                const nextBtn = quizSection.querySelector('.next-quiz');
                if (nextBtn) nextBtn.style.display = 'inline-block';

                updateScoreboard();
            });
        }

        // Try Another Quiz handler
        const nextBtn = quizSection ? quizSection.querySelector('.next-quiz') : null;
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentQuestions = getRandomQuestions(10);
                renderQuestions(currentQuestions);
                this.style.display = 'none';
                quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    // --- Inline Quiz Engine (legacy support) ---
    document.querySelectorAll('.quiz-section').forEach(quizSection => {
        // Skip if pool-based quiz is active on this section
        if (quizSection.querySelector('#quizPool')) return;

        const options = quizSection.querySelectorAll('.quiz-option');
        if (options.length === 0) return;
        let submitBtn = quizSection.querySelector('.submit-quiz');
        let submitted = false;

        if (!submitBtn) {
            submitBtn = document.createElement('button');
            submitBtn.className = 'submit-quiz';
            submitBtn.textContent = 'Submit Answers';
            quizSection.appendChild(submitBtn);
        }

        function isCorrect(option) {
            if (option.dataset.correct === 'true') return true;
            const radio = option.querySelector('input[data-correct="true"]');
            return !!radio;
        }

        options.forEach(option => {
            option.addEventListener('click', function () {
                if (submitted) return;
                const radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                const siblings = this.parentElement.children;
                Array.from(siblings).forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        submitBtn.addEventListener('click', function () {
            if (submitted) return;
            submitted = true;
            let score = 0;
            let total = quizSection.querySelectorAll('.quiz-question').length;

            options.forEach(option => {
                const correct = isCorrect(option);
                if (option.classList.contains('selected')) {
                    if (correct) {
                        option.classList.add('correct');
                        score++;
                    } else {
                        option.classList.add('incorrect');
                    }
                }
                if (correct && !option.classList.contains('selected')) {
                    option.classList.add('correct');
                }
                option.style.pointerEvents = 'none';
            });

            const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
            this.textContent = `Score: ${score}/${total} (${percentage}%)`;
            this.disabled = true;

            const pageId = document.body.dataset.page || window.location.pathname;
            const progress = JSON.parse(localStorage.getItem('codeverse-progress') || '{}');
            progress[pageId] = { score, total, percentage, date: new Date().toISOString() };
            localStorage.setItem('codeverse-progress', JSON.stringify(progress));

            const resultDiv = document.createElement('div');
            resultDiv.className = `quiz-result ${percentage >= 60 ? 'pass' : 'fail'}`;
            resultDiv.textContent = percentage >= 60
                ? `Great job! You scored ${percentage}%`
                : `Keep practicing! You scored ${percentage}%. Review and try again.`;
            this.parentNode.insertBefore(resultDiv, this.nextSibling);
        });
    });

    // =========================
    // CODE COPY BUTTON
    // =========================
    document.querySelectorAll('.code-copy-btn').forEach(btn => {
        btn.addEventListener('click', async function () {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('pre')?.textContent || '';
            try {
                await navigator.clipboard.writeText(code);
                const original = this.innerHTML;
                this.innerHTML = '&#10003; Copied!';
                setTimeout(() => { this.innerHTML = original; }, 2000);
            } catch {
                const textarea = document.createElement('textarea');
                textarea.value = code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                const original = this.innerHTML;
                this.innerHTML = '&#10003; Copied!';
                setTimeout(() => { this.innerHTML = original; }, 2000);
            }
        });
    });

    // =========================
    // SEARCH ENGINE
    // Supports 3 modes:
    // 1) Card filter (main index / cpp index) — filters .language-card / .topic-card in place
    // 2) Module-aware filter (cpp index) — hides entire modules when no cards match
    // 3) Dropdown search (coming-soon pages) — shows results from a global index
    // =========================
    (function initSearch() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;

        const searchContainer = searchInput.closest('.search-container');
        const clearBtn = searchContainer ? searchContainer.querySelector('.search-clear') : null;

        // Clear button behaviour
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
        }

        // Toggle has-value class for clear button visibility
        function updateHasValue() {
            if (searchContainer) {
                searchContainer.classList.toggle('has-value', searchInput.value.length > 0);
            }
        }

        // ----- MODE 1 & 2: Card filtering (main page + cpp page) -----
        const cards = document.querySelectorAll('.language-card, .topic-card');
        const searchInfo = document.querySelector('.search-results-info');
        const searchEmpty = document.querySelector('.search-empty-state');

        if (cards.length > 0) {
            // Detect if we're on cpp index (has module sections with topic-cards)
            const isCppIndex = document.body.dataset.page === 'cpp-home';
            const moduleSections = isCppIndex
                ? document.querySelectorAll('.languages-section')
                : [];

            searchInput.addEventListener('input', function () {
                const query = this.value.toLowerCase().trim();
                updateHasValue();

                let matchCount = 0;
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    const show = text.includes(query) || query === '';
                    card.style.display = show ? '' : 'none';
                    if (show) matchCount++;
                    // Re-trigger animation on show
                    if (show) {
                        card.classList.remove('visible');
                        requestAnimationFrame(() => card.classList.add('visible'));
                    }
                });

                // Module-aware: hide entire section if 0 cards visible inside it
                if (isCppIndex) {
                    moduleSections.forEach(section => {
                        const visibleCards = section.querySelectorAll('.topic-card[style=""], .topic-card:not([style])');
                        const hasVisible = Array.from(section.querySelectorAll('.topic-card')).some(
                            c => c.style.display !== 'none'
                        );
                        section.classList.toggle('search-hidden', !hasVisible && query !== '');
                    });
                }

                // Update result count info
                if (searchInfo) {
                    if (query) {
                        searchInfo.innerHTML = `<span class="result-count">${matchCount}</span> result${matchCount !== 1 ? 's' : ''} for "<strong>${query}</strong>"`;
                        searchInfo.classList.add('visible');
                    } else {
                        searchInfo.classList.remove('visible');
                    }
                }

                // Empty state
                if (searchEmpty) {
                    searchEmpty.classList.toggle('visible', matchCount === 0 && query !== '');
                }
            });
            return; // Card-filter mode – done
        }

        // ----- MODE 3: Dropdown search (coming-soon / pages without cards) -----
        const dropdown = searchContainer ? searchContainer.querySelector('.search-dropdown') : null;
        if (!dropdown) return;

        // Global search index – all C++ lessons + languages
        const searchIndex = [
            // Languages
            { title: 'C++ Programming', meta: '55 Lessons', url: '../cpp/index.html', icon: 'C++', category: 'Courses' },
            { title: 'Python', meta: 'Coming Soon', url: '../python/index.html', icon: 'Py', category: 'Courses' },
            { title: 'JavaScript', meta: 'Coming Soon', url: '../javascript/index.html', icon: 'JS', category: 'Courses' },
            { title: 'Java', meta: 'Coming Soon', url: '../java/index.html', icon: 'Jv', category: 'Courses' },
            { title: 'C#', meta: 'Coming Soon', url: '../csharp/index.html', icon: 'C#', category: 'Courses' },
            { title: 'Web Development', meta: 'Coming Soon', url: '../webdev/index.html', icon: 'Web', category: 'Courses' },
            { title: 'Rust', meta: 'Coming Soon', url: '../rust/index.html', icon: 'Rs', category: 'Courses' },
            { title: 'Go', meta: 'Coming Soon', url: '../go/index.html', icon: 'Go', category: 'Courses' },
            // C++ Lessons
            { title: 'Introduction to C++', meta: 'Module 1 · Lesson 1', url: '../cpp/introduction.html', icon: '1', category: 'C++ Lessons' },
            { title: 'Setting Up C++', meta: 'Module 1 · Lesson 2', url: '../cpp/setup.html', icon: '2', category: 'C++ Lessons' },
            { title: 'First Program', meta: 'Module 1 · Lesson 3', url: '../cpp/first-program.html', icon: '3', category: 'C++ Lessons' },
            { title: 'Basic Syntax', meta: 'Module 2 · Lesson 4', url: '../cpp/basic-syntax.html', icon: '4', category: 'C++ Lessons' },
            { title: 'Comments', meta: 'Module 2 · Lesson 5', url: '../cpp/comments.html', icon: '5', category: 'C++ Lessons' },
            { title: 'Variables', meta: 'Module 2 · Lesson 6', url: '../cpp/variables.html', icon: '6', category: 'C++ Lessons' },
            { title: 'Data Types', meta: 'Module 2 · Lesson 7', url: '../cpp/data-types.html', icon: '7', category: 'C++ Lessons' },
            { title: 'Input & Output', meta: 'Module 2 · Lesson 8', url: '../cpp/input-output.html', icon: '8', category: 'C++ Lessons' },
            { title: 'Operators', meta: 'Module 2 · Lesson 9', url: '../cpp/operators.html', icon: '9', category: 'C++ Lessons' },
            { title: 'If-Else Statements', meta: 'Module 3 · Lesson 10', url: '../cpp/if-else.html', icon: '10', category: 'C++ Lessons' },
            { title: 'Switch Statement', meta: 'Module 3 · Lesson 11', url: '../cpp/switch.html', icon: '11', category: 'C++ Lessons' },
            { title: 'For Loops', meta: 'Module 3 · Lesson 12', url: '../cpp/for-loops.html', icon: '12', category: 'C++ Lessons' },
            { title: 'While Loops', meta: 'Module 3 · Lesson 13', url: '../cpp/while-loops.html', icon: '13', category: 'C++ Lessons' },
            { title: 'Nested Loops', meta: 'Module 3 · Lesson 14', url: '../cpp/nested-loops.html', icon: '14', category: 'C++ Lessons' },
            { title: 'Break & Continue', meta: 'Module 3 · Lesson 15', url: '../cpp/break-continue.html', icon: '15', category: 'C++ Lessons' },
            { title: 'Functions', meta: 'Module 4 · Lesson 16', url: '../cpp/functions.html', icon: '16', category: 'C++ Lessons' },
            { title: 'Function Parameters', meta: 'Module 4 · Lesson 17', url: '../cpp/function-parameters.html', icon: '17', category: 'C++ Lessons' },
            { title: 'Return Values', meta: 'Module 4 · Lesson 18', url: '../cpp/return-values.html', icon: '18', category: 'C++ Lessons' },
            { title: 'Function Overloading', meta: 'Module 4 · Lesson 19', url: '../cpp/function-overloading.html', icon: '19', category: 'C++ Lessons' },
            { title: 'Recursion', meta: 'Module 4 · Lesson 20', url: '../cpp/recursion.html', icon: '20', category: 'C++ Lessons' },
            { title: 'Inline & Lambda', meta: 'Module 4 · Lesson 21', url: '../cpp/inline-lambda.html', icon: '21', category: 'C++ Lessons' },
            { title: 'Arrays', meta: 'Module 5 · Lesson 22', url: '../cpp/arrays.html', icon: '22', category: 'C++ Lessons' },
            { title: 'Multi-Dimensional Arrays', meta: 'Module 5 · Lesson 23', url: '../cpp/multi-arrays.html', icon: '23', category: 'C++ Lessons' },
            { title: 'C-Strings', meta: 'Module 5 · Lesson 24', url: '../cpp/c-strings.html', icon: '24', category: 'C++ Lessons' },
            { title: 'Strings', meta: 'Module 5 · Lesson 25', url: '../cpp/strings.html', icon: '25', category: 'C++ Lessons' },
            { title: 'Pointers', meta: 'Module 5 · Lesson 26', url: '../cpp/pointers.html', icon: '26', category: 'C++ Lessons' },
            { title: 'Pointer Arithmetic', meta: 'Module 5 · Lesson 27', url: '../cpp/pointer-arithmetic.html', icon: '27', category: 'C++ Lessons' },
            { title: 'Dynamic Memory', meta: 'Module 5 · Lesson 28', url: '../cpp/dynamic-memory.html', icon: '28', category: 'C++ Lessons' },
            { title: 'References', meta: 'Module 5 · Lesson 29', url: '../cpp/references.html', icon: '29', category: 'C++ Lessons' },
            { title: 'Classes & Objects', meta: 'Module 6 · Lesson 30', url: '../cpp/classes-objects.html', icon: '30', category: 'C++ Lessons' },
            { title: 'Constructors', meta: 'Module 6 · Lesson 31', url: '../cpp/constructors.html', icon: '31', category: 'C++ Lessons' },
            { title: 'Access Specifiers', meta: 'Module 6 · Lesson 32', url: '../cpp/access-specifiers.html', icon: '32', category: 'C++ Lessons' },
            { title: 'Encapsulation', meta: 'Module 6 · Lesson 33', url: '../cpp/encapsulation.html', icon: '33', category: 'C++ Lessons' },
            { title: 'Inheritance', meta: 'Module 6 · Lesson 34', url: '../cpp/inheritance.html', icon: '34', category: 'C++ Lessons' },
            { title: 'Polymorphism', meta: 'Module 6 · Lesson 35', url: '../cpp/polymorphism.html', icon: '35', category: 'C++ Lessons' },
            { title: 'Abstraction', meta: 'Module 6 · Lesson 36', url: '../cpp/abstraction.html', icon: '36', category: 'C++ Lessons' },
            { title: 'Function Templates', meta: 'Module 7 · Lesson 37', url: '../cpp/function-templates.html', icon: '37', category: 'C++ Lessons' },
            { title: 'Class Templates', meta: 'Module 7 · Lesson 38', url: '../cpp/class-templates.html', icon: '38', category: 'C++ Lessons' },
            { title: 'Vectors', meta: 'Module 7 · Lesson 39', url: '../cpp/vectors.html', icon: '39', category: 'C++ Lessons' },
            { title: 'Lists & Deques', meta: 'Module 7 · Lesson 40', url: '../cpp/lists-deques.html', icon: '40', category: 'C++ Lessons' },
            { title: 'Maps & Sets', meta: 'Module 7 · Lesson 41', url: '../cpp/maps-sets.html', icon: '41', category: 'C++ Lessons' },
            { title: 'Iterators', meta: 'Module 7 · Lesson 42', url: '../cpp/iterators.html', icon: '42', category: 'C++ Lessons' },
            { title: 'STL Algorithms', meta: 'Module 7 · Lesson 43', url: '../cpp/stl-algorithms.html', icon: '43', category: 'C++ Lessons' },
            { title: 'Exceptions', meta: 'Module 8 · Lesson 44', url: '../cpp/exceptions.html', icon: '44', category: 'C++ Lessons' },
            { title: 'File I/O', meta: 'Module 8 · Lesson 45', url: '../cpp/file-io.html', icon: '45', category: 'C++ Lessons' },
            { title: 'Namespaces', meta: 'Module 8 · Lesson 46', url: '../cpp/namespaces.html', icon: '46', category: 'C++ Lessons' },
            { title: 'Smart Pointers', meta: 'Module 8 · Lesson 47', url: '../cpp/smart-pointers.html', icon: '47', category: 'C++ Lessons' },
            { title: 'Move Semantics', meta: 'Module 8 · Lesson 48', url: '../cpp/move-semantics.html', icon: '48', category: 'C++ Lessons' },
            { title: 'Multithreading', meta: 'Module 8 · Lesson 49', url: '../cpp/multithreading.html', icon: '49', category: 'C++ Lessons' },
            { title: 'Modern C++', meta: 'Module 8 · Lesson 50', url: '../cpp/modern-cpp.html', icon: '50', category: 'C++ Lessons' },
            { title: 'Debugging', meta: 'Module 9 · Lesson 51', url: '../cpp/debugging.html', icon: '51', category: 'C++ Lessons' },
            { title: 'Code Style', meta: 'Module 9 · Lesson 52', url: '../cpp/code-style.html', icon: '52', category: 'C++ Lessons' },
            { title: 'Version Control', meta: 'Module 9 · Lesson 53', url: '../cpp/version-control.html', icon: '53', category: 'C++ Lessons' },
            { title: 'Testing', meta: 'Module 9 · Lesson 54', url: '../cpp/testing.html', icon: '54', category: 'C++ Lessons' },
            { title: 'Projects', meta: 'Module 10 · Lesson 55', url: '../cpp/projects.html', icon: '55', category: 'C++ Lessons' },
            // Pages
            { title: 'About CodeVerse', meta: 'Platform', url: '../about.html', icon: '&#9432;', category: 'Pages' },
            { title: 'Resources', meta: 'Platform', url: '../resources.html', icon: '&#128218;', category: 'Pages' },
        ];

        let dropdownIndex = -1;

        function renderDropdown(query) {
            if (!query) {
                dropdown.classList.remove('visible');
                dropdownIndex = -1;
                return;
            }
            const q = query.toLowerCase();
            const results = searchIndex.filter(item =>
                item.title.toLowerCase().includes(q) ||
                item.meta.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
            );

            if (results.length === 0) {
                dropdown.innerHTML = '<div class="dropdown-empty">&#128269; No results found for "' + query + '"</div>';
                dropdown.classList.add('visible');
                dropdownIndex = -1;
                return;
            }

            // Group by category
            const groups = {};
            results.forEach(item => {
                if (!groups[item.category]) groups[item.category] = [];
                groups[item.category].push(item);
            });

            let html = '';
            Object.entries(groups).forEach(([cat, items]) => {
                html += '<div class="dropdown-header">' + cat + '</div>';
                items.slice(0, 8).forEach(item => {
                    html += '<a class="dropdown-item" href="' + item.url + '">'
                        + '<div class="item-icon">' + item.icon + '</div>'
                        + '<div class="item-info">'
                        + '<div class="item-title">' + item.title + '</div>'
                        + '<div class="item-meta">' + item.meta + '</div>'
                        + '</div></a>';
                });
            });

            dropdown.innerHTML = html;
            dropdown.classList.add('visible');
            dropdownIndex = -1;
        }

        searchInput.addEventListener('input', function () {
            updateHasValue();
            renderDropdown(this.value.trim());
        });

        // Keyboard navigation in dropdown
        searchInput.addEventListener('keydown', function (e) {
            const items = dropdown.querySelectorAll('.dropdown-item');
            if (!items.length) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                dropdownIndex = Math.min(dropdownIndex + 1, items.length - 1);
                items.forEach((it, i) => it.classList.toggle('active', i === dropdownIndex));
                items[dropdownIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                dropdownIndex = Math.max(dropdownIndex - 1, 0);
                items.forEach((it, i) => it.classList.toggle('active', i === dropdownIndex));
                items[dropdownIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter' && dropdownIndex >= 0) {
                e.preventDefault();
                items[dropdownIndex].click();
            } else if (e.key === 'Escape') {
                dropdown.classList.remove('visible');
                searchInput.blur();
            }
        });

        // Close dropdown on outside click
        document.addEventListener('click', function (e) {
            if (!searchContainer.contains(e.target)) {
                dropdown.classList.remove('visible');
            }
        });
    })();

    // =========================
    // COUNTER ANIMATION (LCD style)
    // =========================
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // =========================
    // HERO CODE TYPING EFFECT
    // =========================
    const typingTarget = document.querySelector('.typing-code');
    if (typingTarget) {
        const codeLines = JSON.parse(typingTarget.dataset.lines || '[]');
        let currentLine = 0;
        let currentChar = 0;
        let isDeleting = false;

        function typeCode() {
            if (codeLines.length === 0) return;
            const line = codeLines[currentLine];

            if (!isDeleting) {
                typingTarget.innerHTML = line.substring(0, currentChar + 1) +
                    '<span class="typing-cursor">|</span>';
                currentChar++;
                if (currentChar === line.length) {
                    setTimeout(() => { isDeleting = true; typeCode(); }, 2500);
                    return;
                }
                setTimeout(typeCode, 40 + Math.random() * 30);
            } else {
                typingTarget.innerHTML = line.substring(0, currentChar) +
                    '<span class="typing-cursor">|</span>';
                currentChar--;
                if (currentChar < 0) {
                    isDeleting = false;
                    currentChar = 0;
                    currentLine = (currentLine + 1) % codeLines.length;
                    setTimeout(typeCode, 500);
                    return;
                }
                setTimeout(typeCode, 20);
            }
        }
        setTimeout(typeCode, 1000);
    }

    // =========================
    // PROGRESS TRACKING
    // =========================
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill && progressFill.dataset.progress) {
        setTimeout(() => {
            progressFill.style.width = progressFill.dataset.progress + '%';
        }, 300);
    }

    // Active sidebar link highlighting + auto-scroll sidebar to active topic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let activeLink = null;
    document.querySelectorAll('.sidebar-nav a, .main-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            if (link.closest('.sidebar-nav')) activeLink = link;
        }
    });
    if (activeLink) {
        const sidebar = activeLink.closest('.sidebar-nav') || activeLink.closest('.tutorial-sidebar');
        if (sidebar) {
            requestAnimationFrame(() => {
                activeLink.scrollIntoView({ block: 'center', behavior: 'instant' });
            });
        }
    }

    // =========================
    // SMOOTH ANCHOR SCROLLING
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = parseInt(
                    getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height'), 10
                ) || 64;
                const y = target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // =========================
    // KEYBOARD SHORTCUTS
    // =========================
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Try body search input first, then header search
            const searchEl = document.querySelector('.search-input');
            const headerSearch = document.querySelector('.header-search');
            const headerInput = headerSearch ? headerSearch.querySelector('.header-search-input') : null;
            if (searchEl) {
                searchEl.focus();
                searchEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (headerInput) {
                headerInput.focus();
            }
        }
    });

    // =========================
    // LAZY LOAD IFRAMES
    // =========================
    document.querySelectorAll('iframe[data-src]').forEach(iframe => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    iframe.src = iframe.dataset.src;
                    observer.unobserve(iframe);
                }
            });
        }, { rootMargin: '200px' });
        observer.observe(iframe);
    });

    // =========================
    // MAGNETIC HOVER (cards)
    // =========================
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.language-card, .feature-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotateX = (y / rect.height) * -6;
                const rotateY = (x / rect.width) * 6;
                card.style.transform =
                    `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // =========================
    // SECTION REVEAL ON SCROLL
    // (enhances scroll engagement)
    // =========================
    const sections = document.querySelectorAll(
        '.languages-section, .features-section, .stats-section, ' +
        '.roadmap-section, .comparison-section, .cta-section'
    );

    if (sections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.05 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            sectionObserver.observe(section);
        });
    }

});
