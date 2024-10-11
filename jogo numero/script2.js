let randomNumber;
let attempts = 0;
const maxAttempts = 15; // Limite de tentativas

function startGame() {
    randomNumber = Math.floor(Math.random() * 101);
    attempts = 0;
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "Tentativas: 0";
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("guessButton").style.display = "inline"; // Mostrar o botão de adivinhação
}

document.getElementById("guessButton").addEventListener("click", () => {
    const guessInput = document.getElementById("guessInput");
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 0 || guess > 100) {
        document.getElementById("message").textContent = "Por favor, insira um número válido entre 0 e 100.";
        return;
    }

    attempts++;
    document.getElementById("attempts").textContent = "Tentativas: " + attempts;

    const difference = Math.abs(randomNumber - guess);
    let message = "";

    if (difference === 0) {
        message = "Parabéns! Você acertou o número!";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("guessButton").style.display = "none"; // Ocultar o botão de adivinhação
    } else if (attempts >= maxAttempts) {
        message = "Você excedeu o número máximo de tentativas! O número era " + randomNumber + ".";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("guessButton").style.display = "none"; // Ocultar o botão de adivinhação
    } else if (difference <= 5) {
        message = "Pertíssimo!";
    } else if (difference <= 10) {
        message = "Perto!";
    } else if (difference <= 20) {
        message = "Longe!";
    } else if (difference <= 30) {
        message = "Muito longe!";
    } else {
        message = "Longíssimo!";
    }

    document.getElementById("message").textContent = message;
});

// Reiniciar o jogo
document.getElementById("restartButton").addEventListener("click", startGame);

// Iniciar o jogo ao carregar a página
startGame();
