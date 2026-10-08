// Находим форму по её id (убедитесь, что в HTML у формы id="leadForm")
const form = document.getElementById('leadForm');

if (form) {
  form.addEventListener('submit', async function(e) {
    // 1. САМАЯ ВАЖНАЯ СТРОКА: Отменяем стандартный переброс браузера
    e.preventDefault(); 

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;

    // Собираем данные
    const formData = new FormData(form);
    const name = formData.get('name')?.trim();
    const phone = formData.get('phone')?.trim();
    
    // Считываем honeypot (имя поля company_website, как в документации)
    const honeypotValue = formData.get('company_website')?.trim() || '';

    // Простая проверка
    if (!name || phone.replace(/\D/g, '').length < 11) {
      alert('Пожалуйста, заполните имя и телефон корректно.');
      return;
    }

    submitBtn.innerText = 'Отправка...';
    submitBtn.disabled = true;

    try {
      // 2. Отправляем данные через fetch на правильный API URL
      const response = await fetch("https://api.formtomail.ru/send", {
        method: "POST",
        headers: {
          "Authorization": "Bearer dUqpZpsDapom3rNX(Электромонтажные раб)", // Ваш ключ
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: "Новая заявка: Электромонтаж в Белорецке",
          body: {
            "Имя": name,
            "Телефон": phone
          },
          honeypot: honeypotValue // Передаем на верхний уровень
        })
      });

      const result = await response.json();

      // 3. Обрабатываем ответ
      if (response.ok && result.statusCode === 200) {
        alert('Спасибо! Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
        form.reset(); // Очищаем форму
      } else if (result.statusCode === 400) {
        alert(`Ошибка: ${result.message}`);
      } else {
        console.error("FormToMail Error:", result);
        alert('Сервис временно недоступен. Пожалуйста, позвоните нам.');
      }
    } catch (error) {
      console.error('Сетевая ошибка:', error);
      alert('Произошла ошибка сети. Пожалуйста, позвоните нам.');
    } finally {
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}
