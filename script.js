let score = 0;
        let clickMultiplier = 1;
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

        // Проверяем, есть ли сохраненный счет в localStorage
        if (localStorage.getItem('gameScore')) {
            score = parseInt(localStorage.getItem('gameScore'), 10);
            scoreElement.innerText = score;
        }
        if (localStorage.getItem('gameUpgrades')) {
            const upgrades = JSON.parse(localStorage.getItem('gameUpgrades'));
            clickMultiplier = upgrades.clickMultiplier;
            if (upgrades.multiClickPurchased) multiClickUpgrade.style.display = 'none';
            if (upgrades.superClickPurchased) superClickUpgrade.style.display = 'none';
            if (upgrades.energyBlastPurchased) energyBlastUpgrade.style.display = 'none';
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
        energyBlastUpgrade.addEventListener('click', () => {
            if (score >= 3000) {
                score -= 3000;
                clickMultiplier += 10;
                scoreElement.textContent = score;
                energyBlastUpgrade.style.display = 'none'; // Скрыть улучшение после покупки
                saveUpgrades();
            }
            });
        });
        function saveUpgrades() {
            const upgrades = {
                clickMultiplier: clickMultiplier,
                multiClickPurchased: multiClickUpgrade.style.display === 'none',
                superClickPurchased: superClickUpgrade.style.display === 'none',
                energyBlastPurchased: energyBlastUpgrade.style.display === 'none'
            };
            localStorage.setItem('gameUpgrades', JSON.stringify(upgrades));
        }
