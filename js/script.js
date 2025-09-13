// Функция для инициализации хедера
function initHeader() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Переход к: ' + this.textContent.trim());
            }
        });
    });
    
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.transition = 'transform 0.5s ease';
            this.style.transform = 'rotate(360deg)';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 500);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-list li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            alert('Вы выбрали: ' + this.textContent.trim());
        });
    });
    
    const actionButton = document.querySelector('.action-button');
    if (actionButton) {
        actionButton.addEventListener('click', function() {
            alert('Начинаем изучение таблицы умножения!');
        });
    }
    
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});