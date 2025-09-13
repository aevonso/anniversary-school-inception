function initMultiplicationGame() {
    let playerInfo = {
        firstName: '',
        lastName: '',
        class: ''
    };
    
    let gameState = {
        currentLevel: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        currentQuestion: null
    };
    
    const screens = {
        table: document.getElementById('multiplication-table-screen'),
        registration: document.getElementById('registration-screen'),
        levelSelection: document.getElementById('level-selection-screen'),
        game: document.getElementById('game-screen'),
        results: document.getElementById('results-screen')
    };
    
    function init() {
        generateMultiplicationTable();
        generateLevelButtons();
        setupEventListeners();
    }
    
    function generateMultiplicationTable() {
        const tableContainer = document.querySelector('.multiplication-table');
        
        while (tableContainer.children.length > 1) {
            tableContainer.removeChild(tableContainer.lastChild);
        }
        
        for (let i = 1; i <= 10; i++) {
            const row = document.createElement('div');
            row.className = 'table-row';
            
            const multiplierCell = document.createElement('div');
            multiplierCell.textContent = i;
            multiplierCell.style.fontWeight = 'bold';
            row.appendChild(multiplierCell);
            
            for (let j = 1; j <= 10; j++) {
                const cell = document.createElement('div');
                cell.textContent = i * j;
                row.appendChild(cell);
            }
            
            tableContainer.appendChild(row);
        }
    }
    
    function generateLevelButtons() {
        const levelsContainer = document.querySelector('.levels-grid');
        levelsContainer.innerHTML = '';
        
        for (let i = 1; i <= 10; i++) {
            const button = document.createElement('button');
            button.className = 'level-button';
            button.textContent = i;
            button.dataset.level = i;
            button.addEventListener('click', () => startLevel(i));
            levelsContainer.appendChild(button);
        }
    }
    
    function setupEventListeners() {
        document.querySelector('.start-game-btn').addEventListener('click', showRegistrationScreen);
        
        document.getElementById('registration-form').addEventListener('submit', handleRegistration);
        
        document.getElementById('submit-answer').addEventListener('click', checkAnswer);
        document.getElementById('back-to-levels').addEventListener('click', showLevelSelectionScreen);
        document.getElementById('play-again').addEventListener('click', showLevelSelectionScreen);
        document.getElementById('back-to-menu').addEventListener('click', () => window.location.href = '../index.html');
        
        document.getElementById('answer-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
    }
    
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        screens[screenName].classList.add('active');
    }
    
    function showRegistrationScreen() {
        showScreen('registration');
    }
    
    function showLevelSelectionScreen() {
        document.getElementById('player-name').textContent = `${playerInfo.firstName} ${playerInfo.lastName}`;
        document.getElementById('player-class').textContent = playerInfo.class;
        showScreen('levelSelection');
    }
    
    function showGameScreen() {
        document.getElementById('current-player').textContent = `${playerInfo.firstName} ${playerInfo.lastName}`;
        document.getElementById('current-level').textContent = gameState.currentLevel;
        updateGameStats();
        generateQuestion();
        showScreen('game');
        
        setTimeout(() => {
            document.getElementById('answer-input').focus();
        }, 100);
    }
    
    function showResultsScreen() {
        document.getElementById('result-level').textContent = gameState.currentLevel;
        document.getElementById('result-correct').textContent = gameState.correctAnswers;
        document.getElementById('result-wrong').textContent = gameState.wrongAnswers;
        document.getElementById('result-grade').textContent = calculateGrade();
        showScreen('results');
    }
    
    function handleRegistration(e) {
        e.preventDefault();
        
        playerInfo = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            class: document.getElementById('class').value
        };
        
        const classNum = parseInt(playerInfo.class);
        if (classNum < 1 || classNum > 4) {
            alert('Пожалуйста, выберите класс от 1 до 4');
            return;
        }
        
        showLevelSelectionScreen();
    }
    
    // Начало уровня
    function startLevel(level) {
        gameState = {
            currentLevel: level,
            correctAnswers: 0,
            wrongAnswers: 0,
            currentQuestion: null
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
        document.getElementById('question').textContent = `${a} × ${b} = ?`;
        document.getElementById('answer-input').value = '';
    }
    
    function checkAnswer() {
        const input = document.getElementById('answer-input');
        const userAnswer = parseInt(input.value);
        
        if (isNaN(userAnswer)) {
            alert('Пожалуйста, введите число');
            input.focus();
            return;
        }
        
        if (userAnswer === gameState.currentQuestion.answer) {
            gameState.correctAnswers++;
            input.style.borderColor = '#28a745';
            setTimeout(() => {
                input.style.borderColor = '#4a76a8';
                nextQuestion();
            }, 500);
        } else {
            gameState.wrongAnswers++;
            input.style.borderColor = '#dc3545';
            setTimeout(() => {
                input.style.borderColor = '#4a76a8';
                input.value = '';
                input.focus();
            }, 500);
        }
        
        updateGameStats();
        
        if (gameState.correctAnswers + gameState.wrongAnswers >= 10) {
            setTimeout(showResultsScreen, 600);
        }
    }
    
    function nextQuestion() {
        generateQuestion();
        document.getElementById('answer-input').focus();
    }
    
    function updateGameStats() {
        document.getElementById('correct-answers').textContent = gameState.correctAnswers;
        document.getElementById('wrong-answers').textContent = gameState.wrongAnswers;
    }
    
    function calculateGrade() {
        const total = gameState.correctAnswers + gameState.wrongAnswers;
        const percentage = (gameState.correctAnswers / total) * 100;
        
        if (percentage >= 90) return '5 (Отлично)';
        if (percentage >= 75) return '4 (Хорошо)';
        if (percentage >= 60) return '3 (Удовлетворительно)';
        return '2 (Неудовлетворительно)';
    }
    
    init();
}