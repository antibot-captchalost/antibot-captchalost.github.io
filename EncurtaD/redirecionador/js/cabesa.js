function loadScript(url, isModule) {
    const script = document.createElement('script'); 
    script.src = url;  

    // Verifica se o parâmetro 'isModule' é verdadeiro
    if (isModule === true) {
        script.type = 'module';  // Define o tipo como 'module'
        
    } else {
        script.type = 'text/javascript';  // Se não for módulo, usa o tipo 'text/javascript'
    }

    script.async = true;  // Carrega o script de forma assíncrona
    
    document.body.appendChild(script);  // Adiciona o script ao body da página
}


loadScript('js/colect.js', false);


