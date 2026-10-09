
document.getElementById("leadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const btn = form.querySelector('button[type="submit"]');
  const msg = document.getElementById("formMessage");
  const orig = btn.textContent;
  const fd = new FormData(form);
  const name = (fd.get("name") || "").toString().trim();
  const phone = (fd.get("phone") || "").toString().trim();
  const message = (fd.get("message") || "").toString().trim();
  const honeypot = (fd.get("company_website") || "").toString().trim();

  if (!name || phone.replace(/\D/g, "").length < 11) {
    msg.className = "form-message error";
    msg.textContent = "Пожалуйста, заполните имя и телефон корректно.";
    return;
  }
  btn.textContent = "Отправка..."; btn.disabled = true;
  try {
    const res = await fetch("https://api.formtomail.ru/send", {
      method: "POST",
      headers: {
        "Authorization": "Bearer dUqpZpsDapom3rNX",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Новая заявка: Электромонтаж в Белорецке",
        body: { "Имя": name, "Телефон": phone, "Сообщение": message },
        honeypot: honeypot
      })
    });
    const data = await res.json();
    if (res.ok && data.statusCode === 200) {
      msg.className = "form-message success";
      msg.textContent = "Спасибо! Заявка успешно отправлена.";
      form.reset();
    } else {
      msg.className = "form-message error";
      msg.textContent = data.statusCode === 400 ? "Ошибка: " + data.message : "Сервис временно недоступен. Позвоните нам.";
    }
  } catch (err) {
    console.error(err);
    msg.className = "form-message error";
    msg.textContent = "Ошибка сети. Позвоните нам.";
  } finally {
    btn.textContent = orig; btn.disabled = false;
  }
});

