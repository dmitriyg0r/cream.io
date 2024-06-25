body {
margin: 0;
font-family: 'Arial', sans-serif;
--s: 25vmin;
--p: calc(var(--s) / 2);
--c1: pink;
--c2: dodgerblue;
--c3: white;
--bg: var(--c3);
--d: 10000ms;
--e: cubic-bezier(0.76, 0, 0.24, 1);

background-color: var(--bg);
background-image:
  linear-gradient(45deg, var(--c1) 25%, transparent 25%),
  linear-gradient(-45deg, var(--c1) 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, var(--c2) 75%),
  linear-gradient(-45deg, transparent 75%, var(--c2) 75%);
background-size: var(--s) var(--s);
background-position:
  calc(var(--p) *  1) calc(var(--p) *  0),
  calc(var(--p) * -1) calc(var(--p) *  1),
  calc(var(--p) *  1) calc(var(--p) * -1),
  calc(var(--p) * -1) calc(var(--p) *  0);
animation:
  color var(--d) var(--e) infinite,
  position var(--d) var(--e) infinite;
}

@keyframes color {
0%, 25% {
  --bg: var(--c3);
}
26%, 50% {
  --bg: var(--c1);
}
51%, 75% {
  --bg: var(--c3);
}
76%, 100% {
  --bg: var(--c2);
}
}

@keyframes position {
0% {
  background-position:
    calc(var(--p) *  1) calc(var(--p) *  0),
    calc(var(--p) * -1) calc(var(--p) *  1),
    calc(var(--p) *  1) calc(var(--p) * -1),
    calc(var(--p) * -1) calc(var(--p) *  0);
}
25% {
  background-position:
    calc(var(--p) *  1) calc(var(--p) *  4),
    calc(var(--p) * -1) calc(var(--p) *  5),
    calc(var(--p) *  1) calc(var(--p) *  3),
    calc(var(--p) * -1) calc(var(--p) *  4);
}
50% {
  background-position:
    calc(var(--p) *  3) calc(var(--p) * 8),
    calc(var(--p) * -3) calc(var(--p) * 9),
    calc(var(--p) *  2) calc(var(--p) * 7),
    calc(var(--p) * -2) calc(var(--p) * 8);
}
75% {
  background-position:
    calc(var(--p) *  3) calc(var(--p) * 12),
    calc(var(--p) * -3) calc(var(--p) * 13),
    calc(var(--p) *  2) calc(var(--p) * 11),
    calc(var(--p) * -2) calc(var(--p) * 12);
}
100% {
  background-position:
    calc(var(--p) *  5) calc(var(--p) * 16),
    calc(var(--p) * -5) calc(var(--p) * 17),
    calc(var(--p) *  5) calc(var(--p) * 15),
    calc(var(--p) * -5) calc(var(--p) * 16);
}
}

@media (prefers-reduced-motion) {
body {
  animation: none;
}
}
.score {
    text-align: center;
    font-size: 24px;
    margin: 20px 0;
    position: absolute;
    top: 40px;
    width: 100%;
    color: #000000;
}
.clicker {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
}
.clicker img {
    width: 250px; /* Увеличен размер в 2 раза */
    height: 250px; /* Увеличен размер в 2 раза */
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
    -webkit-tap-highlight-color: transparent; /* Убирает подсветку на мобильных устройствах */
    outline: none; /* Убирает подсветку на десктопных устройствах */
}
.clicker img.clicked {
    transform: scale(0.9);
}
.floating-score {
    position: absolute;
    font-size: 24px;
    color: #ffffff;
    pointer-events: none;
    animation: floatUp 1.5s ease-in-out forwards;
}
@keyframes floatUp {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-50px);
    }
}
/* нижнее меню */
.menu-container {
    position: fixed;
    bottom: 20px; /* отступ снизу */
    left: 20px; /* отступ слева */
    right: 20px; /* отступ справа */
    display: flex;
    justify-content: center;
    background-color: rgba(0, 17, 255, 0.7); /* полупрозрачный черный цвет */
    border-radius: 30px; /* скругление всех углов */
    box-shadow: 0 -2px 10px rgba(0, 17, 255, 0.7);
}
.menu-item {
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    color: #fff; /* Цвет текста в меню */
    border-radius: 20px;
}
.menu-item:hover {
    background-color: #333; /* цвет при наведении */
    transform: scale(1.1); /* эффект увеличения при наведении */
}
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}
.modal-content {
    background-color: rgba(0, 0, 0, 0.8); /* Изменено на полупрозрачный черный цвет */
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    text-align: center;
    color: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.modal-content img {
    width: 100px; /* Размер изображения */
    height: 100px; /* Размер изображения */
    margin-bottom: 10px;
}
.close {
    color: #aaa;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: white;
    text-decoration: none;
    cursor: pointer;
}
.upgrades-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
}
.upgrades-list li {
    padding: 10px;
    border-bottom: 1px solid #888;
    transition: background-color 0.3s;
}
.upgrades-list li:last-child {
    border-bottom: none;
}
.upgrades-list li:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
