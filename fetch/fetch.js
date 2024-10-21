// Seleciona o botão e o container onde os usuários serão exibidos
const fetchButton = document.getElementById('fetchButton');
const userList = document.getElementById('userList');

// Função para buscar os usuários da API e exibi-los
async function fetchUsers() {
    try {
        // Fazendo a requisição para a API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Erro ao buscar os usuários');
        
        // Convertendo a resposta para JSON
        const users = await response.json();

        // Limpando a lista anterior (caso já tenha sido carregada)
        userList.innerHTML = '';

        // Iterando sobre os usuários e criando os elementos HTML para exibir as informações
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Website: <a href="https://${user.website}" target="_blank">${user.website}</a></p>
            `;
            userList.appendChild(userCard);
        });
    } catch (error) {
        console.error('Erro:', error);
        userList.innerHTML = '<p>Erro ao carregar os usuários. Tente novamente mais tarde.</p>';
    }
}

// Adicionando o evento de clique no botão para buscar os usuários quando clicado
fetchButton.addEventListener('click', fetchUsers);
