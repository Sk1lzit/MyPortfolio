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

// === Анимированный фон (частицы + интерактивная сеть) ===
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK_DISTANCE = 140;

    let w, h, particles = [];
    let mouse = { x: -9999, y: -9999 };

    function resize() {
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seedParticles();
    }

    function seedParticles() {
        const count = Math.min(90, Math.round((w * h) / 15000));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.5 + 1,
            color: `rgba(139, 92, 246, ${Math.random() * 0.4 + 0.1})`
        }));
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            // Отталкивание от мышки
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);
            if (distToMouse < 130 && distToMouse > 0.1) {
                const force = (130 - distToMouse) / 130;
                p.x += (dx / distToMouse) * force * 2;
                p.y += (dy / distToMouse) * force * 2;
            }

            // Рисуем точку
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Соединяем с другими
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const d = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (d < LINK_DISTANCE) {
                    const alpha = (1 - d / LINK_DISTANCE) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', resize);
    resize();
    animate();
});