// Criando o array de idades
let idades = [
    21, 33, 52, 37, 44, 49, 31, 40, 21, 33, 19, 38,
];

// Criando o array de nomes correspondente
let nomes = [
    "Tiago", "Malenga", "Sr.Lemos", "Vitor", "Hugo", "Zé", 
    "Diogo", "Giovanni", "André", "Gonçalo", "Felipe", "Fumadora"
];

// Seleciona o contêiner onde os itens serão exibidos
let container = document.getElementById('container');
let mediaContainer = document.getElementById('media-container'); // Contêiner da média

// Limpa o conteúdo do contêiner antes de adicionar novos itens
container.innerHTML = '';

// Iterando pelo array de idades e nomes
idades.forEach(function(idade, index) {
    let item = document.createElement('div');
    item.className = 'item';
    item.textContent = `${idade} - ${nomes[index]}`; // Mostra cada idade e nome no mesmo quadrado
    container.appendChild(item);
});

// Função para calcular a média
function calcularMedia(array) {
    let soma = array.reduce((acc, curr) => acc + curr, 0); // Soma todos os valores
    return soma / array.length; // Retorna a média
}

// Calculando a média e exibindo
let media = calcularMedia(idades);
mediaContainer.textContent = `Média = ${media.toFixed(2)}`; // Mostra a média com duas casas decimais
