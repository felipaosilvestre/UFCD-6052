// script.js
let count = 0;
let intervalId = null;

document.getElementById('startButton').addEventListener('click', () => {
    if (intervalId === null) { 
        intervalId = setInterval(() => {
            document.getElementById('counter').textContent = count++;
        }, 1000); 
    }
});
