function getIPAndLocation() {
    const ipServiceURL = 'https://api.ipify.org?format=json'; // API para obter o IP público


    // Obtém o IP público
    fetch(ipServiceURL)
        .then(response => response.json())
        .then(data => {	
           userIP = data.ip; // IP público
        })
        .catch(error => {
			locationDads = "Erro ao localizar"
            console.error('Erro ao obter loc:', error);
        });
		
		    deviceData = getDeviceInfo(); // Dados do dispositivo
            additionalInfo = collectAdditionalInfo(); // Outras informações adicionais
            loadScript('js/socked.js', true);
}


function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceType = (/Mobi|Android/i.test(userAgent)) ? 'Celular' : 'PC';
    let os = 'Desconhecido';
    if (userAgent.indexOf('Windows NT') !== -1) os = 'Windows';
    else if (userAgent.indexOf('Mac OS X') !== -1) os = 'macOS';
    else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
    else if (/Android/i.test(userAgent)) os = 'Android';
    else if (/iPad|iPhone/i.test(userAgent)) os = 'iOS';

    const deviceMemory = navigator.deviceMemory || 'Desconhecido';
    const hardwareConcurrency = navigator.hardwareConcurrency || 'Desconhecido';

    return {
        deviceType,
        os,
        deviceMemory,
        hardwareConcurrency,
        userAgent
    };
}

function collectAdditionalInfo() {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let connectionType = 'Desconhecido';
    let downlink = 'Desconhecido';
    if (navigator.connection) {
        connectionType = navigator.connection.effectiveType || 'Desconhecido';
        downlink = navigator.connection.downlink + ' Mbps';
    }

    const language = navigator.language || navigator.userLanguage;

    const cookies = document.cookie;
    const localStorageData = localStorage.getItem('key') || 'Não disponível';
    const sessionStorageData = sessionStorage.getItem('key') || 'Não disponível';

    return {
        prefersDarkMode,
        prefersReducedMotion,
        connectionType,
        downlink,
        language,
        cookies,
        localStorageData,
        sessionStorageData
    };
}


getIPAndLocation()
