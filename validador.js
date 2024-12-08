// Importando as funções necessárias do Firebase v9 (modular)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjSpItFSercdX-iab7HecPh69QapynHIE",
    authDomain: "antibot-lost.firebaseapp.com",
    databaseURL: "https://antibot-lost-default-rtdb.firebaseio.com",
    projectId: "antibot-lost",
    storageBucket: "antibot-lost.firebasestorage.app",
    messagingSenderId: "869698677107",
    appId: "1:869698677107:web:a00002c606ecf107af3d06",
    measurementId: "G-FG95Z1HJVS"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para verificar token e URL
function checkTokenAndUrl() {
    // Captura os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');  // Obtém o parâmetro 'token' da URL
    const url = urlParams.get('url');      // Obtém o parâmetro 'url' da URL

    // Se não encontrar token ou URL na URL da página, redireciona
    if (!token || !url) {
        alert("Token e url não encontrado");
        window.location.href = "about:back";
        return;
    }

    // Verifica se o token existe no Firebase Realtime Database
    const tokenRef = ref(database, 'Tokens/' + token);  // Referência no Firebase para o token
    get(tokenRef).then((snapshot) => {
        const tokenData = snapshot.val();  // Obtém os dados do token

        if (tokenData) {
            // Se o token existe, verifica se a URL é a mesma que a da página
            if (tokenData.Url === url) {
                alert("Captcha continua");  // URL e token válidos, continua com o captcha
                document.getElementById("captchaCheckbox").disabled = false; // Ativa o checkbox para interação
            } else {
                alert("URL não corresponde ao token " + url);  // Corrigido para usar '+' ao invés de '&'
                // Se a URL não corresponder, redireciona para "about:back"
                window.location.href = "about:back";
            }
        } else {
            alert("Token não encontrado no Firebase");
            // Se o token não for encontrado no Firebase, redireciona para "about:back"
            window.location.href = "about:back";
        }
    }).catch((error) => {
        alert("Erro ao acessar o Firebase: " + error);
        window.location.href = "about:back"; // Redireciona em caso de erro
    });
}

// Chama a função ao carregar a página
window.addEventListener('load', () => {
    checkTokenAndUrl(); // Verifica o token e a URL ao carregar a página
});
