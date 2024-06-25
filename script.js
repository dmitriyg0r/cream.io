let score = 0;
const scoreElement = document.getElementById('score');
const clickImage = document.getElementById('clickImage');
const refModal = document.getElementById('refModal');
const refButton = document.getElementById('refButton');
const upgradesButton = document.getElementById('upgradesButton');
const dropButton = document.getElementById('dropButton');
const upgradesModal = document.getElementById('upgradesModal');
const dropModal = document.getElementById('dropModal');
const closeBtns = document.getElementsByClassName('close');

// Проверяем, есть ли сохраненный счет в localStorage
if (localStorage.getItem('gameScore')) {
    score = parseInt(localStorage.getItem('gameScore'), 10);
    scoreElement.innerText = score;
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
    floatingScore.innerText = '+1';
    floatingScore.style.left = `${event.clientX}px`;
    floatingScore.style.top = `${event.clientY}px`;
    clickImage.parentNode.appendChild(floatingScore);

    setTimeout(() => {
        floatingScore.remove();
    }, 1500);
});

function incrementScore() {
    score++;
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
        refModal.style.display = 'none';
        upgradesModal.style.display = 'none';
        dropModal.style.display = 'none';
    });
}

window.addEventListener('click', function(event) {

    if (event.target == refModal) {
        refModal.style.display = 'none';
    }
    if (event.target == upgradesModal) {
        upgradesModal.style.display = 'none';
    }
    if (event.target == dropModal) {
        dropModal.style.display = 'none';
    }
});
