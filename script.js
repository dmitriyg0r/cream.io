let score = 0;
let clickMultiplier = 1;
let autoClickRate = 0;
const scoreElement = document.getElementById('score');
const clickImage = document.getElementById('clickImage');
const refModal = document.getElementById('refModal');
const refButton = document.getElementById('refButton');
const upgradesButton = document.getElementById('upgradesButton');
const dropButton = document.getElementById('dropButton');
const upgradesModal = document.getElementById('upgradesModal');
const dropModal = document.getElementById('dropModal');
const closeBtns = document.getElementsByClassName('close');
const multiClickUpgrade = document.getElementById('multiClickUpgrade');
const pasiveClickUpgrade = document.getElementById('pasiveClickUpgrade');
const uslugiClickUpgrade = document.getElementById('uslugiClickUpgrade');
const investClickUpgrade = document.getElementById('investClickUpgrade');
document.body.style.overflow = 'hidden';
document.body.style.height = '100vh';

// Проверяем, есть ли сохраненный счет в localStorage
if (localStorage.getItem('gameScore')) {
    score = parseInt(localStorage.getItem('gameScore'), 10);
    scoreElement.innerText = score;
}
if (localStorage.getItem('gameUpgrades')) {
    const upgrades = JSON.parse(localStorage.getItem('gameUpgrades'));
    clickMultiplier = upgrades.clickMultiplier;
    autoClickRate = upgrades.autoClickRate || 0; // Добавлено для автоклика
    if (upgrades.pasiveClickPurchased) pasiveClickUpgrade.style.display = 'none';
    if (upgrades.uslugiClickPurchased) uslugiClickUpgrade.style.display = 'none';
    if (upgrades.investClickPurchased) investClickUpgrade.style.display = 'none';
    if (upgrades.multiClickPurchased) multiClickUpgrade.style.display = 'none';
}

document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

clickImage.addEventListener('click', function(event) {
    incrementScore();
    clickImage.classList.add('clicked');
    setTimeout(() => {
        clickImage.classList.remove('clicked');
    }, 100);

    const floatingScore = document.createElement('div');
    floatingScore.className = 'floating-score';
    floatingScore.innerText = `+${clickMultiplier}`;
    floatingScore.style.left = `${event.clientX}px`;
    floatingScore.style.top = `${event.clientY}px`;
    clickImage.parentNode.appendChild(floatingScore);

    setTimeout(() => {
        floatingScore.remove();
    }, 1500);
});

function incrementScore() {
    score += clickMultiplier;
    scoreElement.innerText = score;
    // Сохраняем счет в localStorage
    localStorage.setItem('gameScore', score);
}

refButton.addEventListener('click', function() {
    refModal.style.display = 'block';
});

upgradesButton.addEventListener('click', function() {
    upgradesModal.style.display = 'block';
});

dropButton.addEventListener('click', function() {
    dropModal.style.display = 'block';
});

for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', function() {
        if (closeBtns[i].closest('.modal') === refModal) {
            refModal.style.display = 'none';
        } else if (closeBtns[i].closest('.modal') === upgradesModal) {
            upgradesModal.style.display = 'none';
        } else if (closeBtns[i].closest('.modal') === dropModal) {
            dropModal.style.display = 'none';
        }
    });
}

window.addEventListener('click', function(event) {
    if (event.target === refModal) {
        refModal.style.display = 'none';
    }
    if (event.target === upgradesModal) {
        upgradesModal.style.display = 'none';
    }
    if (event.target === dropModal) {
        dropModal.style.display = 'none';
    }
});

multiClickUpgrade.addEventListener('click', () => {
    if (score >= 300) {
        score -= 300;
        clickMultiplier += 2;
        scoreElement.textContent = score;
        multiClickUpgrade.style.display = 'none'; // Скрыть улучшение после покупки
        saveUpgrades();
    }
});

superClickUpgrade.addEventListener('click', () => {
    if (score >= 1000) {
        score -= 1000;
        clickMultiplier += 5;
        scoreElement.textContent = score;
        superClickUpgrade.style.display = 'none'; // Скрыть улучшение после покупки
        saveUpgrades();
    }
});

energyBlastUpgrade.addEventListener('click', () => {
    if (score >= 3000) {
        score -= 3000;
        clickMultiplier += 10;
        scoreElement.textContent = score;
        energyBlastUpgrade.style.display = 'none'; // Скрыть улучшение после покупки
        saveUpgrades();
    }
});

pasiveClickUpgrade.addEventListener('click', () => {
    if (score >= 100) {
        score -= 100;
        autoClickRate += 1;
        scoreElement.textContent = score;
        pasiveClickUpgrade.style.display = 'none'; // Скрыть улучшение после покупки
        saveUpgrades();
    }
});

uslugiClickUpgrade.addEventListener('click', () => {
    if (score >= 300) {
        score -= 300;
        autoClickRate += 2;
        scoreElement.textContent = score;
        uslugiClickUpgrade.style.display = 'none'; // Скрыть улучшение после покупки
        saveUpgrades();
    }
});

investClickUpgrade.addEventListener('click', () => {
    if (score >= 1000) {
        score -= 1000;
        autoClickRate += 5;
        scoreElement.textContent = score;
        investClickUpgrade.style.display = 'none'; // Скрыть улучшение после покупки
        saveUpgrades();
    }
});

function saveUpgrades() {
    const upgrades = {
        clickMultiplier: clickMultiplier,
        autoClickRate: autoClickRate,
        pasiveClickPurchased: pasiveClickUpgrade.style.display === 'none',
        uslugiClickPurchased: uslugiClickUpgrade.style.display === 'none',
        investClickPurchased: investClickUpgrade.style.display === 'none',
        multiClickPurchased: multiClickUpgrade.style.display === 'none'
    };
    localStorage.setItem('gameUpgrades', JSON.stringify(upgrades));
}

function autoIncrementScore() {
    score += autoClickRate;
    scoreElement.innerText = score;
    localStorage.setItem('gameScore', score);
}

setInterval(autoIncrementScore, 1000);
