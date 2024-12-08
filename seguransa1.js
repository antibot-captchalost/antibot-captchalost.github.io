// Bloquear o botão direito do mouse
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    alert("Botão direito desativado!");
});

// Bloquear teclas específicas (F12, CTRL + I, CTRL + S, CTRL + U)
document.addEventListener("keydown", (e) => {
    // Combinações de teclas bloqueadas
    if (
        e.key === "F12" || // F12
        (e.ctrlKey && e.key.toLowerCase() === "i") || // CTRL + I
        (e.ctrlKey && e.key.toLowerCase() === "s") || // CTRL + S
        (e.ctrlKey && e.key.toLowerCase() === "u")    // CTRL + U
    ) {
        e.preventDefault();
        alert("Esta ação foi bloqueada!");
    }
});

// Verificar se o Console do Desenvolvedor está aberto
// Detecção do Console do Desenvolvedor
(function detectDevTools() {
    let devtoolsOpen = false;

    function isDevToolsOpen() {
        // Usar um truque de console.log para verificar
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function () {
                devtoolsOpen = true; // Se for inspecionado, o console está aberto
                pausePage();
            }
        });
        console.log(element); // Força o acesso à propriedade 'id'
    }

    function monitorPerformance() {
        const start = performance.now();

        debugger; // Esta linha pode ser pausada se o console estiver ativo
        const end = performance.now();

        if (end - start > 100) {
            devtoolsOpen = true;
            pausePage();
        }
    }

    // Pausar a página se o console estiver aberto
    function pausePage() {
        if (devtoolsOpen) {
            document.body.innerHTML = `<div style="color: red; font-size: 24px; text-align: center; margin-top: 20%; font-family: Arial;">
                <p>*******************************</p>
				<p><strong>Ação broqueada</strong></p>
                <p>*******************************</p>
            </div>`;
        }
    }

    // Verificar continuamente
    setInterval(() => {
        devtoolsOpen = false; // Resetar o status a cada ciclo
        isDevToolsOpen();
        monitorPerformance();
    }, 1000);
})();

