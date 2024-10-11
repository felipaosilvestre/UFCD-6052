const palavras = [
    "javascript", "html", "css", "programacao", "desenvolvimento",
    "leão", "tigre", "elefante", "gato", "cachorro", "girafa", "zebra", "urso", "lobo", "cavalo",
    "brasil", "canada", "franca", "italia", "japao", "mexico", "australia", "india", "alemanha", "portugal"
];

let palavraSelecionada = "";
let letrasCorretas = [];
let tentativasRestantes = 6;

function iniciarJogo() {
    palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
    letrasCorretas = Array(palavraSelecionada.length).fill("_");
    tentativasRestantes = 6;
    document.getElementById("wordContainer").textContent = letrasCorretas.join(" ");
    document.getElementById("message").textContent = "";
    mostrarBoneco();
    gerarTeclado();
}

function mostrarBoneco() {
    const partes = [document.getElementById("head"), document.getElementById("body"), document.getElementById("leftArm"), document.getElementById("rightArm"), document.getElementById("leftLeg"), document.getElementById("rightLeg")];
    partes.forEach((parte) => {
        parte.classList.add("invisible");
    });
}

function gerarTeclado() {
    const teclado = document.getElementById("keyboard");
    teclado.innerHTML = "";

    const alfabeto = "abcdefghijklmnopqrstuvwxyz";
    alfabeto.split("").forEach(letra => {
        const botao = document.createElement("button");
        botao.textContent = letra;
        botao.onclick = () => verificarLetra(letra, botao); // Passar o botão para desabilitar
        teclado.appendChild(botao);
    });
}

function verificarLetra(letra, botao) {
    if (palavraSelecionada.includes(letra)) {
        palavraSelecionada.split("").forEach((l, index) => {
            if (l === letra) {
                letrasCorretas[index] = letra;
            }
        });
    } else {
        tentativasRestantes--;
    }

    botao.disabled = true; // Desabilitar o botão após clicar

    document.getElementById("wordContainer").textContent = letrasCorretas.join(" ");
    verificarFimDeJogo();
}

function verificarFimDeJogo() {
    if (letrasCorretas.join("") === palavraSelecionada) {
        document.getElementById("message").textContent = "Você venceu!";
        desativarTeclado();
    } else if (tentativasRestantes === 0) {
        document.getElementById("message").textContent = "Você perdeu! A palavra era: " + palavraSelecionada;
        desativarTeclado();
    }

    // Atualiza a parte do boneco de acordo com as tentativas restantes
    mostrarBoneco();
    if (tentativasRestantes < 6) document.getElementById("head").classList.remove("invisible");
    if (tentativasRestantes < 5) document.getElementById("body").classList.remove("invisible");
    if (tentativasRestantes < 4) document.getElementById("leftArm").classList.remove("invisible");
    if (tentativasRestantes < 3) document.getElementById("rightArm").classList.remove("invisible");
    if (tentativasRestantes < 2) document.getElementById("leftLeg").classList.remove("invisible");
    if (tentativasRestantes < 1) document.getElementById("rightLeg").classList.remove("invisible");
}

function desativarTeclado() {
    const botoes = document.querySelectorAll("#keyboard button");
    botoes.forEach(botao => {
        botao.disabled = true;
    });
}

iniciarJogo(); // Inicia o jogo ao carregar a página
