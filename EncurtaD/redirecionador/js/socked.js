// Importando os pacotes do Firebase usando módulos ES6
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config (use sua configuração real aqui)
const firebaseConfig = {
    apiKey: "AIzaSyBlYgSeV3M6FnpRHgXul_NoVm0aixhWdbU",
    authDomain: "encurtaurl-dd563.firebaseapp.com",
    databaseURL: "https://encurtaurl-dd563-default-rtdb.firebaseio.com",
    projectId: "encurtaurl-dd563",
    storageBucket: "encurtaurl-dd563.firebasestorage.app",
    messagingSenderId: "181935819251",
    appId: "1:181935819251:web:3fa63a1be24a956624aa86",
    measurementId: "G-YNNJC8KHE1"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o Realtime Database
const db = getDatabase(app);



// Função para enviar todos os dados coletados para o Firebase Realtime Database
function sendDataToFirebase() {
	alert("enviando dados")
    // Firebase Realtime Database (Assumindo que a configuração do Firebase já foi feita)
    const dbRef = ref(db, 'sockeds/'); // Caminho no Firebase Realtime Database

    // Dados a serem enviados para o Firebase
    const dataToSend = {
        ip: userIP,  // IP do usuário
		location: locationDads,
        device: deviceData,  // Informações sobre o dispositivo
        additionalInfo: additionalInfo,  // Informações adicionais
        timestamp: new Date().toISOString(),  // Timestamp da coleta
        uniqueIdentifier: generateDeviceIdentifier(deviceData),  // Identificador único para o dispositivo
    };

    // Enviar os dados para o Firebase Realtime Database
    const newDataRef = push(dbRef); // Cria uma nova referência para armazenar os dados

    // Salvar os dados no Firebase
    set(newDataRef, dataToSend)
        .then(() => {
            console.log('Redirecionamento Aceito com Sucesso');
			loadScript('js/redirecSystem.js', false)
        })
        .catch((error) => {
            console.error('Erro por Redirecionar:', error);
			loadScript('js/redirecSystem.js', false)
			
        });
}

// Função para gerar um identificador único para o dispositivo, baseado nas informações coletadas
function generateDeviceIdentifier(deviceData) {
    const { userAgent, deviceMemory, hardwareConcurrency } = deviceData;
    const dataString = `${userAgent}-${deviceMemory}-${hardwareConcurrency}`;

    // Gerar um hash simples (você pode usar SHA-256 ou outros métodos para maior segurança)
    return btoa(dataString);  // Usamos base64 encoding para gerar um identificador único
}




sendDataToFirebase();
