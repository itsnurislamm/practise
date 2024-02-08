document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Собираем данные из формы
    const productName = document.getElementById('productName').value;
    const reason = document.getElementById('reason').value;
    const manager = document.getElementById('manager').value;

    // Формируем сообщение для отправки в телеграм
    const message = `Новый продукт в стопе:\nНазвание: ${productName}\nПричина: ${reason}\nМенеджер: ${manager}`;

    // Отправляем запрос на сервер для отправки сообщения в телеграм
    fetch('/sendToTelegram', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            chatId: '868222918', // Замени на свой chat_id
            botToken: '6889567026:AAHvKfB06KmdMb0s6O4JB-4T0kAioVORfCw', // Замени на свой токен
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Уведомление успешно отправлено в телеграм!');
        } else {
            alert('Ошибка при отправке уведомления в телеграм.');
        }
    })
    .catch(error => console.error('Ошибка:', error));
});
