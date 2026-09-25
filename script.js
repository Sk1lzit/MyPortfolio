// ===== ПЕЧАТАЮЩИЙСЯ ТЕКСТ =====
document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;

    const text = typewriter.getAttribute('data-text');
    let index = 0;
    let isDeleting = false;

    function type() {
        if (!isDeleting) {
            typewriter.textContent = text.substring(0, index + 1);
            index++;
            if (index === text.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
            setTimeout(type, 100);
        } else {
            typewriter.textContent = text.substring(0, index - 1);
            index--;
            if (index === 0) {
                isDeleting = false;
                setTimeout(type, 500);
                return;
            }
            setTimeout(type, 50);
        }
    }

    type();

    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .about-content, .skills').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});