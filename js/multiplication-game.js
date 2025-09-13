function initMultiplicationGame() {
    console.log('Инициализация игры с таблицей умножения...');
    
    let playerInfo = {
        firstName: '',
        lastName: '',
        class: ''
    };
    
    let gameState = {
        currentLevel: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        currentQuestion: null,
        totalQuestions: 10,
        completedQuestions: 0
    };
    
    const screens = {
        table: document.getElementById('multiplication-table-screen'),
        registration: document.getElementById('registration-screen'),
        levelSelection: document.getElementById('level-selection-screen'),
        game: document.getElementById('game-screen'),
        results: document.getElementById('results-screen')
    };
    
    const modal = {
        element: document.getElementById('notification-modal'),
        icon: document.getElementById('modal-icon'),
        title: document.getElementById('modal-title'),
        message: document.getElementById('modal-message'),
        button: document.getElementById('modal-button'),
        close: document.querySelector('.close-modal')
    };
    
 function init() {
    console.log('Запуск инициализации игры...');
    generateMultiplicationTable();
    generateLevelButtons();
    setupEventListeners();
    setupModal();
    initTouchEvents(); 
    console.log('Игра успешно инициализирована');
}

function generateMultiplicationTable() {
    console.log('Генерация таблицы умножения...');
    const tbody = document.querySelector('.multiplication-table tbody');
    if (!tbody) {
        console.error('Не найден tbody для таблицы умножения');
        return;
    }
    
    tbody.innerHTML = '';
    
    const headerRow = document.createElement('tr');
    const emptyHeader = document.createElement('th');
    emptyHeader.textContent = '×';
    headerRow.appendChild(emptyHeader);
    
    for (let j = 1; j <= 10; j++) {
        const th = document.createElement('th');
        th.textContent = j;
        headerRow.appendChild(th);
    }
    tbody.appendChild(headerRow);
    
    for (let i = 1; i <= 10; i++) {
        const row = document.createElement('tr');
        
        const headerCell = document.createElement('th');
        headerCell.textContent = i;
        row.appendChild(headerCell);
        
        for (let j = 1; j <= 10; j++) {
            const cell = document.createElement('td');
            cell.textContent = i * j;
            
            cell.setAttribute('aria-label', `${i} умножить на ${j} равно ${i * j}`);
            
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    }
    console.log('Таблица умножения сгенерирована');
}
    
    function generateLevelButtons() {
        console.log('Генерация кнопок уровней...');
        const levelsContainer = document.querySelector('.levels-grid');
        if (!levelsContainer) {
            console.error('Не найден контейнер для уровней');
            return;
        }
        
        levelsContainer.innerHTML = '';
        
        for (let i = 1; i <= 10; i++) {
            const button = document.createElement('button');
            button.className = 'level-button';
            button.textContent = i;
            button.dataset.level = i;
            button.addEventListener('click', () => startLevel(i));
            levelsContainer.appendChild(button);
        }
        console.log('Кнопки уровней сгенерированы');
    }
    
    function setupModal() {
        console.log('Настройка модального окна...');
        if (!modal.close || !modal.button) {
            console.error('Элементы модального окна не найдены');
            return;
        }
        
        modal.close.addEventListener('click', hideModal);
        modal.button.addEventListener('click', hideModal);
        
        modal.element.addEventListener('click', function(e) {
            if (e.target === modal.element) {
                hideModal();
            }
        });
        console.log('Модальное окно настроено');
    }
    
    function showModal(type, title, message) {
        if (!modal.element || !modal.icon || !modal.title || !modal.message) {
            console.error('Элементы модального окна не найдены');
            alert(`${title}: ${message}`);
            return;
        }
        
        modal.icon.className = 'modal-icon';
        modal.title.textContent = title;
        modal.message.textContent = message;
        
        switch(type) {
            case 'success':
                modal.icon.className += ' success';
                modal.icon.innerHTML = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                modal.icon.className += ' error';
                modal.icon.innerHTML = '<i class="fas fa-times-circle"></i>';
                break;
            case 'info':
                modal.icon.className += ' info';
                modal.icon.innerHTML = '<i class="fas fa-info-circle"></i>';
                break;
        }
        
        modal.element.style.display = 'block';
    }
    
    function hideModal() {
        if (modal.element) {
            modal.element.style.display = 'none';
        }
    }
    
    function setupEventListeners() {
        console.log('Настройка обработчиков событий...');
        
        const startBtn = document.querySelector('.start-game-btn');
        if (startBtn) {
            startBtn.addEventListener('click', showRegistrationScreen);
        } else {
            console.error('Не найдена кнопка начала игры');
        }
        
        const registrationForm = document.getElementById('registration-form');
        if (registrationForm) {
            registrationForm.addEventListener('submit', handleRegistration);
        } else {
            console.error('Не найдена форма регистрации');
        }
        
        const submitAnswerBtn = document.getElementById('submit-answer');
        if (submitAnswerBtn) {
            submitAnswerBtn.addEventListener('click', checkAnswer);
        }
        
        const backToLevelsBtn = document.getElementById('back-to-levels');
        if (backToLevelsBtn) {
            backToLevelsBtn.addEventListener('click', showLevelSelectionScreen);
        }
        
        const playAgainBtn = document.getElementById('play-again');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', showLevelSelectionScreen);
        }
        
        const backToMenuBtn = document.getElementById('back-to-menu');
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', () => window.location.href = '../index.html');
        }
        
        const answerInput = document.getElementById('answer-input');
        if (answerInput) {
            answerInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkAnswer();
                }
            });
        }
        
        console.log('Обработчики событий настроены');
    }
    
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => {
            if (screen) {
                screen.classList.remove('active');
            }
        });
        
        if (screens[screenName]) {
            screens[screenName].classList.add('active');
        }
    }
    
    function showRegistrationScreen() {
        showScreen('registration');
    }
    
    function showLevelSelectionScreen() {
        if (document.getElementById('player-name') && document.getElementById('player-class')) {
            document.getElementById('player-name').textContent = `${playerInfo.firstName} ${playerInfo.lastName}`;
            document.getElementById('player-class').textContent = playerInfo.class;
        }
        showScreen('levelSelection');
    }
    
    function showGameScreen() {
        if (document.getElementById('current-player') && document.getElementById('current-level')) {
            document.getElementById('current-player').textContent = `${playerInfo.firstName} ${playerInfo.lastName}`;
            document.getElementById('current-level').textContent = gameState.currentLevel;
        }
        
        updateGameStats();
        
        if (!document.getElementById('progress-container')) {
            const progressHTML = `
                <div class="progress-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
            `;
            const gameContent = document.querySelector('.game-content');
            if (gameContent) {
                gameContent.insertAdjacentHTML('afterbegin', progressHTML);
            }
        }
        
        updateProgressBar();
        generateQuestion();
        showScreen('game');
        
        setTimeout(() => {
            const answerInput = document.getElementById('answer-input');
            if (answerInput) {
                answerInput.focus();
            }
        }, 100);
    }
    
    function showResultsScreen() {
        if (document.getElementById('result-level') && document.getElementById('result-correct') && 
            document.getElementById('result-wrong') && document.getElementById('result-grade')) {
            document.getElementById('result-level').textContent = gameState.currentLevel;
            document.getElementById('result-correct').textContent = gameState.correctAnswers;
            document.getElementById('result-wrong').textContent = gameState.wrongAnswers;
            document.getElementById('result-grade').textContent = calculateGrade();
        }
        showScreen('results');
    }
    
     function handleRegistration(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const classNumber = document.getElementById('classNumber');
        const classLetter = document.getElementById('classLetter');
        
        if (!firstName || !lastName || !classNumber || !classLetter) {
            showModal('error', 'Ошибка', 'Не найдены поля формы');
            return;
        }
        
        playerInfo = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            classNumber: classNumber.value,
            classLetter: classLetter.value
        };
        
        // Проверка класса (1-4)
        const classNum = parseInt(playerInfo.classNumber);
        if (classNum < 1 || classNum > 4 || isNaN(classNum)) {
            showModal('error', 'Ошибка', 'Пожалуйста, выберите класс от 1 до 4');
            return;
        }
        
        if (!playerInfo.classLetter) {
            showModal('error', 'Ошибка', 'Пожалуйста, выберите букву класса');
            return;
        }
        
        if (!playerInfo.firstName || !playerInfo.lastName) {
            showModal('error', 'Ошибка', 'Пожалуйста, заполните все поля');
            return;
        }
        
        showLevelSelectionScreen();
    }
    
    function startLevel(level) {
        gameState = {
            currentLevel: level,
            correctAnswers: 0,
            wrongAnswers: 0,
            currentQuestion: null,
            totalQuestions: 10,
            completedQuestions: 0
        };
        
        showGameScreen();
    }
    
    function generateQuestion() {
        const level = gameState.currentLevel;
        let a, b;
        
        if (level <= 3) {
            a = level;
            b = Math.floor(Math.random() * 10) + 1;
        } else if (level <= 6) {
            a = Math.floor(Math.random() * 5) + 1;
            b = Math.floor(Math.random() * 10) + 1;
        } else {
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
        }
        
        gameState.currentQuestion = { a, b, answer: a * b };
        
        const questionElement = document.getElementById('question');
        if (questionElement) {
            questionElement.textContent = `${a} × ${b} = ?`;
        }
        
        const answerInput = document.getElementById('answer-input');
        if (answerInput) {
            answerInput.value = '';
        }
    }
    
    function checkAnswer() {
        const input = document.getElementById('answer-input');
        if (!input) {
            console.error('Не найдено поле ввода ответа');
            return;
        }
        
        const userAnswer = parseInt(input.value);
        
        if (isNaN(userAnswer)) {
            showModal('error', 'Ошибка', 'Пожалуйста, введите число');
            input.focus();
            return;
        }
        
        input.classList.remove('correct-answer', 'wrong-answer');
        
        if (userAnswer === gameState.currentQuestion.answer) {
            gameState.correctAnswers++;
            input.classList.add('correct-answer');
            showModal('success', 'Правильно!', `Молодец! ${gameState.currentQuestion.a} × ${gameState.currentQuestion.b} = ${gameState.currentQuestion.answer}`);
            
            setTimeout(() => {
                hideModal();
                nextQuestion();
            }, 1500);
        } else {
            gameState.wrongAnswers++;
            input.classList.add('wrong-answer');
            showModal('error', 'Неправильно', `Правильный ответ: ${gameState.currentQuestion.a} × ${gameState.currentQuestion.b} = ${gameState.currentQuestion.answer}`);
            
            setTimeout(() => {
                hideModal();
                input.value = '';
                input.focus();
            }, 1500);
        }
        
        gameState.completedQuestions++;
        updateGameStats();
        updateProgressBar();
        
        if (gameState.completedQuestions >= gameState.totalQuestions) {
            setTimeout(showResultsScreen, 1600);
        }
    }
    
    function nextQuestion() {
        generateQuestion();
        const answerInput = document.getElementById('answer-input');
        if (answerInput) {
            answerInput.focus();
        }
    }
    
    function updateGameStats() {
        const correctElement = document.getElementById('correct-answers');
        const wrongElement = document.getElementById('wrong-answers');
        
        if (correctElement) {
            correctElement.textContent = gameState.correctAnswers;
        }
        if (wrongElement) {
            wrongElement.textContent = gameState.wrongAnswers;
        }
    }
    
    function updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const progress = (gameState.completedQuestions / gameState.totalQuestions) * 100;
            progressBar.style.width = progress + '%';
        }
    }
    
    function calculateGrade() {
        const total = gameState.correctAnswers + gameState.wrongAnswers;
        if (total === 0) return 'Нет данных';
        
        const percentage = (gameState.correctAnswers / total) * 100;
        
        if (percentage >= 90) return '5 (Отлично)';
        if (percentage >= 75) return '4 (Хорошо)';
        if (percentage >= 60) return '3 (Удовлетворительно)';
        return '2 (Неудовлетворительно)';
    }
    
    init();
}

function initTouchEvents() {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        let startX;
        let scrollLeft;
        
        tableContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX - tableContainer.offsetLeft;
            scrollLeft = tableContainer.scrollLeft;
        });
        
        tableContainer.addEventListener('touchmove', function(e) {
            if (!startX) return;
            const x = e.touches[0].pageX - tableContainer.offsetLeft;
            const walk = (x - startX) * 2;
            tableContainer.scrollLeft = scrollLeft - walk;
        });
    }
}



window.initMultiplicationGame = initMultiplicationGame;