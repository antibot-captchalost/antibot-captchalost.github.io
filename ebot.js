let mouseMovements = [];
let cookies = document.cookie;
let Veredito = false;
let Notirnha = 0; // Variável para a nota

// Função para registrar os movimentos do mouse
function recordMouseMovement(event) {
    const mouseData = {
        x: event.clientX,
        y: event.clientY,
        timestamp: new Date().getTime(),
    };
    mouseMovements.push(mouseData);
}

// Função para analisar os movimentos e calcular a nota
function analyzeMouseMovements() {
    if (mouseMovements.length < 2) return;

    for (let i = 1; i < mouseMovements.length; i++) {
        const prev = mouseMovements[i - 1];
        const current = mouseMovements[i];

        // Calcular a distância entre os pontos
        const dx = Math.abs(current.x - prev.x);
        const dy = Math.abs(current.y - prev.y);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Se os movimentos forem muito próximos, aumentamos a nota
        if (distance < 10) { // Pequeno movimento, similar
            Notirnha += 0.010;
        }

        // Se a distância entre os movimentos for pequena o suficiente, consideramos que há pouca aleatoriedade
        if (Notirnha > 0.8) {
            Veredito = true; // Consideramos um bot
            return;
        }
    }
}

// Função para verificar os cookies e detectar padrões de bot
function checkCookies() {
    const cookies = document.cookie;
    const cookieList = cookies.split(';');

    // Verifica se o cookie 'bot_check' ou algum cookie suspeito está presente
    cookieList.forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim();

        // Verificação para cookies típicos de bots ou ausentes
        if (cookieName === "bot_check" && cookie.includes("true")) {
            Notirnha += 0.01;
        }

        // Verificação de cookies comuns para bots, como __utm* (cookies de rastreamento do Google Analytics)
        if (cookieName.startsWith("__utm") || cookieName.startsWith("_ga")) {
            Notirnha += 0.02;
        }

        // Verifique a presença de cookies com nomes temporários e valores não persistentes
        if (cookieName.length < 5 || !cookie.includes("=")) { // Cookies incompletos ou temporários
            Notirnha += 0.01;
        }
    });

    // Se o comportamento nos cookies for de um bot, marcaremos como bot
    if (cookieList.length < 3) { // Exemplo: menos de 3 cookies é suspeito
        Notirnha += 0.01;
    }
}

// Função para salvar os movimentos do mouse no cookie
function saveMouseMovementsToCookie() {
    // Compactar os movimentos para armazenar de forma eficiente
    const compactedMovements = mouseMovements.map(movement => ({
        x: movement.x,
        y: movement.y,
    }));

    // Salvar os movimentos compactados em um cookie com um tempo de expiração de 30 dias
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // Expira em 30 dias
    document.cookie = `mouseMovements=${JSON.stringify(compactedMovements)};expires=${expirationDate.toUTCString()};path=/`;
}

// Função para verificar se os movimentos anteriores são semelhantes aos atuais
function checkPreviousMovements() {
    const cookies = document.cookie;
    const cookieList = cookies.split(';');
    let previousMovements = null;

    // Procura pelo cookie de movimentos do mouse
    cookieList.forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim();
        if (cookieName === "mouseMovements") {
            previousMovements = JSON.parse(cookie.split('=')[1]);
        }
    });

    if (!previousMovements) return;

    // Verificar se os movimentos atuais são semelhantes aos anteriores
    const distanceThreshold = 17; // Limite para considerar os movimentos semelhantes
    for (let i = 0; i < previousMovements.length && i < mouseMovements.length; i++) {
        const prev = previousMovements[i];
        const current = mouseMovements[i];

        const dx = Math.abs(current.x - prev.x);
        const dy = Math.abs(current.y - prev.y);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > distanceThreshold) {
            return; // Se os movimentos não forem semelhantes o suficiente, sai da função
        }
    }

    // Se todos os movimentos forem semelhantes, trata como padrão repetitivo
    alert("Movimentos muito semelhantes aos anteriores. Pode ser um bot!");
    Veredito = true; // Marcar como bot
}

// Função que será chamada após o checkbox ser marcado
function onCaptchaChecked() {
    analyzeMouseMovements();
    checkCookies();

    // Simplificando a nota para 3 dígitos
    Notirnha = parseFloat(Notirnha.toFixed(3)); // Limita a precisão para 3 casas decimais

    alert(Notirnha); // Exibe a nota simplificada

    // Se a nota for menor que 0.2, o usuário não é considerado um bot
    if (Notirnha < 0.200) {
        Veredito = false;
    } else {
        if (Notirnha >= 0.8) {
            Veredito = true;
        }
    }

    if (Veredito) {
        alert("Falha!");
    } else {
        alert("Você não é um bot!");
    }

    if (Notirnha > 0.2 && Notirnha <= 0.8) {
        alert("Verificação adicional necessária. Realizando o jogo...");
    }

    // Salvar os movimentos do mouse no cookie
    saveMouseMovementsToCookie();
}

// Aguardar o carregamento completo do site
window.addEventListener('load', () => {
    document.addEventListener('mousemove', recordMouseMovement);

    const captchaCheckbox = document.getElementById("captchaCheckbox");
    if (captchaCheckbox) {
        captchaCheckbox.addEventListener('change', function() {
            if (captchaCheckbox.checked) {
                onCaptchaChecked();
                // Verificar os movimentos anteriores ao abrir a página
                checkPreviousMovements();
            }
        });
    }
});
