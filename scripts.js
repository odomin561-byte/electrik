// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Простая обработка мобильного меню (можно расширить при необходимости)
const mobileBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileBtn.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.backgroundColor = '#fff';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
    }
});