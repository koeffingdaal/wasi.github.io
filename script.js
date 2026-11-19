(function () {
    'use strict';

    var root = document.documentElement;

    /* ------------------------------------------------------------------
       Dates. Everything on the timeline comes from the data-start and
       data-end attributes (YYYY-MM) in index.html. A role with no data-end
       is ongoing and runs to the current month. Both end months count, so
       Nov 2024 to Apr 2026 is 18 months.
       ------------------------------------------------------------------ */
    function monthIndex(value) {
        var parts = value.split('-');
        return parseInt(parts[0], 10) * 12 + parseInt(parts[1], 10) - 1;
    }

    var today = new Date();
    var nowIndex = today.getFullYear() * 12 + today.getMonth();

    function plural(n, word) {
        return n + ' ' + word + (n === 1 ? '' : 's');
    }

    function formatDuration(startIndex, endIndex) {
        var months = endIndex - startIndex + 1;
        var years = Math.floor(months / 12);
        var rest = months % 12;
        var parts = [];
        if (years) parts.push(plural(years, 'year'));
        if (rest) parts.push(plural(rest, 'month'));
        return parts.join(' ');
    }

    var entries = Array.prototype.slice.call(document.querySelectorAll('[data-timeline]')).map(function (el) {
        var title = el.querySelector('.role__title');
        return {
            el: el,
            id: el.id,
            start: monthIndex(el.getAttribute('data-start')),
            end: el.hasAttribute('data-end') ? monthIndex(el.getAttribute('data-end')) : nowIndex,
            ongoing: !el.hasAttribute('data-end'),
            yearLevel: el.getAttribute('data-precision') === 'year',
            label: el.getAttribute('data-chart-label') || '',
            meta: el.getAttribute('data-chart-meta') || (title ? title.textContent.trim() : '')
        };
    });

    entries.forEach(function (entry) {
        var slot = entry.el.querySelector('[data-duration]');
        if (slot) slot.textContent = formatDuration(entry.start, entry.end);
    });

    /* ------------------------------------------------------------------
       Career timeline
       ------------------------------------------------------------------ */
    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function buildPlot() {
        var plot = document.getElementById('plot');
        var chart = document.getElementById('plot-chart');
        if (!plot || !chart || !entries.length) return;

        var sorted = entries.slice().sort(function (a, b) { return a.start - b.start; });
        var firstYear = Math.floor(sorted[0].start / 12);
        var lastIndex = Math.max(nowIndex, Math.max.apply(null, sorted.map(function (e) { return e.end; })));
        var lastYear = Math.floor(lastIndex / 12);
        var origin = firstYear * 12;
        var total = (lastYear * 12 + 11) - origin + 1;

        function pos(index) { return ((index - origin) / total) * 100; }

        var axis = el('div', 'plot__axis');
        axis.setAttribute('aria-hidden', 'true');

        var rows = el('div', 'plot__rows');
        var overlay = el('div', 'plot__overlay');
        overlay.setAttribute('aria-hidden', 'true');
        var list = el('ol', 'plot__list');

        for (var y = firstYear; y <= lastYear; y++) {
            var tick = el('span', 'plot__tick' + ((y - firstYear) % 2 ? ' plot__tick--minor' : ''), String(y));
            tick.style.left = pos(y * 12) + '%';
            axis.appendChild(tick);

            var grid = el('span', 'plot__grid');
            grid.style.left = pos(y * 12) + '%';
            overlay.appendChild(grid);
        }

        var nowTick = el('span', 'plot__tick plot__tick--now', 'now');
        nowTick.style.left = pos(nowIndex + 0.5) + '%';
        axis.appendChild(nowTick);

        var nowLine = el('span', 'plot__nowline');
        nowLine.style.left = pos(nowIndex + 0.5) + '%';
        overlay.appendChild(nowLine);

        sorted.forEach(function (entry, i) {
            var row = el('li', 'plot__row');

            var label = el('a', 'plot__label');
            label.href = '#' + entry.id;
            label.appendChild(el('span', 'plot__org', entry.label));
            var meta = entry.yearLevel ? entry.meta : entry.meta + ', ' + formatDuration(entry.start, entry.end);
            label.appendChild(el('span', 'plot__meta', meta));

            var track = el('div', 'plot__track');
            var bar = el('span', 'plot__bar' + (entry.yearLevel ? ' plot__bar--edu' : '') + (entry.ongoing ? ' plot__bar--now' : ''));
            bar.setAttribute('aria-hidden', 'true');
            bar.style.left = pos(entry.start) + '%';
            bar.style.width = (pos(entry.end + 1) - pos(entry.start)) + '%';
            bar.style.setProperty('--i', i);
            track.appendChild(bar);

            row.appendChild(label);
            row.appendChild(track);
            list.appendChild(row);
        });

        rows.appendChild(overlay);
        rows.appendChild(list);
        chart.appendChild(axis);
        chart.appendChild(rows);
        plot.hidden = false;
    }

    buildPlot();

    /* ------------------------------------------------------------------
       Theme toggle
       ------------------------------------------------------------------ */
    var themeToggle = document.getElementById('theme-toggle');
    var themeMeta = document.querySelector('meta[name="theme-color"]');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (themeToggle) themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
        if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0d1015' : '#f6f7f9');
    }

    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
        });
    }

    /* ------------------------------------------------------------------
       Mobile navigation
       ------------------------------------------------------------------ */
    var nav = document.getElementById('site-nav');
    var navToggle = document.getElementById('nav-toggle');

    function setNav(open) {
        if (!nav || !navToggle) return;
        nav.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
    }

    if (nav && navToggle) {
        navToggle.addEventListener('click', function () {
            setNav(!nav.classList.contains('is-open'));
        });
        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) setNav(false);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) {
                setNav(false);
                navToggle.focus();
            }
        });
    }

    /* ------------------------------------------------------------------
       Mark the section in view in the navigation
       ------------------------------------------------------------------ */
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
    var targets = links
        .map(function (link) { return document.querySelector(link.getAttribute('href')); })
        .filter(Boolean);

    if ('IntersectionObserver' in window && targets.length) {
        var spy = new IntersectionObserver(function (items) {
            items.forEach(function (item) {
                if (!item.isIntersecting) return;
                links.forEach(function (link) {
                    if (link.getAttribute('href') === '#' + item.target.id) {
                        link.setAttribute('aria-current', 'true');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        targets.forEach(function (target) { spy.observe(target); });

        // Clear the marker while the hero is in view
        var hero = document.getElementById('home');
        if (hero) {
            new IntersectionObserver(function (items) {
                if (items[0].isIntersecting) {
                    links.forEach(function (link) { link.removeAttribute('aria-current'); });
                }
            }, { rootMargin: '-40% 0px -55% 0px' }).observe(hero);
        }
    }

    /* ------------------------------------------------------------------
       Footer year
       ------------------------------------------------------------------ */
    var year = document.getElementById('year');
    if (year) year.textContent = String(today.getFullYear());

    /* ------------------------------------------------------------------
       Motion: scroll progress, header shadow, timeline draw-in, reveals.
       Everything here is skipped when the visitor prefers reduced motion.
       ------------------------------------------------------------------ */
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canObserve = 'IntersectionObserver' in window;
    var header = document.querySelector('.site-header');
    var ticking = false;

    function onScroll() {
        var max = root.scrollHeight - window.innerHeight;
        var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        root.style.setProperty('--progress', progress.toFixed(4));
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(onScroll);
        }
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    var plotEl = document.getElementById('plot');
    if (plotEl) {
        if (reduceMotion || !canObserve) {
            plotEl.classList.add('is-drawn');
        } else {
            var drawObserver = new IntersectionObserver(function (items) {
                if (items[0].isIntersecting) {
                    plotEl.classList.add('is-drawn');
                    drawObserver.disconnect();
                }
            }, { threshold: 0.35 });
            drawObserver.observe(plotEl);
        }
    }

    if (!reduceMotion && canObserve) {
        var revealSelector = '.section__head, .about__summary, .subhead, .edu__item, .certs__item, .role, ' +
            '.skills__row, .project, .contact__lead, .contact__email, .contact__facts, .refs__item';
        var revealItems = Array.prototype.slice.call(document.querySelectorAll(revealSelector));

        var revealObserver = new IntersectionObserver(function (items) {
            items.forEach(function (item) {
                if (!item.isIntersecting) return;
                item.target.classList.add('is-visible');
                revealObserver.unobserve(item.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

        revealItems.forEach(function (item) {
            var position = Array.prototype.indexOf.call(item.parentNode.children, item);
            item.style.setProperty('--d', Math.min(position, 4) * 80 + 'ms');
            item.classList.add('reveal');
            revealObserver.observe(item);
        });
    }
})();