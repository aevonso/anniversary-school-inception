function initHeader() {
    console.log('Инициализация хедера...');
    
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.includes('index.html')) {
                e.preventDefault();
                showNavigationNotice(this.textContent.trim());
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
    
    // Инициализируем модальное окно
    initModal();
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-button');
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', hideModal);
    }
    
    if (modalBtn && modal) {
        modalBtn.addEventListener('click', hideModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
}

// Показать уведомление о навигации
function showNavigationNotice(sectionName) {
    showModal('info', 'Раздел в разработке', `Раздел "${sectionName}" находится в разработке. Скоро будет доступен!`);
}

// Показать модальное окно
function showModal(type, title, message) {
    const modal = document.getElementById('modal');
    const icon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    if (!modal || !icon || !modalTitle || !modalMessage) return;
    
    // Устанавливаем иконку в зависимости от типа
    icon.className = 'modal-icon';
    switch(type) {
        case 'info':
            icon.innerHTML = '<i class="fas fa-info-circle"></i>';
            icon.classList.add('info');
            break;
        case 'success':
            icon.innerHTML = '<i class="fas fa-check-circle"></i>';
            icon.classList.add('success');
            break;
        case 'error':
            icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            icon.classList.add('error');
            break;
    }
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Скрыть модальное окно
function hideModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Обработка кликов по элементам меню на главной странице
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-list li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (!text.includes('Таблица умножения') && !text.includes('VKонтакте')) {
                showModal('info', 'Выбор раздела', `Вы выбрали: ${text}`);
            }
        });
    });
    
    const actionButton = document.querySelector('.action-button');
    if (actionButton) {
        actionButton.addEventListener('click', function() {
            showModal('success', 'Отлично!', 'Начинаем изучение таблицы умножения!');
        });
    }
    
    // Плавное появление контента
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

function handleGameNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('multiplication')) {
                return true;
            }
            
            if (this.getAttribute('href') === '#' || 
                this.getAttribute('href').includes('index.html')) {
                e.preventDefault();
                showNavigationNotice(this.textContent.trim());
            }
        });
    });
}