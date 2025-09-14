// Основной код для раскраски
function initColoring() {
    console.log('Инициализация раскраски...');
    
    // Переменные
    let currentColor = '#4a76a8';
    
    // Элементы
    const colorOptions = document.querySelectorAll('.color-option');
    const colorPicker = document.getElementById('custom-color-picker');
    const resetButton = document.getElementById('reset-coloring');
    const saveButton = document.getElementById('save-coloring');
    const ellipse = document.getElementById('ellipse-base');
    const logoImage = document.getElementById('logo-image'); // Добавляем ссылку на логотип в SVG
    
    // Инициализация
    function init() {
        updateLogo(); // Обновляем логотип при инициализации
        setupEventListeners();
        setActiveColor(currentColor);
        console.log('Раскраска инициализирована');
    }
    
    // Функция обновления логотипа
    function updateLogo() {
        if (logoImage) {
            // Устанавливаем новую иконку
            logoImage.setAttribute('href', 'https://img.icons8.com/?size=100&id=AyXuc49fiJPS&format=png&color=000000');
            logoImage.setAttribute('width', '180');
            logoImage.setAttribute('height', '180');
            logoImage.setAttribute('x', '110');
            logoImage.setAttribute('y', '110');
        }
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        // Выбор цвета из палитры
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                currentColor = this.getAttribute('data-color');
                setActiveColor(currentColor);
                colorPicker.value = currentColor;
            });
        });
        
        // Кастомный выбор цвета
        colorPicker.addEventListener('input', function() {
            currentColor = this.value;
            setActiveColor(currentColor);
        });
        
        // Клик по эллипсу для раскраски
        ellipse.addEventListener('click', function() {
            applyColor();
        });
        
        // Кнопка сброса
        resetButton.addEventListener('click', resetColoring);
        
        // Кнопка сохранения
        saveButton.addEventListener('click', saveColoring);
    }
    
    // Установка активного цвета
    function setActiveColor(color) {
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color') === color) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // Применение цвета к эллипсу
    function applyColor() {
        ellipse.style.fill = currentColor;
        ellipse.classList.add('colored-element');
        
        // Убираем класс анимации после завершения
        setTimeout(() => {
            ellipse.classList.remove('colored-element');
        }, 500);
    }
    
    // Сброс раскраски
    function resetColoring() {
        // Сбрасываем цвет эллипса к исходному
        ellipse.style.fill = '#f0f7fd';
        
        // Сбрасываем выбор цвета
        currentColor = '#4a76a8';
        colorPicker.value = currentColor;
        setActiveColor(currentColor);
        
        // Показываем сообщение об успехе
        showModal('success', 'Раскраска сброшена!', 'Эллипс восстановлен к исходному цвету.');
    }
    

function saveColoring() {
    try {
        // Создаем canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 600;
        
        // Используем новую иконку школы
        const logoImg = new Image();
        logoImg.crossOrigin = 'Anonymous'; // Разрешаем CORS
        
        logoImg.onload = function() {
            // Рисуем белый фон
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Получаем текущий цвет эллипса
            const ellipse = document.getElementById('ellipse-base');
            const ellipseColor = ellipse.style.fill || '#f0f7fd';
            
            // Рисуем эллипс с текущим цветом заливки
            ctx.fillStyle = ellipseColor;
            ctx.strokeStyle = '#4a76a8';
            ctx.lineWidth = 6;
            
            // Рисуем эллипс
            ctx.beginPath();
            ctx.ellipse(300, 300, 240, 240, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            
            // Рисуем иконку школы поверх эллипса
            const logoSize = 200;
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (canvas.height - logoSize) / 2;
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            
            // Создаем PNG
            const pngUrl = canvas.toDataURL('image/png');
            
            // Скачиваем
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'shkola4-raskraska.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showModal('success', 'Успешно сохранено!', 'Ваша раскраска сохранена в файл PNG.');
        };
        
        logoImg.onerror = function() {
            // Fallback - рисуем простой текст если иконка не загрузилась
            drawFallbackLogo(ctx, canvas);
        };
        
        // Используем новую иконку
        logoImg.src = 'https://img.icons8.com/?size=100&id=AyXuc49fiJPS&format=png&color=000000';
        
    } catch (error) {
        console.error('Ошибка при сохранении:', error);
        showModal('error', 'Ошибка!', 'Не удалось сохранить раскраску. Попробуйте еще раз.');
    }
}

// Функция fallback если иконка не загрузится
function drawFallbackLogo(ctx, canvas) {
    // Рисуем белый фон
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем эллипс
    const ellipse = document.getElementById('ellipse-base');
    ctx.fillStyle = ellipse.style.fill || '#f0f7fd';
    ctx.strokeStyle = '#4a76a8';
    ctx.lineWidth = 6;
    
    ctx.beginPath();
    ctx.ellipse(300, 300, 240, 240, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Рисуем текстовый логотип
    ctx.fillStyle = '#4a76a8';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Ш4', 300, 300);
    
    // Создаем PNG и скачиваем
    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'shkola4-raskraska.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showModal('success', 'Успешно сохранено!', 'Ваша раскраска сохранена в файл PNG.');
}
    
    // Функция показа модального окна
    function showModal(type, title, message) {
        const modal = document.getElementById('modal');
        const modalIcon = document.getElementById('modal-icon');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        const modalButton = document.querySelector('.modal-button');
        
        // Устанавливаем иконку в зависимости от типа
        modalIcon.innerHTML = type === 'success' 
            ? '<i class="fas fa-check-circle" style="color: #4CAF50; font-size: 48px;"></i>'
            : '<i class="fas fa-exclamation-circle" style="color: #f44336; font-size: 48px;"></i>';
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        // Показываем модальное окно
        modal.style.display = 'block';
        
        // Обработчик закрытия модального окна
        const closeModal = document.querySelector('.close-modal');
        closeModal.onclick = function() {
            modal.style.display = 'none';
        }
        
        modalButton.onclick = function() {
            modal.style.display = 'none';
        }
        
        // Закрытие по клику вне окна
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    }
    
    // Запуск инициализации
    init();
}

// Экспорт функции для глобального доступа
window.initColoring = initColoring;