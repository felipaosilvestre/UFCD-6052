const wires = document.querySelectorAll('.wire');
const sockets = document.querySelectorAll('.power-socket');
const lamp = document.getElementById('lamp');
const resetButton = document.getElementById('reset-button');
const explosionSound = document.getElementById('explosion-sound');
const successSound = document.getElementById('success-sound');
const openingSound = document.getElementById('opening-sound'); // Adicionado
const failureGif = document.getElementById('failure-gif'); // Adicionado
const failure3Gif = document.getElementById('failure3-gif');
const failure2Gif = document.getElementById('failure2-gif');
const success2Gif = document.getElementById('success2-gif');
const success3Gif = document.getElementById('success3-gif');
const success4Gif = document.getElementById('success4-gif');
const successGif = document.getElementById('success-gif');
const failure4Gif = document.getElementById('failure4-gif');
const success5Gif = document.getElementById('success5-gif');



// Configuração correta para os fios
const correctConfiguration = {
    neutro: 'wire-blue',
    fase: 'wire-brown',
    terra: 'wire-green'
};

// Salva a posição inicial dos fios e os textos originais dos sockets
const initialPositions = {
    'wire-blue': document.getElementById('wire-blue').parentElement,
    'wire-brown': document.getElementById('wire-brown').parentElement,
    'wire-green': document.getElementById('wire-green').parentElement,
};

const originalTexts = {
    'socket1': document.getElementById('socket1').textContent,
    'socket2': document.getElementById('socket2').textContent,
    'socket3': document.getElementById('socket3').textContent,
};

wires.forEach(wire => {
    wire.addEventListener('dragstart', dragStart);
});

sockets.forEach(socket => {
    socket.addEventListener('dragover', dragOver);
    socket.addEventListener('drop', drop);
});

resetButton.addEventListener('click', resetGame);

// Toca a música de abertura quando a página é carregada
window.addEventListener('load', () => {
    openingSound.play();
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const wireId = e.dataTransfer.getData('text/plain');
    const wire = document.getElementById(wireId);

    // Esconde o texto do socket e coloca o fio
    e.target.textContent = ''; // Remove o texto do socket
    e.target.appendChild(wire); // Adiciona o fio ao socket

    // Verifica se todos os fios foram colocados corretamente
    checkWires();
}

function checkWires() {
    const socket1 = document.getElementById('socket1').children[0]?.id;
    const socket2 = document.getElementById('socket2').children[0]?.id;
    const socket3 = document.getElementById('socket3').children[0]?.id;

    const isCorrect =
        socket1 === correctConfiguration.neutro &&
        socket2 === correctConfiguration.fase &&
        socket3 === correctConfiguration.terra;

        const message = document.getElementById('message'); // Pega o elemento da mensagem

    if (isCorrect) {
        lamp.classList.remove('exploded');
        lamp.classList.add('active');
        stopAllSounds();
        successSound.play(); // Toca a música de sucesso
        failureGif.style.display = 'none'; // Esconde o GIF de falha se estiver visível
        failure3Gif.style.display = 'none';
        failure2Gif.style.display = 'none';
        failure4Gif.style.display = 'none';
        success2Gif.style.display = 'block';
        success3Gif.style.display = 'block';
        success4Gif.style.display = 'block';
        successGif.style.display = 'block';
        success5Gif.style.display = 'block';
        message.textContent = "Parabéns!!"; // Mostra a mensagem de sucesso
        
    } else if (socket1 && socket2 && socket3) {
        lamp.classList.remove('active');
        lamp.classList.add('exploded');
        stopAllSounds();
        explosionSound.play(); // Toca o som de explosão
        failureGif.style.display = 'block'; // Mostra o GIF de falha
        failure3Gif.style.display = 'block';
        failure4Gif.style.display = 'block';
        failure2Gif.style.display = 'block';
        success2Gif.style.display = 'none';
        success3Gif.style.display = 'none';
        success4Gif.style.display = 'none';
        successGif.style.display = 'none';
        success5Gif.style.display = 'none';
        message.textContent = "Game Over"; // Mostra a mensagem de erro
        
    } else {
        lamp.classList.remove('active', 'exploded');
        message.textContent = ""; 
    }
}

function resetGame() {
    // Remove todos os fios das tomadas e reseta o texto
    sockets.forEach(socket => {
        if (socket.children.length > 0) {
            const wire = socket.children[0];
            const initialParent = initialPositions[wire.id];
            initialParent.appendChild(wire);
        }
        // Restaura o nome original do espaço
        socket.textContent = originalTexts[socket.id];
    });

    // Reseta o estado da lâmpada
    lamp.classList.remove('active', 'exploded');
    document.getElementById('message').textContent = "";

    failure2Gif.style.display = 'none';
    failure3Gif.style.display = 'none';
    failure4Gif.style.display = 'none';
    successGif.style.display = 'none';
    success2Gif.style.display = 'none';
    failureGif.style.display = 'none';
    success3Gif.style.display = 'none';
    success4Gif.style.display = 'none';
    success5Gif.style.display = 'none';

    // Esconde o GIF de falha quando o jogo é reiniciado
    // Para todos os áudios e toca a música de abertura novamente
    stopAllSounds();
    openingSound.play();
}

function stopAllSounds() {
    // Pausa e reseta todos os sons
    explosionSound.pause();
    explosionSound.currentTime = 0;
    successSound.pause();
    successSound.currentTime = 0;
    openingSound.pause();
    openingSound.currentTime = 0;
}
