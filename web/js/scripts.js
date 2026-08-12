window.addEventListener('DOMContentLoaded', () => {
    initI18n();
    initNav();
    initTheme();
    initReveal();
});

function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('#siteNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function resolveColor(pref) {
    if (pref === 'light' || pref === 'dark') return pref;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(pref) {
    const resolved = resolveColor(pref);
    document.documentElement.setAttribute('data-theme', pref);
    document.documentElement.setAttribute('data-color', resolved);
    localStorage.setItem('theme', pref);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.themeValue === pref);
    });
}

function initTheme() {
    const saved = localStorage.getItem('theme') || 'system';
    applyTheme(saved);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.themeValue));
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const pref = localStorage.getItem('theme') || 'system';
        if (pref === 'system') applyTheme('system');
    });
}

function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach(el => observer.observe(el));
}
