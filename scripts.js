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

<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageBlock = document.getElementById('formMessage');
    
    // Записываем текущий URL страницы в скрытое поле
    const urlInput = form.querySelector('input[name="page_url"]');
    if(urlInput) urlInput.value = window.location.href;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Отменяем стандартную отправку формы
        
        // Проверка ловушки: если бот заполнил скрытое поле, просто прерываем выполнение
        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value !== '') {
            return; 
        }

        // Собираем данные из формы
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });

        // Блокируем кнопку на время отправки
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        messageBlock.textContent = '';

        // === НАСТРОЙКИ FORMTOMAIL ===
        const apiUrl = 'https://api.formtomail.ru/v1/send'; // URL эндпоинта FormToMail
        const bearerToken = 'ВАШ_BEARER_ТОКЕН_ЗДЕСЬ'; // Токен авторизации из личного кабинета

        // Отправляем запрос
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                messageBlock.style.color = 'green';
                messageBlock.textContent = 'Спасибо! Мы скоро вам перезвоним.';
                form.reset();
            } else {
                throw new Error(result.message || 'Ошибка отправки');
            }
        })
        .catch(error => {
            messageBlock.style.color = 'red';
            messageBlock.textContent = 'Ошибка при отправке. Попробуйте позже или позвоните нам.';
            console.error('FormToMail Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        });
    });
});
</script>
