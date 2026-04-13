document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Service Parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentService = urlParams.get('service');

    // 2. Dynamic Link Updater (Correctly replaces existing parameters)
    if (currentService) {
        document.querySelectorAll('a').forEach(link => {
            let href = link.getAttribute('href');
            
            if (href && href.includes('.html') && !href.startsWith('http') && !href.startsWith('javascript')) {
                // If it already has parameters, we need to handle them
                if (href.includes('?')) {
                    const base = href.split('?')[0];
                    const search = href.split('?')[1];
                    const sparams = new URLSearchParams(search);
                    sparams.set('service', currentService);
                    link.setAttribute('href', base + '?' + sparams.toString());
                } else {
                    link.setAttribute('href', href + '?service=' + encodeURIComponent(currentService));
                }
            }
        });
    }

    // 3. Scroll Reveal Animation
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.container, .feature-card, .head, .nav-list li').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // 4. Desktop Parallax
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
            document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
        });
    }
});
