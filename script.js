/* ========================================================================
   SCRIPT.JS v5 - VERSÃO ULTRA-REVISADA E CORRIGIDA
   - Corrige SyntaxError da v4
   - Usa a API de Clipboard (navigator.clipboard) moderna
   ======================================================================== */

const originalTabulationTemplate = `Contato Via: [Origem Contato]
[Dynamic Intro Sentence]

Problema Relatado: [Problema Relatado]
Solicitação do Cliente: [Solicitação Cliente]

Testes Realizados:
- Verificação de LEDs: [Status LEDs]
- Reforço de Sinal (Power Cycle): [Power Cycle]
- Verificação de Cabos: [Cabos]
- Teste de Velocidade: [Teste Velocidade]

Diagnóstico:
- [Diagnóstico]

Solução Aplicada / Encaminhamento:
- [Solução]

Resultado:
- [Resultado]
`;

const massivoTabulationTemplate = `Contato Via: [Origem Contato]
[Dynamic Intro Sentence]

Problema Relatado: Instabilidade Massiva na região

Diagnóstico:
- Cliente afetado por instabilidade massiva.

Solução Aplicada / Encaminhamento:
- Cliente orientado sobre a instabilidade e prazo de normalização.

Resultado:
- [Resultado]`;

const solicitacaoTabulationTemplate = `Contato Via: [Origem Contato]
[Dynamic Intro Sentence]

Solicitação do Cliente: [Solicitação Cliente]

Solução Aplicada / Encaminhamento:
- [Solução]

Resultado:
- [Resultado]`;

const technicalProblemTabulationTemplate = `Contato Via: [Origem Contato]
[Dynamic Intro Sentence]

Problema Relatado: [Problema Relatado]

Testes Realizados:
- Verificação de LEDs: [Status LEDs]
- Reforço de Sinal (Power Cycle): [Power Cycle]
- Verificação de Cabos: [Cabos]
- Teste de Velocidade: [Teste Velocidade]

Diagnóstico:
- [Diagnóstico]

Solução Aplicada / Encaminhamento:
- [Solução]

Resultado:
- [Resultado]
`;

// Mapeamentos de Cidade -> Regional e Subterritório
const cityToRegionalMap = {
    "aguaí": "Regional Central", "americana": "Regional Central", "araras": "Regional Central", "artur nogueira": "Regional Central", "casa branca": "Regional Central", "conchal": "Regional Central", "cordeirópolis": "Regional Central", "cosmópolis": "Regional Central", "engenheiro coelho": "Regional Central", "estiva gerbi": "Regional Central", "iracemápolis": "Regional Central", "leme": "Regional Central", "limeira": "Regional Central", "mogi guaçu": "Regional Central", "mogi mirim": "Regional Central", "nova odessa": "Regional Central", "paulínia": "Regional Central", "piracicaba": "Regional Central", "pirassununga": "Regional Central", "porto ferreira": "Regional Central", "rio claro": "Regional Central", "santa bárbara d'oeste": "Regional Central", "santa barbara doeste": "Regional Central", "santa barbara": "Regional Central", "santa cruz das palmeiras": "Regional Central", "santa gertrudes": "Regional Central", "santa rita do passa quatro": "Regional Central", "sumaré": "Regional Central", "alumínio": "Regional Central", "angatuba": "Regional Central", "araçoiaba da serra": "Regional Central", "bofete": "Regional Central", "boituva": "Regional Central", "campina do monte alegre": "Regional Central", "capela do alto": "Regional Central", "capivari": "Regional Central", "cerquilho": "Regional Central", "cesário lange": "Regional Central", "conchas": "Regional Central", "iperó": "Regional Central", "itapetininga": "Regional Central", "itu": "Regional Central", "jumirim": "Regional Central", "laranjal paulista": "Regional Central", "monte mor": "Regional Central", "pereiras": "Regional Central", "pilar do sul": "Regional Central", "porangaba": "Regional Central", "quadra": "Regional Central", "rafard": "Regional Central", "rio das pedras": "Regional Central", "saltinho": "Regional Central", "salto": "Regional Central", "salto de pirapora": "Regional Central", "sarapuí": "Regional Central", "sorocaba": "Regional Central", "tatuí": "Regional Central", "tietê": "Regional Central", "votorantim": "Regional Central", "amparo": "Regional Central", "campinas": "Regional Central", "holambra": "Regional Central", "hortolândia": "Regional Central", "jaguariúna": "Regional Central", "lindoia": "Regional Central", "monte alegre do sul": "Regional Central", "pedreira": "Regional Central", "santo antônio de posse": "Regional Central", "santo antonio de posse": "Regional Central", "serra negra": "Regional Central",
    "américo brasiliense": "Regional Centro Oeste", "americo brasiliense": "Regional Centro Oeste", "araraquara": "Regional Centro Oeste", "boa esperança do sul": "Regional Centro Oeste", "bocaina": "Regional Centro Oeste", "borborema": "Regional Centro Oeste", "cravinhos": "Regional Centro Oeste", "descalvado": "Regional Centro Oeste", "dobrada": "Regional Centro Oeste", "dourado": "Regional Centro Oeste", "gavião peixoto": "Regional Centro Oeste", "guariba": "Regional Centro Oeste", "guatapará": "Regional Centro Oeste", "ibaté": "Regional Centro Oeste", "ibitinga": "Regional Centro Oeste", "itaju": "Regional Centro Oeste", "itápolis": "Regional Centro Oeste", "matão": "Regional Centro Oeste", "motuca": "Regional Centro Oeste", "nova europa": "Regional Centro Oeste", "ribeirão bonito": "Regional Centro Oeste", "ribeirão preto": "Regional Centro Oeste", "ribeirao preto": "Regional Centro Oeste", "rincão": "Regional Centro Oeste", "santa ernestina": "Regional Centro Oeste", "santa lúcia": "Regional Centro Oeste", "são carlos": "Regional Centro Oeste", "sao carlos": "Regional Centro Oeste", "tabatinga": "Regional Centro Oeste", "trabiju": "Regional Centro Oeste", "bady bassitt": "Regional Centro Oeste", "barretos": "Regional Centro Oeste", "bebedouro": "Regional Centro Oeste", "cândido rodrigues": "Regional Centro Oeste", "colina": "Regional Centro Oeste", "cristais paulista": "Regional Centro Oeste", "fernando prestes": "Regional Centro Oeste", "franca": "Regional Centro Oeste", "guaíra": "Regional Centro Oeste", "itajobi": "Regional Centro Oeste", "itirapuã": "Regional Centro Oeste", "jaborandi": "Regional Centro Oeste", "jaboticabal": "Regional Centro Oeste", "mirassol": "Regional Centro Oeste", "monte alto": "Regional Centro Oeste", "olímpia": "Regional Centro Oeste", "patrocínio paulista": "Regional Centro Oeste", "pindorama": "Regional Centro Oeste", "pitangueiras": "Regional Centro Oeste", "ribeirão corrente": "Regional Centro Oeste", "santa adélia": "Regional Centro Oeste", "são josé do rio preto": "Regional Centro Oeste", "sao jose do rio preto": "Regional Centro Oeste", "águas de santa bárbara": "Regional Centro Oeste", "agudos": "Regional Centro Oeste", "arandu": "Regional Centro Oeste", "arealva": "Regional Centro Oeste", "areiópolis": "Regional Centro Oeste", "avaré": "Regional Centro Oeste", "bariri": "Regional Centro Oeste", "barra bonita": "Regional Centro Oeste", "bauru": "Regional Centro Oeste", "borebi": "Regional Centro Oeste", "botucatu": "Regional Centro Oeste", "cerqueira césar": "Regional Centro Oeste", "dois córregos": "Regional Centro Oeste", "iaras": "Regional Centro Oeste", "igaraçu do tietê": "Regional Centro Oeste", "itaí": "Regional Centro Oeste", "itapuí": "Regional Centro Oeste", "itatinga": "Regional Centro Oeste", "jaú": "Regional Centro Oeste", "jau": "Regional Centro Oeste", "lençóis paulista": "Regional Centro Oeste", "lencois paulista": "Regional Centro Oeste", "lins": "Regional Centro Oeste", "macatuba": "Regional Centro Oeste", "manduri": "Regional Centro Oeste", "mineiros do tietê": "Regional Centro Oeste", "novo horizonte": "Regional Centro Oeste", "óleo": "Regional Centro Oeste", "paranapanema": "Regional Centro Oeste", "pardinho": "Regional Centro Oeste", "pederneiras": "Regional Centro Oeste", "piratininga": "Regional Centro Oeste", "pratânia": "Regional Centro Oeste", "são manuel": "Regional Centro Oeste",
    "araçariguama": "Regional Sudeste", "atibaia": "Regional Sudeste", "bom jesus dos perdões": "Regional Sudeste", "bom jesus": "Regional Sudeste", "bragança paulista": "Regional Sudeste", "cabreúva": "Regional Sudeste", "caieiras": "Regional Sudeste", "campo limpo paulista": "Regional Sudeste", "francisco morato": "Regional Sudeste", "franco da rocha": "Regional Sudeste", "indaiatuba": "Regional Sudeste", "itupeva": "Regional Sudeste", "jarinu": "Regional Sudeste", "jundiaí": "Regional Sudeste", "louveira": "Regional Sudeste", "mairiporã": "Regional Sudeste", "nazaré paulista": "Regional Sudeste", "piracaia": "Regional Sudeste", "valinhos": "Regional Sudeste", "várzea paulista": "Regional Sudeste", "vinhedo": "Regional Sudeste", "cubatão": "Regional Sudeste", "guarujá": "Regional Sudeste", "itanhaém": "Regional Sudeste", "mongaguá": "Regional Sudeste", "peruíbe": "Regional Sudeste", "praia grande": "Regional Sudeste", "santos": "Regional Sudeste", "são bernardo do campo": "Regional Sudeste", "sao bernardo": "Regional Sudeste", "são vicente": "Regional Sudeste", "biritiba-mirim": "Regional Sudeste", "caçapava": "Regional Sudeste", "guararema": "Regional Sudeste", "igaratá": "Regional Sudeste", "jacareí": "Regional Sudeste", "mogi das cruzes": "Regional Sudeste", "salesópolis": "Regional Sudeste", "santa branca": "Regional Sudeste", "são josé dos campos": "Regional Sudeste", "sao jose dos campos": "SÃO JOSÉ DOS CAMPOS", "são paulo": "Regional Sudeste", "taubaté": "Regional Sudeste", "tremembé": "Regional Sudeste"
};

const cityToSubterritorioMap = {
    "aguaí": "SUMARÉ", "americana": "SUMARÉ", "araras": "SUMARÉ", "artur nogueira": "SUMARÉ", "casa branca": "SUMARÉ", "conchal": "SUMARÉ", "cordeirópolis": "SUMARÉ", "cosmópolis": "SUMARÉ", "engenheiro coelho": "SUMARÉ", "estiva gerbi": "SUMARÉ", "iracemápolis": "SUMARÉ", "leme": "SUMARÉ", "limeira": "SUMARÉ", "mogi guaçu": "SUMARÉ", "mogi mirim": "SUMARÉ", "nova odessa": "SUMARÉ", "paulínia": "SUMARÉ", "piracicaba": "SUMARÉ", "pirassununga": "SUMARÉ", "porto ferreira": "SUMARÉ", "rio claro": "SUMARÉ", "santa bárbara d'oeste": "SUMARÉ", "santa barbara doeste": "SUMARÉ", "santa barbara": "SUMARÉ", "santa cruz das palmeiras": "SUMARÉ", "santa gertrudes": "SUMARÉ", "santa rita do passa quatro": "SUMARÉ", "sumaré": "SUMARÉ",
    "alumínio": "SOROCABA", "angatuba": "SOROCABA", "araçoiaba da serra": "SOROCABA", "bofete": "SOROCABA", "boituva": "SOROCABA", "campina do monte alegre": "SOROCABA", "capela do alto": "SOROCABA", "capivari": "SOROCABA", "cerquilho": "SOROCABA", "cesário lange": "SOROCABA", "conchas": "SOROCABA", "iperó": "SOROCABA", "itapetininga": "SOROCABA", "itu": "SOROCABA", "jumirim": "SOROCABA", "laranjal paulista": "SOROCABA", "monte mor": "SOROCABA", "pereiras": "SOROCABA", "pilar do sul": "SOROCABA", "porangaba": "SOROCABA", "quadra": "SOROCABA", "rafard": "SOROCABA", "rio das pedras": "SOROCABA", "saltinho": "SOROCABA", "salto": "SOROCABA", "salto de pirapora": "SOROCABA", "sarapuí": "SOROCABA", "sorocaba": "SOROCABA", "tatuí": "SOROCABA", "tietê": "SOROCABA", "votorantim": "SOROCABA",
    "amparo": "CAMPINAS", "campinas": "CAMPINAS", "holambra": "CAMPINAS", "hortolândia": "CAMPINAS", "jaguariúna": "CAMPINAS", "lindoia": "CAMPINAS", "monte alegre do sul": "CAMPINAS", "pedreira": "CAMPINAS", "santo antônio de posse": "CAMPINAS", "santo antonio de posse": "CAMPINAS", "serra negra": "CAMPINAS",
    "américo brasiliense": "ARARAQUARA", "americo brasiliense": "ARARAQUARA", "araraquara": "ARARAQUARA", "boa esperança do sul": "ARARAQUARA", "bocaina": "ARARAQUARA", "borborema": "ARARAQUARA", "cravinhos": "ARARAQUARA", "descalvado": "ARARAQUARA", "dobrada": "ARARAQUARA", "dourado": "ARARAQUARA", "gavião peixoto": "ARARAQUARA", "guariba": "ARARAQUARA", "guatapará": "ARARAQUARA", "ibaté": "ARARAQUARA", "ibitinga": "ARARAQUARA", "itaju": "ARARAQUARA", "itápolis": "ARARAQUARA", "matão": "ARARAQUARA", "motuca": "ARARAQUARA", "nova europa": "ARARAQUARA", "ribeirão bonito": "ARARAQUARA", "ribeirão preto": "ARARAQUARA", "ribeirao preto": "ARARAQUARA", "rincão": "ARARAQUARA", "santa ernestina": "ARARAQUARA", "santa lúcia": "ARARAQUARA", "são carlos": "ARARAQUARA", "sao carlos": "ARARAQUARA", "tabatinga": "ARARAQUARA", "trabiju": "ARARAQUARA",
    "bady bassitt": "BARRETOS", "barretos": "BARRETOS", "bebedouro": "BARRETOS", "cândido rodrigues": "BARRETOS", "colina": "BARRETOS", "cristais paulista": "BARRETOS", "fernando prestes": "BARRETOS", "franca": "BARRETOS", "guaíra": "BARRETOS", "itajobi": "BARRETOS", "itirapuã": "BARRETOS", "jaborandi": "BARRETOS", "jaboticabal": "BARRETOS", "mirassol": "BARRETOS", "monte alto": "BARRETOS", "olímpia": "BARRETOS", "patrocínio paulista": "BARRETOS", "pindorama": "BARRETOS", "pitangueiras": "BARRETOS", "ribeirão corrente": "BARRETOS", "santa adélia": "BARRETOS", "são josé do rio preto": "BARRETOS", "sao jose do rio preto": "BARRETOS",
    "águas de santa bárbara": "LENÇÓIS PAULISTA", "agudos": "LENÇÓIS PAULISTA", "arandu": "LENÇÓIS PAULISTA", "arealva": "LENÇÓIS PAULISTA", "areiópolis": "LENÇÓIS PAULISTA", "avaré": "LENÇÓIS PAULISTA", "bariri": "LENÇÓIS PAULISTA", "barra bonita": "LENÇÓIS PAULISTA", "bauru": "LENÇÓIS PAULISTA", "borebi": "LENÇÓIS PAULISTA", "botucatu": "LENÇÓIS PAULISTA", "cerqueira césar": "LENÇÓIS PAULISTA", "dois córregos": "LENÇÓIS PAULISTA", "iaras": "LENÇÓIS PAULISTA", "igaraçu do tietê": "LENÇÓIS PAULISTA", "itaí": "LENÇÓIS PAULISTA", "itapuí": "LENÇÓIS PAULISTA", "itatinga": "LENÇÓIS PAULISTA", "jaú": "LENÇÓIS PAULISTA", "jau": "LENÇÓIS PAULISTA", "lençóis paulista": "LENÇÓIS PAULISTA", "lencois paulista": "LENÇÓIS PAULISTA", "lins": "LENÇÓIS PAULISTA", "macatuba": "LENÇÓIS PAULISTA", "manduri": "LENÇÓIS PAULISTA", "mineiros do tietê": "LENÇÓIS PAULISTA", "novo horizonte": "LENÇÓIS PAULISTA", "óleo": "LENÇÓIS PAULISTA", "paranapanema": "LENÇÓIS PAULISTA", "pardinho": "LENÇÓIS PAULISTA", "pederneiras": "LENÇÓIS PAULISTA", "piratininga": "LENÇÓIS PAULISTA", "pratânia": "LENÇÓIS PAULISTA", "são manuel": "LENÇÓIS PAULISTA",
    "araçariguama": "JUNDIAÍ", "atibaia": "JUNDIAÍ", "bom jesus dos perdões": "JUNDIAÍ", "bom jesus": "JUNDIAÍ", "bragança paulista": "JUNDIAÍ", "cabreúva": "JUNDIAÍ", "caieiras": "JUNDIAÍ", "campo limpo paulista": "JUNDIAÍ", "francisco morato": "JUNDIAÍ", "franco da rocha": "JUNDIAÍ", "indaiatuba": "JUNDIAÍ", "itupeva": "JUNDIAÍ", "jarinu": "JUNDIAÍ", "jundiaí": "JUNDIAÍ", "louveira": "JUNDIAÍ", "mairiporã": "JUNDIAÍ", "nazaré paulista": "JUNDIAÍ", "piracaia": "JUNDIAÍ", "valinhos": "JUNDIAÍ", "várzea paulista": "JUNDIAÍ", "vinhedo": "JUNDIAÍ",
    "cubatão": "PRAIA GRANDE", "guarujá": "PRAIA GRANDE", "itanhaém": "PRAIA GRANDE", "mongaguá": "PRAIA GRANDE", "peruíbe": "PRAIA GRANDE", "praia grande": "PRAIA GRANDE", "santos": "PRAIA GRANDE", "são bernardo do campo": "PRAIA GRANDE", "sao bernardo": "PRAIA GRANDE", "são vicente": "PRAIA GRANDE",
    "biritiba-mirim": "SÃO JOSÉ DOS CAMPOS", "caçapava": "SÃO JOSÉ DOS CAMPOS", "guararema": "SÃO JOSÉ DOS CAMPOS", "igaratá": "SÃO JOSÉ DOS CAMPOS", "jacareí": "SÃO JOSÉ DOS CAMPOS", "mogi das cruzes": "SÃO JOSÉ DOS CAMPOS", "salesópolis": "SÃO JOSÉ DOS CAMPOS", "santa branca": "SÃO JOSÉ DOS CAMPOS", "são josé dos campos": "SÃO JOSÉ DOS CAMPOS", "sao jose dos campos": "SÃO JOSÉ DOS CAMPOS", "são paulo": "SÃO JOSÉ DOS CAMPOS", "taubaté": "SÃO JOSÉ DOS CAMPOS", "tremembé": "SÃO JOSÉ DOS CAMPOS"
};

const subterritorioHorarios = {
    "ARARAQUARA": "Seg-Sex: 08:30 às 17:30 / Sáb-Dom: 08:00 às 16:20",
    "BARRETOS": "Seg-Sex: 08:30 às 17:30 / Sáb-Dom: 08:00 às 16:20",
    "LENÇÓIS PAULISTA": "Seg-Sex: 08:30 às 17:30 / Sáb-Dom: 08:00 às 12:00",
    "PRAIA GRANDE": "Seg-Sex: 08:00 às 21:00 / Sáb-Dom: 09:00 às 17:20",
    "JUNDIAÍ": "Seg-Sex: 08:00 às 21:00 / Sáb-Dom: 09:00 às 17:20",
    "SÃO JOSÉ DOS CAMPOS": "Seg-Sex: 08:00 às 20:00 / Sáb-Dom: 09:00 às 17:20",
    "SUMARÉ": "Seg-Sex: 07:00 às 22:00 / Sáb-Dom: 07:00 às 18:00",
    "SOROCABA": "Seg-Sex: 07:00 às 22:00 / Sáb-Dom: 07:00 às 18:00",
    "CAMPINAS": "Seg-Sex: 07:00 às 22:00 / Sáb-Dom: 07:00 às 18:00",
};


// Evento que roda quando o HTML termina de carregar
document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    // Configura valores padrão e mínimos para campos de data
    const dateInput = document.getElementById('visitDate');
    const offerDateInput = document.getElementById('offerDate');
    const encaixeDataInput = document.getElementById('encaixeData');

    if (dateInput) {
        dateInput.value = todayString;
        dateInput.min = todayString;
    }
    if (encaixeDataInput) {
        encaixeDataInput.value = todayString;
        encaixeDataInput.min = todayString;
    }
    if (offerDateInput) {
        let nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        const nextYear = nextDay.getFullYear();
        const nextMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
        const nextDate = String(nextDay.getDate()).padStart(2, '0');
        offerDateInput.value = `${nextYear}-${nextMonth}-${nextDate}`;
        offerDateInput.min = todayString;
    }

    // Adiciona listeners para atualizar dinamicamente
    const newDueDateInput = document.getElementById('newDueDate');
    const customerNameInput = document.getElementById('customerName');
    const encaixeEnderecoInput = document.getElementById('encaixeEndereco');
    const encaixeProtocoloInput = document.getElementById('encaixeProtocolo');
    const protocoloInput = document.getElementById('protocoloInput');
    const protocoloInicialInput = document.getElementById('protocoloBoasVindasInput');

    if (newDueDateInput) {
        newDueDateInput.addEventListener('change', updateAllTabulationLogic);
    }
    if (customerNameInput) {
        customerNameInput.addEventListener('input', updateAllTabulationLogic);
    }
    if (offerDateInput && dateInput) {
        offerDateInput.addEventListener('change', () => {
            dateInput.value = offerDateInput.value;
        });
    }
    if (encaixeEnderecoInput) {
        encaixeEnderecoInput.addEventListener('input', autoFillLocationDetails);
    }
    if (encaixeProtocoloInput && protocoloInput && protocoloInicialInput) {
        const syncHandler = (e) => syncProtocolos(e.target.value);
        encaixeProtocoloInput.addEventListener('input', syncHandler);
        protocoloInput.addEventListener('input', syncHandler);
        protocoloInicialInput.addEventListener('input', syncHandler);
    }
});

// Sincroniza os campos de protocolo
function syncProtocolos(protocolo) {
    const encaixeProtocoloInput = document.getElementById('encaixeProtocolo');
    const protocoloInput = document.getElementById('protocoloInput');
    const protocoloInicialInput = document.getElementById('protocoloBoasVindasInput');

    if (encaixeProtocoloInput && encaixeProtocoloInput.value !== protocolo) encaixeProtocoloInput.value = protocolo;
    if (protocoloInput && protocoloInput.value !== protocolo) protocoloInput.value = protocolo;
    if (protocoloInicialInput && protocoloInicialInput.value !== protocolo) protocoloInicialInput.value = protocolo;
}

// Reseta os campos de protocolo
function resetProtocolos() {
    const encaixeProtocoloInput = document.getElementById('encaixeProtocolo');
    const protocoloInput = document.getElementById('protocoloInput');
    const protocoloInicialInput = document.getElementById('protocoloBoasVindasInput');

    if(encaixeProtocoloInput) encaixeProtocoloInput.value = '';
    if(protocoloInput) protocoloInput.value = '';
    if(protocoloInicialInput) protocoloInicialInput.value = '';
}

// Reseta o formulário de encaixe
function resetEncaixeForm() {
    const fieldsToReset = ['encaixeCaso', 'encaixeEndereco', 'encaixeCluster', 'encaixeSubterritorio', 'encaixeContato', 'encaixeMotivo', 'encaixePeriodo'];
    fieldsToReset.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });

    const encaixeDataInput = document.getElementById('encaixeData');
    if (encaixeDataInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        encaixeDataInput.value = `${year}-${month}-${day}`;
    }
    const horarioInfoDiv = document.getElementById('horario-info');
    if (horarioInfoDiv) horarioInfoDiv.classList.add('hidden');
}

// ========================================================================
//  FUNÇÃO DE COPIAR ATUALIZADA (v5)
// ========================================================================
function copyToClipboard(text, isFinalAction = false, isEncaixe = false) {
    if (!navigator.clipboard) {
        // Fallback para navegadores muito antigos ou contextos inseguros
        console.warn("API Clipboard não suportada. Usando fallback.");
        fallbackCopyTextToClipboard(text);
        return;
    }

    navigator.clipboard.writeText(text).then(function() {
        // Sucesso!
        showFeedback();
        if (isFinalAction) {
            setTimeout(resetProtocolos, 300);
        } else if (isEncaixe) {
            setTimeout(resetEncaixeForm, 300);
        }
    }).catch(function(err) { // Usar .catch para tratar erros da Promise
        // Falha
        console.error('Erro ao copiar para a área de transferência usando API: ', err);
        fallbackCopyTextToClipboard(text); // Usa o prompt antigo como fallback em caso de erro
    });
}

// Fallback usando o método antigo (execCommand)
function fallbackCopyTextToClipboard(text) {
     const textArea = document.createElement("textarea");
     textArea.value = text;
     textArea.style.position = "fixed"; // Evita scroll
     textArea.style.top = "0";
     textArea.style.left = "0";
     textArea.style.opacity = "0"; // Esconde o textarea

     document.body.appendChild(textArea);
     textArea.focus();
     textArea.select();

     try {
        const successful = document.execCommand('copy');
        if (successful) {
            showFeedback(); // Mostra feedback se execCommand funcionar
        } else {
            console.warn('Fallback execCommand falhou. Usando prompt.');
            window.prompt("Copiar manualmente (Ctrl+C):", text);
        }
     } catch (err) {
        console.error('Erro no fallback execCommand:', err);
        window.prompt("Erro ao copiar. Copie manualmente (Ctrl+C):", text);
     }
     document.body.removeChild(textArea);
}

// Função para preencher Cluster/Subterritório baseado no endereço
function autoFillLocationDetails() {
    const enderecoInput = document.getElementById('encaixeEndereco');
    const clusterInput = document.getElementById('encaixeCluster');
    const subterritorioInput = document.getElementById('encaixeSubterritorio');
    const horarioInfoDiv = document.getElementById('horario-info');
    const horarioTextoP = document.getElementById('horario-texto');

    // Garante que os elementos existem antes de tentar acessá-los
    if (!enderecoInput || !clusterInput || !subterritorioInput || !horarioInfoDiv || !horarioTextoP) {
        console.error("Elementos do formulário de encaixe não encontrados.");
        return;
    }

    const enderecoTexto = enderecoInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, ' ');

    clusterInput.value = '';
    subterritorioInput.value = '';
    horarioInfoDiv.classList.add('hidden');

    if (!enderecoTexto.trim()) {
        return;
    }

    let bestMatch = '';
    let foundRegional = '';
    let foundSubterritorio = '';

    // Procura a cidade no endereço para determinar regional/subterritório
    for (const city in cityToRegionalMap) {
        const normalizedCity = city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, ' ');
        if (enderecoTexto.includes(normalizedCity)) {
            // Escolhe o match mais longo (ex: "sao jose dos campos" vs "campos")
            if (normalizedCity.length > bestMatch.length) {
                bestMatch = city; // Armazena a chave original da cidade
                foundRegional = cityToRegionalMap[city];
                foundSubterritorio = cityToSubterritorioMap[city]; // Pega do mapeamento correto
            }
        }
    }

    if (foundRegional) {
        clusterInput.value = foundRegional;
        subterritorioInput.value = foundSubterritorio;

        // Mostra o horário de atendimento se disponível para o subterritório
        if (subterritorioHorarios[foundSubterritorio]) {
            horarioTextoP.innerText = subterritorioHorarios[foundSubterritorio];
            horarioInfoDiv.classList.remove('hidden');
        }
    }
}

// Função genérica para copiar texto, substituindo [Seu Nome]
function copyText(elementId) {
    const textElement = document.getElementById(elementId);
    if (!textElement) {
        console.error(`Elemento com ID ${elementId} não encontrado.`);
        return;
    }
    const agentNameInput = document.getElementById('agentName');
    const agentName = agentNameInput ? agentNameInput.value.trim() : '[Seu Nome]'; // Fallback
    const originalText = textElement.innerText;
    const textToCopy = originalText.replace(/\[Seu Nome\]/g, agentName || '[Seu Nome]');
    copyToClipboard(textToCopy);
}

// Função para copiar boas-vindas com nome do cliente e protocolo
function copyWelcomeMessageWithProtocol(elementId) {
    const textElement = document.getElementById(elementId);
    const customerNameInput = document.getElementById('customerName');
    const protocoloInput = document.getElementById('protocoloBoasVindasInput');

    if (!textElement || !customerNameInput || !protocoloInput) {
        console.error("Elementos para mensagem de boas-vindas não encontrados.");
        return;
    }

    const customerName = customerNameInput.value.trim() || 'cliente';
    const protocolo = protocoloInput.value.trim() || '[Não informado]';
    const originalText = textElement.innerText;
    let textToCopy = originalText.replace('[Nome do Cliente]', customerName);
    textToCopy = textToCopy.replace('[Nº do Protocolo]', protocolo);
    copyToClipboard(textToCopy);
}

// Função para copiar a solicitação de encaixe formatada
function copyEncaixeRequest() {
    const caso = document.getElementById('encaixeCaso')?.value.trim() || '[Não preenchido]';
    const protocolo = document.getElementById('encaixeProtocolo')?.value.trim() || '[Não preenchido]';
    const endereco = document.getElementById('encaixeEndereco')?.value.trim() || '[Não preenchido]';
    const cluster = document.getElementById('encaixeCluster')?.value.trim() || '[Não preenchido]';
    const subterritorio = document.getElementById('encaixeSubterritorio')?.value.trim() || '[Não preenchido]';
    const dataValue = document.getElementById('encaixeData')?.value;
    const periodo = document.getElementById('encaixePeriodo')?.value || '[Não preenchido]';
    const contato = document.getElementById('encaixeContato')?.value.trim() || '[Não preenchido]';
    const motivo = document.getElementById('encaixeMotivo')?.value.trim() || '[Não preenchido]';

    let dataFormatada = '[Não preenchido]';
    if (dataValue) {
        try {
            const [year, month, day] = dataValue.split('-');
            dataFormatada = `${day}/${month}/${year}`;
        } catch (e) { console.error("Erro ao formatar data de encaixe", e); }
    }

    const textToCopy = `SOLICITAÇÃO DE ENCAIXE
Setor: Suporte
Caso: ${caso}
Protocolo: ${protocolo}
Endereço: ${endereco}
Cluster: ${cluster}
Subterritório: ${subterritorio}
Data do Encaixe: ${dataFormatada}
Período: ${periodo}
Contato: ${contato}
motivo: ${motivo}`;

    copyToClipboard(textToCopy, false, true); // isEncaixe = true para resetar o form
}

// Função para copiar mensagem de instabilidade massiva com prazo
function copyMassivoMessage(hours) {
    const templateElement = document.getElementById('msgMassivoTemplate');
    if (!templateElement) return;
    const originalText = templateElement.innerText;
    const textToCopy = originalText.replace('[horas]', hours);
    copyToClipboard(textToCopy);
}

// Função para copiar confirmação de agendamento com data
function copySchedule(elementId) {
    const dateInput = document.getElementById('visitDate');
    const textElement = document.getElementById(elementId);
    if (!dateInput || !textElement) return;

    const dateValue = dateInput.value;
    const container = dateInput.parentElement;
    const existingError = container.querySelector('.text-red-600.date-error-msg'); // Classe específica
    if (existingError) existingError.remove();

    if (!dateValue) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Por favor, selecione uma data!';
        errorMsg.className = 'text-red-600 font-bold text-sm mt-2 date-error-msg'; // Classe específica
        container.appendChild(errorMsg);
        dateInput.focus();
        setTimeout(() => errorMsg.remove(), 3000);
        return;
    }

    let formattedDate = '[Data inválida]';
    try {
        const [year, month, day] = dateValue.split('-');
        formattedDate = `${day}/${month}/${year}`;
    } catch (e) { console.error("Erro ao formatar data de agendamento", e); }

    const agentNameInput = document.getElementById('agentName');
    const agentName = agentNameInput ? agentNameInput.value.trim() : '[Seu Nome]';
    const originalText = textElement.innerText;

    let textToCopy = originalText.replace(/\[Data do Agendamento\]/g, formattedDate);
    textToCopy = textToCopy.replace(/\[Seu Nome\]/g, agentName || '[Seu Nome]');
    copyToClipboard(textToCopy);
}

// Função para copiar oferta de período com data
function copyOfferPeriod(elementId) {
    const dateInput = document.getElementById('offerDate');
    const textElement = document.getElementById(elementId);
    if (!dateInput || !textElement) return;

    const dateValue = dateInput.value;
    const container = dateInput.closest('.bg-white'); // Encontra o container do bloco
    const existingError = container.querySelector('.text-red-600.offer-date-error-msg');
    if (existingError) existingError.remove();

    if (!dateValue) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Por favor, selecione uma data!';
        errorMsg.className = 'text-red-600 font-bold text-sm mt-2 text-center offer-date-error-msg';
        // Insere o erro antes do grid de botões
        const buttonGrid = container.querySelector('.grid');
        if (buttonGrid) {
            buttonGrid.parentElement.insertBefore(errorMsg, buttonGrid);
        } else {
            container.appendChild(errorMsg); // Fallback
        }
        dateInput.focus();
        setTimeout(() => errorMsg.remove(), 3000);
        return;
    }

    let formattedDate = '[Data inválida]';
     try {
        const [year, month, day] = dateValue.split('-');
        formattedDate = `${day}/${month}/${year}`;
    } catch (e) { console.error("Erro ao formatar data de oferta", e); }

    const agentNameInput = document.getElementById('agentName');
    const agentName = agentNameInput ? agentNameInput.value.trim() : '[Seu Nome]';
    const originalText = textElement.innerText;

    let textToCopy = originalText.replace('[Data]', formattedDate);
    textToCopy = textToCopy.replace(/\[Seu Nome\]/g, agentName || '[Seu Nome]');
    copyToClipboard(textToCopy);
}

// Função para copiar mensagem final com protocolo
function copyFinalMessageWithProtocol(elementId) {
    const protocoloInput = document.getElementById('protocoloInput');
    const textElement = document.getElementById(elementId);
    if (!protocoloInput || !textElement) return;

    const protocolo = protocoloInput.value.trim() || '[Não informado]';
    const originalText = textElement.innerText;
    const textToCopy = originalText.replace('[Nº do Protocolo]', protocolo);
    copyToClipboard(textToCopy, true); // isFinalAction = true
}

// Função para copiar resumo do agendamento e limpar campos
function copyResumoAgendamento() {
    const nome = document.getElementById('resumoNome')?.value.trim() || '[Preencher Nome do Cliente]';
    const endereco = document.getElementById('resumoEndereco')?.value.trim() || '[Preencher Endereço]';
    const contato = document.getElementById('resumoContato')?.value.trim() || '[Preencher Telefone]';
    const data = document.getElementById('resumoData')?.value.trim() || '[Preencher DD/MM/AAAA]';
    const horario = document.getElementById('resumoHorario')?.value.trim() || '[Preencher Período e Horário]';
    const referencia = document.getElementById('resumoReferencia')?.value.trim() || '[Preencher Ponto de Referência]';

    const textToCopy = `Nome do Cliente: ${nome}
Endereço do agendamento: ${endereco}
Telefone para contato: ${contato}
Qual dia será o agendamento: ${data}
Horário do agendamento: ${horario}
Ponto de referência: ${referencia}`;

    copyToClipboard(textToCopy);

    // Limpa os campos após copiar
    setTimeout(() => {
        const fieldsToClear = ['resumoNome', 'resumoEndereco', 'resumoContato', 'resumoData', 'resumoHorario', 'resumoReferencia'];
        fieldsToClear.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
    }, 300);
}


// Função para copiar texto da área de tabulação
function copyFromTextarea(elementId) {
    const textarea = document.getElementById(elementId);
    if (!textarea) return;
    const textToCopy = textarea.value;

    if (!textToCopy) {
        console.error('Textarea de tabulação está vazio.');
        return;
    }

    copyToClipboard(textToCopy, true); // isFinalAction = true

    // Reseta botões e atualiza template após copiar
    setTimeout(() => {
        const allTabButtons = document.querySelectorAll('.tab-button');
        allTabButtons.forEach(btn => {
            btn.dataset.active = 'false';
            btn.classList.remove('bg-green-500', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-800');
        });
        updateAllTabulationLogic(); // Reseta o texto do textarea para o template padrão
    }, 300);
}

// Atualiza o texto no textarea de tabulação baseado nos botões clicados
function updateAllTabulationLogic() {
    const textarea = document.getElementById('tabulacaoTexto');
    if (!textarea) return;

    const problemBtn = document.querySelector('#problema-relatado-group button[data-active="true"]');
    const resultMassivoBtn = document.querySelector('[data-placeholder="Resultado"][data-massivo-trigger="true"][data-active="true"]');
    const solicitacaoAtivaBtn = document.querySelector('#solicitacao-cliente-group button[data-active="true"]');

    const isMassivoMode = !!(resultMassivoBtn || (problemBtn && problemBtn.dataset.massivoTrigger === 'true'));
    const isSolicitacaoMode = !!solicitacaoAtivaBtn;
    const isTechnicalMode = !!(problemBtn && !isMassivoMode && !isSolicitacaoMode); // Ajustado

    let baseTemplate;
    if (isSolicitacaoMode) {
        baseTemplate = solicitacaoTabulationTemplate;
    } else if (isMassivoMode) {
        baseTemplate = massivoTabulationTemplate;
    } else if (isTechnicalMode) {
        baseTemplate = technicalProblemTabulationTemplate;
    } else {
        baseTemplate = originalTabulationTemplate; // Padrão
    }

    let newText = baseTemplate;

    // Adiciona frase introdutória dinâmica
    const customerNameInput = document.getElementById('customerName');
    const customerNameText = customerNameInput ? (customerNameInput.value.trim() || 'O cliente') : 'O cliente';
    let dynamicSentence = '';
    if (problemBtn || resultMassivoBtn) { // Inclui massivo na condição de problema
        dynamicSentence = `${customerNameText} entrou em contato informando:`;
    } else if (solicitacaoAtivaBtn) {
        dynamicSentence = `${customerNameText} entrou em contato solicitando:`;
    }

    if (dynamicSentence) {
        newText = newText.replace('[Dynamic Intro Sentence]', dynamicSentence);
    } else {
        // Remove o placeholder e a linha extra se não houver frase
        newText = newText.replace(/\[Dynamic Intro Sentence\]\n\n?/, '');
    }

    // Substitui placeholders de botões de seleção única
    document.querySelectorAll('[data-group-type="single"] button[data-active="true"]').forEach(button => {
        const placeholder = button.dataset.placeholder;
        let value = button.dataset.value;

        // Caso especial para troca de vencimento
        if (placeholder === 'Solicitação Cliente' && value === 'Troca de data de vencimento') {
             const dayValue = document.getElementById('newDueDate')?.value;
             value = dayValue ? `Troca de data de vencimento para o dia ${dayValue}` : 'Troca de data de vencimento [selecionar dia]';
        }

        if (placeholder) {
           newText = newText.replace(`[${placeholder}]`, value);
        }
    });

    // Concatena valores de botões de seleção múltipla (procedimentos)
    const multiPlaceholders = {};
    document.querySelectorAll('[data-group-type="multi"] button[data-active="true"]').forEach(button => {
        const placeholder = button.dataset.placeholder;
        const value = button.dataset.value;
        if (placeholder) {
            if (!multiPlaceholders[placeholder]) {
                multiPlaceholders[placeholder] = [];
            }
            multiPlaceholders[placeholder].push(value);
        }
    });
     for (const placeholder in multiPlaceholders) {
        if (multiPlaceholders[placeholder].length > 0) {
            const combinedValue = multiPlaceholders[placeholder].join('; ');
            newText = newText.replace(`[${placeholder}]`, combinedValue);
        }
    }

    // Lógica adicional baseada no modo (Solicitação vs Técnico/Massivo)
    if (isSolicitacaoMode) {
        const vencimentoPicker = document.getElementById('vencimento-date-picker');
        if (vencimentoPicker) {
            vencimentoPicker.classList.toggle('hidden', solicitacaoAtivaBtn?.dataset.value !== 'Troca de data de vencimento');
        }
        let solucao = '[Solução]'; // Placeholder padrão
         const solicitacaoValue = solicitacaoAtivaBtn?.dataset.value;
         if (solicitacaoValue === 'Segunda via de boleto') solucao = 'Segunda via de boleto enviada ao cliente.';
         else if (solicitacaoValue === 'Desbloqueio em confiança') solucao = 'Desbloqueio em confiança realizado no sistema.';
         else if (solicitacaoValue === 'Troca de senha de Wi-Fi') solucao = 'Cliente orientado para realizar a troca da senha do Wi-Fi.';
         else if (solicitacaoValue === 'Troca de data de vencimento') {
              const dayValue = document.getElementById('newDueDate')?.value;
              solucao = dayValue ? `Solicitada alteração da data de vencimento para o dia ${dayValue}.` : 'Solicitada alteração da data de vencimento [selecionar dia].';
         }
        newText = newText.replace('[Solução]', solucao);

    } else { // Modo Técnico ou Massivo
        const resultadoAtivo = document.querySelector('[data-placeholder="Resultado"][data-active="true"]');
        let diagnostico = '[Diagnóstico]'; // Padrão
        if (resultadoAtivo) {
            const resultadoValue = resultadoAtivo.dataset.value;
            if (resultadoValue === 'Conexão normalizada após procedimentos') {
                 diagnostico = 'Problema resolvido após procedimentos remotos.';
            } else if (resultadoValue.includes('instabilidade')) {
                 diagnostico = 'Cliente afetado por instabilidade massiva na região.';
            } else if (resultadoValue.includes('Não Resolvido') || resultadoValue.includes('visita')) {
                 diagnostico = 'Falha identificada. Necessária intervenção técnica no local.';
            } else if (resultadoValue === 'Cliente irá Observar') {
                 diagnostico = 'Sinal restabelecido/parâmetros normalizados. Cliente orientado a observar.';
            } else if (resultadoValue === 'Cliente Orientado') {
                diagnostico = 'Cliente orientado sobre procedimentos/configurações.';
            }
        } else if (isMassivoMode) { // Diagnóstico padrão para massivo se nenhum resultado foi selecionado ainda
             diagnostico = 'Cliente afetado por instabilidade massiva na região.';
        }
        newText = newText.replace('[Diagnóstico]', diagnostico);


        // Define a Solução Aplicada
        let solucoes = [];
        document.querySelectorAll('#procedimentos-testes button[data-active="true"]').forEach(button => {
            // Adiciona todos os procedimentos exceto o de LED vermelho (que é parte do diagnóstico)
            if (button.dataset.placeholder !== 'Status LEDs') {
                 solucoes.push(button.dataset.value);
            }
        });

        if (resultadoAtivo && (resultadoAtivo.dataset.value.includes('Não Resolvido') || resultadoAtivo.dataset.value.includes('visita'))) {
            solucoes.push('Agendamento de visita técnica realizado.');
        } else if (resultadoAtivo && resultadoAtivo.dataset.value.includes('instabilidade')) {
             solucoes = ['Cliente orientado sobre a instabilidade e prazo de normalização.']; // Sobrescreve para massivo
        } else if (resultadoAtivo && resultadoAtivo.dataset.value === 'Cliente Orientado'){
            solucoes = ['Cliente orientado sobre X.']; // Exemplo, ajuste conforme orientação dada
        }

        if (solucoes.length > 0) {
            newText = newText.replace('[Solução]', solucoes.join('; '));
        } else if (resultadoAtivo && resultadoAtivo.dataset.value === 'Conexão normalizada após procedimentos') {
             newText = newText.replace('[Solução]', 'Procedimentos remotos normalizaram a conexão.'); // Solução padrão para normalizado
        } else {
             newText = newText.replace('[Solução]', '[Nenhuma ação aplicada ou visita agendada]'); // Placeholder se nada foi feito/selecionado
        }


        // Trata placeholder de LEDs
        const ledButtonAtivo = document.querySelector('#procedimentos-testes button[data-placeholder="Status LEDs"][data-active="true"]');
        if (ledButtonAtivo) {
            newText = newText.replace('[Status LEDs]', ledButtonAtivo.dataset.value);
        } else {
            // Se nenhum botão de LED estiver ativo, assume normal ou remove a linha
             if (resultadoAtivo && resultadoAtivo.dataset.value === 'Conexão normalizada após procedimentos'){
                 newText = newText.replace(/- Verificação de LEDs:.*?(\n|$)/, ''); // Remove linha se normalizado
             } else {
                 newText = newText.replace('[Status LEDs]', 'Não informado ou normal');
             }
        }

         // Remove linha de Teste de Velocidade se for 'Sem conexão'
         if (problemBtn && problemBtn.dataset.value.includes('Sem conexão')) {
             newText = newText.replace(/- Teste de Velocidade:.*?(\n|$)/, '');
         } else {
             // Se não for 'Sem conexão' mas o teste não foi selecionado, deixa um placeholder
             if (!multiPlaceholders['Teste Velocidade']) {
                 newText = newText.replace('[Teste Velocidade]', 'Não realizado ou não aplicável');
             }
         }
         // Remove linha de Cabos se não foi selecionado
         if (!multiPlaceholders['Cabos']) {
             newText = newText.replace(/- Verificação de Cabos:.*?(\n|$)/, '');
         }

    }

    // Limpa placeholders restantes que não foram preenchidos
    newText = newText.replace(/\[.*?\]/g, ''); // Remove qualquer [Placeholder] restante

    textarea.value = newText;
}

// Alterna o estado (ativo/inativo) dos botões de tabulação
function toggleTabulationButton(button) {
    const isActive = button.dataset.active === 'true';
    const groupContainer = button.closest('[data-group-type]');
    if (!groupContainer) return; // Sai se não encontrar o container do grupo
    const groupType = groupContainer.dataset.groupType;

    if (isActive) {
        // Desativa o botão
        button.dataset.active = 'false';
        button.classList.replace('bg-green-500', 'bg-gray-200');
        button.classList.replace('text-white', 'text-gray-800');
    } else {
        // Ativa o botão
        if (groupType === 'single') {
            // Desativa outros botões no mesmo grupo (single-select)
            const siblingButtons = groupContainer.querySelectorAll('button');
            siblingButtons.forEach(btn => {
                if (btn !== button && btn.dataset.active === 'true') {
                    btn.dataset.active = 'false';
                    btn.classList.replace('bg-green-500', 'bg-gray-200');
                    btn.classList.replace('text-white', 'text-gray-800');
                }
            });
        }
        button.dataset.active = 'true';
        button.classList.replace('bg-gray-200', 'bg-green-500');
        button.classList.replace('text-gray-800', 'text-white');
    }

    // --- Lógica de Exclusão Mútua e Pré-seleção ---

    const isProblemTrigger = button.closest('#problema-relatado-group');
    const isSolicitacaoTrigger = button.closest('#solicitacao-cliente-group');
    const isResultadoTrigger = button.closest('div > div[data-group-type="single"]') && button.dataset.placeholder === 'Resultado'; // Garante que é botão de resultado

    if (button.dataset.active === 'true') { // Apenas executa se o botão FOI ATIVADO
        // Se selecionou um PROBLEMA, desmarca qualquer SOLICITAÇÃO
        if (isProblemTrigger) {
            document.querySelectorAll('#solicitacao-cliente-group button[data-active="true"]').forEach(b => toggleTabulationButton(b)); // Usa toggle para desativar
             // Se marcou Massivo, desmarca outros resultados exceto os de massivo
             if(button.dataset.massivoTrigger === 'true'){
                 document.querySelectorAll('[data-placeholder="Resultado"][data-active="true"]:not([data-massivo-trigger="true"])').forEach(b => toggleTabulationButton(b));
             }
        }
        // Se selecionou uma SOLICITAÇÃO, desmarca qualquer PROBLEMA e pré-seleciona RESULTADO="Solicitação Atendida"
        else if (isSolicitacaoTrigger) {
            document.querySelectorAll('#problema-relatado-group button[data-active="true"]').forEach(b => toggleTabulationButton(b));
            // Desmarca todos os outros resultados
            document.querySelectorAll('[data-placeholder="Resultado"][data-active="true"]').forEach(b => toggleTabulationButton(b));
            // Marca "Solicitação Atendida"
            const resultadoSolicitacao = document.querySelector('[data-placeholder="Resultado"][data-value="Solicitação atendida"]');
            if (resultadoSolicitacao && resultadoSolicitacao.dataset.active !== 'true') {
                toggleTabulationButton(resultadoSolicitacao);
            }
        }
         // Se selecionou um RESULTADO
         else if (isResultadoTrigger) {
             // Se o resultado é de massivo, desmarca qualquer problema que não seja massivo e qualquer solicitação
             if(button.dataset.massivoTrigger === 'true'){
                 document.querySelectorAll('#problema-relatado-group button[data-active="true"]:not([data-massivo-trigger="true"])').forEach(b => toggleTabulationButton(b));
                 document.querySelectorAll('#solicitacao-cliente-group button[data-active="true"]').forEach(b => toggleTabulationButton(b));
                 // Se ainda não marcou o problema massivo, marca ele
                 const probMassivo = document.querySelector('#problema-relatado-group button[data-massivo-trigger="true"]');
                 if(probMassivo && probMassivo.dataset.active !== 'true') toggleTabulationButton(probMassivo);
             }
             // Se o resultado é "Solicitação Atendida", desmarca problemas e outros resultados
             else if (button.dataset.value === 'Solicitação atendida') {
                 document.querySelectorAll('#problema-relatado-group button[data-active="true"]').forEach(b => toggleTabulationButton(b));
                 document.querySelectorAll('[data-placeholder="Resultado"][data-active="true"]:not([data-value="Solicitação atendida"])').forEach(b => toggleTabulationButton(b));
             }
             // Se selecionou "Normalizado", desmarca o LED vermelho
             else if (button.dataset.value === 'Conexão normalizada após procedimentos') {
                  const ledBtn = document.querySelector('[data-placeholder="Status LEDs"][data-active="true"]');
                  if (ledBtn) toggleTabulationButton(ledBtn);
             }
         }
         // Se selecionou o LED vermelho, desmarca o resultado "Normalizado"
         else if (button.dataset.placeholder === 'Status LEDs'){
             const normalizadoBtn = document.querySelector('[data-placeholder="Resultado"][data-value="Conexão normalizada após procedimentos"][data-active="true"]');
             if (normalizadoBtn) toggleTabulationButton(normalizadoBtn);
         }

    }

    // Sempre atualiza o texto do textarea após qualquer clique
    updateAllTabulationLogic();
}


// Mostra o feedback visual "Copiado!"
function showFeedback() {
    const feedback = document.getElementById('copyFeedback');
    if (feedback) {
        feedback.style.display = 'block';
        feedback.classList.remove('copy-feedback-animation'); // Garante que a animação reinicie
        void feedback.offsetWidth; // Força reflow para reiniciar animação
        feedback.classList.add('copy-feedback-animation');

        // Usa setTimeout para esconder após a animação
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 2000); // Duração da animação
    }
}
