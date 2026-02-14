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
    // Handles both formats:
    //   A) <div class="quiz-option" data-correct="true">Text</div>
    //   B) <label class="quiz-option"><input type="radio" data-correct="true"> Text</label>
    // Auto-injects submit button if missing.
    // =========================
    document.querySelectorAll('.quiz-section').forEach(quizSection => {
        const options = quizSection.querySelectorAll('.quiz-option');
        let submitBtn = quizSection.querySelector('.submit-quiz');
        let submitted = false;

        // Fix #2-4: Auto-inject submit button if missing
        if (!submitBtn) {
            submitBtn = document.createElement('button');
            submitBtn.className = 'submit-quiz';
            submitBtn.textContent = 'Submit Answers';
            quizSection.appendChild(submitBtn);
        }

        // Helper: check if an option is marked correct
        // Supports data-correct on the option itself OR on a child <input>
        function isCorrect(option) {
            if (option.dataset.correct === 'true') return true;
            const radio = option.querySelector('input[data-correct="true"]');
            return !!radio;
        }

        options.forEach(option => {
            option.addEventListener('click', function () {
                if (submitted) return;
                // Select the radio input if present
                const radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                // Deselect siblings
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
            progress[pageId] = {
                score, total, percentage,
                date: new Date().toISOString()
            };
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
    // SEARCH
    // =========================
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        const cards = document.querySelectorAll('.language-card, .topic-card');
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                const show = text.includes(query) || query === '';
                card.style.display = show ? '' : 'none';
                // Re-trigger animation on show
                if (show) {
                    card.classList.remove('visible');
                    requestAnimationFrame(() => {
                        card.classList.add('visible');
                    });
                }
            });
        });
    }

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

    // Active sidebar link highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-nav a, .main-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

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
            const searchEl = document.querySelector('.search-input');
            if (searchEl) searchEl.focus();
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
