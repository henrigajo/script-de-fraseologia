/* ========================================================================
   SCRIPT.JS v3 - COMPLETO E CORRIGIDO
   - Usa a API de Clipboard (navigator.clipboard) moderna
   - Remove referências a IDs que não existem no HTML
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

const cityToRegionalMap = {
    "aguaí": "Regional Central", "americana": "Regional Central", "araras": "Regional Central", "artur nogueira": "Regional Central", "casa branca": "Regional Central", "conchal": "Regional Central", "cordeirópolis": "Regional Central", "cosmópolis": "Regional Central", "engenheiro coelho": "Regional Central", "estiva gerbi": "Regional Central", "iracemápolis": "Regional Central", "leme": "Regional Central", "limeira": "Regional Central", "mogi guaçu": "Regional Central", "mogi mirim": "Regional Central", "nova odessa": "Regional Central", "paulínia": "Regional Central", "piracicaba": "Regional Central", "pirassununga": "Regional Central", "porto ferreira": "Regional Central", "rio claro": "Regional Central", "santa bárbara d'oeste": "Regional Central", "santa barbara doeste": "Regional Central", "santa barbara": "Regional Central", "santa cruz das palmeiras": "Regional Central", "santa gertrudes": "Regional Central", "santa rita do passa quatro": "Regional Central", "sumaré": "Regional Central", "alumínio": "Regional Central", "angatuba": "Regional Central", "araçoiaba da serra": "Regional Central", "bofete": "Regional Central", "boituva": "Regional Central", "campina do monte alegre": "Regional Central", "capela do alto": "Regional Central", "capivari": "Regional Central", "cerquilho": "Regional Central", "cesário lange": "Regional Central", "conchas": "Regional Central", "iperó": "Regional Central", "itapetininga": "Regional Central", "itu": "Regional Central", "jumirim": "Regional Central", "laranjal paulista": "Regional Central", "monte mor": "Regional Central", "pereiras": "Regional Central", "pilar do sul": "Regional Central", "porangaba": "Regional Central", "quadra": "Regional Central", "rafard": "Regional Central", "rio das pedras": "Regional Central", "saltinho": "Regional Central", "salto": "Regional Central", "salto de pirapora": "Regional Central", "sarapuí": "Regional Central", "sorocaba": "Regional Central", "tatuí": "Regional Central", "tietê": "Regional Central", "votorantim": "Regional Central", "amparo": "Regional Central", "campinas": "Regional Central", "holambra": "Regional Central", "hortolândia": "Regional Central", "jaguariúna": "Regional Central", "lindoia": "Regional Central", "monte alegre do sul": "Regional Central", "pedreira": "Regional Central", "santo antônio de posse": "Regional Central", "santo antonio de posse": "Regional Central", "serra negra": "Regional Central",
    "américo brasiliense": "Regional Centro Oeste", "americo brasiliense": "Regional Centro Oeste", "araraquara": "Regional Centro Oeste", "boa esperança do sul": "Regional Centro Oeste", "bocaina": "Regional Centro Oeste", "borborema": "Regional Centro Oeste", "cravinhos": "Regional Centro Oeste", "descalvado": "Regional Centro Oeste", "dobrada": "Regional Centro Oeste", "dourado": "Regional Centro Oeste", "gavião peixoto": "Regional Centro Oeste", "guariba": "Regional Centro Oeste", "guatapará": "Regional Centro Oeste", "ibaté": "Regional Centro Oeste", "ibitinga": "Regional Centro Oeste", "itaju": "Regional Centro Oeste", "itápolis": "Regional Centro Oeste", "matão": "Regional Centro Oeste", "motuca": "Regional Centro Oeste", "nova europa": "Regional Centro Oeste", "ribeirão bonito": "Regional Centro Oeste", "ribeirão preto": "Regional Centro Oeste", "ribeirao preto": "Regional Centro Oeste", "rincão": "Regional Centro Oeste", "santa ernestina": "Regional Centro Oeste", "santa lúcia": "Regional Centro Oeste", "são carlos": "Regional Centro Oeste", "sao carlos": "Regional Centro Oeste", "tabatinga": "Regional Centro Oeste", "trabiju": "Regional Centro Oeste", "bady bassitt": "Regional Centro Oeste", "barretos": "Regional Centro Oeste", "bebedouro": "Regional Centro Oeste", "cândido rodrigues": "Regional Centro Oeste", "colina": "Regional Centro Oeste", "cristais paulista": "Regional Centro Oeste", "fernando prestes": "Regional Centro Oeste", "franca": "Regional Centro Oeste", "guaíra": "Regional Centro Oeste", "itajobi": "Regional Centro Oeste", "itirapuã": "Regional Centro Oeste", "jaborandi": "Regional Centro Oeste", "jaboticabal": "Regional Centro Oeste", "mirassol": "Regional Centro Oeste", "monte alto": "Regional Centro Oeste", "olímpia": "Regional Centro Oeste", "patrocínio paulista": "Regional Centro Oeste", "pindorama": "Regional Centro Oeste", "pitangueiras": "Regional Centro Oeste", "ribeirão corrente": "Regional Centro Oeste", "santa adélia": "Regional Centro Oeste", "são josé do rio preto": "Regional Centro Oeste", "sao jose do rio preto": "Regional Centro Oeste", "águas de santa bárbara": "Regional Centro Oeste", "agudos": "Regional Centro Oeste", "arandu": "Regional Centro Oeste", "arealva": "Regional Centro Oeste", "areiópolis": "Regional Centro Oeste", "avaré": "Regional Centro Oeste", "bariri": "Regional Centro Oeste", "barra bonita": "Regional Centro Oeste", "bauru": "Regional Centro Oeste", "borebi": "Regional Centro Oeste", "botucatu": "Regional Centro Oeste", "cerqueira césar": "Regional Centro Oeste", "dois córregos": "Regional Centro Oeste", "iaras": "Regional Centro Oeste", "igaraçu do tietê": "Regional Centro Oeste", "itaí": "Regional Centro Oeste", "itapuí": "Regional Centro Oeste", "itatinga": "Regional Centro Oeste", "jaú": "Regional Centro Oeste", "jau": "Regional Centro Oeste", "lençóis paulista": "Regional Centro Oeste", "lencois paulista": "Regional Centro Oeste", "lins": "Regional Centro Oeste", "macatuba": "Regional Centro Oeste", "manduri": "Regional Centro Oeste", "mineiros do tietê": "Regional Centro Oeste", "novo horizonte": "Regional Centro Oeste", "óleo": "Regional Centro Oeste", "paranapanema": "Regional Centro Oeste", "pardinho": "Regional Centro Oeste", "pederneiras": "Regional Centro Oeste", "piratininga": "Regional Centro Oeste", "pratânia": "Regional Centro Oeste", "são manuel": "Regional Centro Oeste",
    "araçariguama": "Regional Sudeste", "atibaia": "Regional Sudeste", "bom jesus dos perdões": "Regional Sudeste", "bom jesus": "Regional Sudeste", "bragança paulista": "Regional Sudeste", "cabreúva": "Regional Sudeste", "caieiras": "Regional Sudeste", "campo limpo paulista": "Regional Sudeste", "francisco morato": "Regional Sudeste", "franco da rocha": "Regional Sudeste", "indaiatuba": "Regional Sudeste", "itupeva": "Regional Sudeste", "jarinu": "Regional Sudeste", "jundiaí": "Regional Sudeste", "louveira": "Regional Sudeste", "mairiporã": "Regional Sudeste", "nazaré paulista": "Regional Sudeste", "piracaia": "Regional Sudeste", "valinhos": "Regional Sudeste", "várzea paulista": "Regional Sudeste", "vinhedo": "Regional Sudeste", "cubatão": "Regional Sudeste", "guarujá": "Regional Sudeste", "itanhaém": "Regional Sudeste", "mongaguá": "Regional Sudeste", "peruíbe": "Regional Sudeste", "praia grande": "Regional Sudeste", "santos": "Regional Sudeste", "são bernardo do campo": "Regional Sudeste", "sao bernardo": "Regional Sudeste", "são vicente": "Regional Sudeste", "biritiba-mirim": "Regional Sudeste", "caçapava": "Regional Sudeste", "guararema": "Regional Sudeste", "igaratá": "Regional Sudeste", "jacareí": "Regional Sudeste", "mogi das cruzes": "Regional Sudeste", "salesópolis": "Regional Sudeste", "santa branca": "Regional Sudeste", "são josé dos campos": "Regional Sudeste", "sao jose dos campos": "SÃO JOSÉ DOS CAMPOS", "são paulo": "Regional Sudeste", "taubaté": "Regional Sudeste", "tremembé": "Regional Sudeste"
};

const cityToSubterritorioMap = {
    "aguaí": "SUMARÉ", "americana": "SUMARÉ", "araras": "SUMARÉ", "artur nogueira": "SUMARÉ", "casa branca": "SUMARÉ", "conchal": "SUMARÉ", "cordeirópolis": "SUMARÉ", "cosmópolis": "SUMARÉ", "engenheiro coelho": "SUMARÉ", "estiva gerbi": "SUMARÉ", "iracemápolis": "SUMARÉ", "leme": "SUMARÉ", "limeira": "SUMARÉ", "mogi guaçu": "SUMARÉ", "mogi mirim": "SUMARÉ", "nova odessa": "SUMARÉ", "paulínia": "SUMARÉ", "piracicaba": "SUMARÉ", "pirassununga": "SUMARÉ", "porto ferreira": "SUMARÉ", "rio claro": "SUMARÉ", "santa bárbara d'oeste": "SUMARÉ", "santa barbara doeste": "SUMARÉ", "santa barbara": "SUMARÉ", "santa cruz das palmeiras": "SUMARÉ", "santa gertrudes": "SUMARÉ", "santa rita do passa quatro": "SUMARÉ", "sumaré": "SUMARÉ",
    "alumínio": "SOROCABA", "angatuba": "SOROCABA", "araçoiaba da serra": "SOROCABA", "bofete": "SOROCABA", "boituva": "SOROCABA", "campina do monte alegre": "SOROCABA", "capela do alto": "SOROCABA", "capivari": "SOROCABA", "cerquilho": "SOROCABA", "cesário lange": "SOROCABA", "conchas": "SOROCABA", "iperó": "SOROCABA", "itapetininga": "SOROCABA", "itu": "SOROCABA", "jumirim": "SOROCABA", "laranjal paulista": "SOROCABA", "monte mor": "SOROCABA", "pereiras": "SOROCABA", "pilar do sul": "SOROCABA", "porangaba": "SOROCABA", "quadra": "SOROCABA", "rafard": "SOROCABA", "rio das pedras": "SOROCABA", "saltinho": "SOROCABA", "salto": "SOROCABA", "salto de pirapora": "SOROCABA", "sarapuí": "SOROCABA", "sorocaba": "SOROCABA", "tatuí": "SOROCABA", "tietê": "SOROCABA", "votorantim": "SOROCABA",
    "amparo": "CAMPINAS", "campinas": "CAMPINAS", "holambra": "CAMPINAS", "hortolândia": "CAMPINAS", "jaguariúna": "CAMPINAS", "lindoia": "CAMPINAS", "monte alegre do sul": "CAMPINAS", "pedreira": "CAMPINAS", "santo antônio de posse": "CAMPINAS", "santo antonio de posse": "CAMPINAS", "serra negra": "CAMPINAS",
    "américo brasiliense": "ARARAQUARA", "americo brasiliense": "ARARAQUARA", "araraquara": "ARARAQUARA", "boa esperança do sul": "ARARAQUARA", "bocaina": "ARARAQUARA", "borborema": "ARARAQUARA", "cravinhos": "ARARAQUARA", "descalvado": "ARARAQUARA", "dobrada": "ARARAQUARA", "dourado": "ARARAQUARA", "gavião peixoto": "ARARAQUARA", "guariba": "ARARAQUARA", "guatapará": "ARARAQUARA", "ibaté": "ARARAQUARA", "ibitinga": "ARARAQUARA", "itaju": "ARARAQUARA", "itápolis": "ARARAQUARA", "matão": "ARARAQUARA", "motuca": "ARARAQUARA", "nova europa": "ARARAQUara", "ribeirão bonito": "ARARAQUARA", "ribeirão preto": "ARARAQUARA", "ribeirao preto": "ARARAQUARA", "rincão": "ARARAQUARA", "santa ernestina": "ARARAQUARA", "santa lúcia": "ARARAQUARA", "são carlos": "ARARAQUARA", "sao carlos": "ARARAQUARA", "tabatinga": "ARARAQUARA", "trabiju": "ARARAQUARA",
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
Simbólica
    "JUNDIAÍ": "Seg-Sex: 08:00 às 21:00 / Sáb-Dom: 09:00 às 17:20",
    "SÃO JOSÉ DOS CAMPOS": "Seg-Sex: 08:00 às 20:00 / Sáb-Dom: 09:00 às 17:20",
    "SUMARÉ": "Seg-Sex: 07:00 às 22:00 / Sáb-Dom: 07:00 às 18:00",
    "SOROCABA": "Seg-Sex: 07:00 às 22:00 / Sáb-Dom: 07:00 às 18:00",
    "CAMPINAS": "Seg-Sex: 07:00 às 22:00 / Sáb-Dom: 07:00 às 18:00",
};


document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    const dateInput = document.getElementById('visitDate');
    const offerDateInput = document.getElementById('offerDate');
    const newDueDateInput = document.getElementById('newDueDate');
    const encaixeDataInput = document.getElementById('encaixeData');
    const encaixeEnderecoInput = document.getElementById('encaixeEndereco');
    const customerNameInput = document.getElementById('customerName');
    
    const encaixeProtocoloInput = document.getElementById('encaixeProtocolo');
    const protocoloInput = document.getElementById('protocoloInput');
    const protocoloInicialInput = document.getElementById('protocoloBoasVindasInput');


    if(dateInput) {
        dateInput.value = todayString;
        dateInput.min = todayString;
    }
    if(encaixeDataInput) {
        encaixeDataInput.value = todayString;
        encaixeDataInput.min = todayString;
    }

    if (offerDateInput) {
        let nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        const nextYear = nextDay.getFullYear();
        const nextMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
source
        const nextDate = String(nextDay.getDate()).padStart(2, '0');
        offerDateInput.value = `${nextYear}-${nextMonth}-${nextDate}`;
        offerDateInput.min = todayString;
    }

    if (newDueDateInput) {
        newDueDateInput.addEventListener('change', updateAllTabulationLogic);
A
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
        encaixeProtocoloInput.addEventListener('input', (e) => syncProtocolos(e.target.value));
        protocoloInput.addEventListener('input', (e) => syncProtocolos(e.target.value));
        protocoloInicialInput.addEventListener('input', (e) => syncProtocolos(e.target.value));
    }
});

function syncProtocolos(protocolo) {
    const encaixeProtocoloInput = document.getElementById('encaixeProtocolo');
    const protocoloInput = document.getElementById('protocoloInput');
    const protocoloInicialInput = document.getElementById('protocoloBoasVindasInput');
    
    if (encaixeProtocoloInput && encaixeProtocoloInput.value !== protocolo) encaixeProtocoloInput.value = protocolo;
    if (protocoloInput && protocoloInput.value !== protocolo) protocoloInput.value = protocolo;
    if (protocoloInicialInput && protocoloInicialInput.value !== protocolo) protocoloInicialInput.value = protocolo;
}

function resetProtocolos() {
Sinalizar
    const encaixeProtocoloInput = document.getElementById('encaixeProtocolo');
    const protocoloInput = document.getElementById('protocoloInput');
    const protocoloInicialInput = document.getElementById('protocoloBoasVindasInput');

    if(encaixeProtocoloInput) encaixeProtocoloInput.value = '';
    if(protocoloInput) protocoloInput.value = '';
    if(protocoloInicialInput) protocoloInicialInput.value = '';
}

function resetEncaixeForm() {
    document.getElementById('encaixeCaso').value = '';
    // Don't reset protocolo on encaixe copy
    document.getElementById('encaixeEndereco').value = '';
    document.getElementById('encaixeCluster').value = '';
source
    document.getElementById('encaixeSubterritorio').value = '';
    document.getElementById('encaixeContato').value = '';
    document.getElementById('encaixeMotivo').value = '';
    document.getElementById('encaixePeriodo').value = '';
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('encaixeData').value = `${year}-${month}-${day}`;
    document.getElementById('horario-info').classList.add('hidden');
}

// ========================================================================
//  !!!!!!!!!! FUNÇÃO DE COPIAR ATUALIZADA (v3) !!!!!!!!!!
// ========================================================================
function copyToClipboard(text, isFinalAction = false, isEncaixe = false) {
    if (!navigator.clipboard) {
        // Fallback para navegadores antigos ou contextos inseguros
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
    }, function(err) {
        // Falha
        console.error('Erro ao copiar para a área de transferência: ', err);
        fallbackCopyTextToClipboard(text); // Usa o prompt antigo como fallback
    });
}

function fallbackCopyTextToClipboard(text) {
     // Esta função agora é SÓ um fallback, caso o navigator.clipboard falhe
     const textArea = document.createElement("textarea");
     textArea.value = text;
     textArea.style.position = "fixed";
     textArea.style.top = "-9999px";
     textArea.style.left = "-9999px";
     document.body.appendChild(textArea);
     textArea.focus();
     textArea.select();
     try {
        document.execCommand('copy');
        showFeedback(); // Tenta mostrar feedback mesmo no fallback
     } catch (err) {
        console.warn('Fallback de cópia falhou. Usando prompt.');
        window.prompt("Não foi possível copiar automaticamente. Por favor, copie manualmente (Ctrl+C):", text);
     }
     document.body.removeChild(textArea);
}

function autoFillLocationDetails() {
    const enderecoInput = document.getElementById('encaixeEndereco');
    const clusterInput = document.getElementById('encaixeCluster');
    const subterritorioInput = document.getElementById('encaixeSubterritorio');
    const horarioInfoDiv = document.getElementById('horario-info');
    const horarioTextoP = document.getElementById('horario-texto');
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

    for (const city in cityToRegionalMap) {
        const normalizedCity = city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, ' ');
        if (enderecoTexto.includes(normalizedCity)) {
            if (normalizedCity.length > bestMatch.length) {
                bestMatch = city;
                foundRegional = cityToRegionalMap[city];
                foundSubterritorio = cityToSubterritorioMap[city];
            }
        }
    }

    if (foundRegional) {
        clusterInput.value = foundRegional;
        subterritorioInput.value = foundSubterritorio;

        if (subterritorioHorarios[foundSubterritorio]) {
            horarioTextoP.innerText = subterritorioHorarios[foundSubterritorio];
            horarioInfoDiv.classList.remove('hidden');
        }
    }
}


// Função para copiar o texto padrão
function copyText(elementId, buttonElement) {
    const agentName = document.getElementById('agentName').value.trim() || '[Seu Nome]';
    const textElement = document.getElementById(elementId);
    const originalText = textElement.innerText;
    const textToCopy = originalText.replace(/\[Seu Nome\]/g, agentName);
    copyToClipboard(textToCopy);
}

function copyWelcomeMessageWithProtocol(elementId, buttonElement) {
    const customerName = document.getElementById('customerName').value.trim() || 'cliente';
    const protocolo = document.getElementById('protocoloBoasVindasInput').value.trim() || '[Não informado]';
    const textElement = document.getElementById(elementId);
    const originalText = textElement.innerText;
    let textToCopy = originalText.replace('[Nome do Cliente]', customerName);
    textToCopy = textToCopy.replace('[Nº do Protocolo]', protocolo);
    copyToClipboard(textToCopy);
}

function copyEncaixeRequest() {
    const caso = document.getElementById('encaixeCaso').value.trim();
    const protocolo = document.getElementById('encaixeProtocolo').value.trim();
    const endereco = document.getElementById('encaixeEndereco').value.trim();
    const cluster = document.getElementById('encaixeCluster').value.trim();
    const subterritorio = document.getElementById('encaixeSubterritorio').value.trim();
    const dataValue = document.getElementById('encaixeData').value;
    const periodo = document.getElementById('encaixePeriodo').value;
    const contato = document.getElementById('encaixeContato').value.trim();
    const motivo = document.getElementById('encaixeMotivo').value.trim();

    let dataFormatada = '';
    if (dataValue) {
        const [year, month, day] = dataValue.split('-');
        dataFormatada = `${day}/${month}/${year}`;
    }

    const textToCopy = `SOLICITAÇÃO DE ENCAIXE
Setor: Suporte
Caso: ${caso || '[Não preenchido]'}
Protocolo: ${protocolo || '[Não preenchido]'}
Endereço: ${endereco || '[Não preenchido]'}
Cluster: ${cluster || '[Não preenchido]'}
Subterritório: ${subterritorio || '[Não preenchido]'}
Data do Encaixe: ${dataFormatada || '[Não preenchido]'}
Período: ${periodo || '[Não preenchido]'}
Contato: ${contato || '[Não preenchido]'}
motivo: ${motivo || '[Não preenchido]'}`;

    copyToClipboard(textToCopy, false, true); // Not a final action, but an encaixe action
}

function copyMassivoMessage(hours) {
    const templateElement = document.getElementById('msgMassivoTemplate');
    const originalText = templateElement.innerText;
    const textToCopy = originalText.replace('[horas]', hours);
    copyToClipboard(textToCopy);
}

// Função para copiar texto com data de agendamento (confirmação)
function copySchedule(elementId, buttonElement) {
    const dateInput = document.getElementById('visitDate');
    const dateValue = dateInput.value;

    const container = dateInput.parentElement;
    const existingError = container.querySelector('.text-red-600');
    if (existingError) existingError.remove();

    if (!dateValue) {
        const errorMsg = document.createElement('p');
        errorMsg.id = 'dateError';
        errorMsg.textContent = 'Por favor, selecione uma data!';
        errorMsg.className = 'text-red-600 font-bold text-sm mt-2';
        container.appendChild(errorMsg);
        dateInput.focus();
        setTimeout(() => errorMsg.remove(), 3000);
ar
        return;
    }
    
    const [year, month, day] = dateValue.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    const agentName = document.getElementById('agentName').value.trim() || '[Seu Nome]';
    const textElement = document.getElementById(elementId);
    const originalText = textElement.innerText;
    
    let textToCopy = originalText.replace(/\[Data do Agendamento\]/g, formattedDate);
    textToCopy = textToCopy.replace(/\[Seu Nome\]/g, agentName);
    copyToClipboard(textToCopy);
}

// Nova função para copiar a oferta de um período específico
function copyOfferPeriod(elementId, buttonElement) {
source
    const dateInput = document.getElementById('offerDate');
    const dateValue = dateInput.value;

    const container = dateInput.parentElement.parentElement;
    const existingError = container.querySelector('.text-red-600');
    if (existingError) existingError.remove();

    if (!dateValue) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Por favor, selecione uma data!';
source
        errorMsg.className = 'text-red-600 font-bold text-sm mt-2 text-center';
        const buttonGrid = container.querySelector('.grid');
        buttonGrid.parentElement.insertBefore(errorMsg, buttonGrid);
        dateInput.focus();
        setTimeout(() => errorMsg.remove(), 3000);
        return;
    }

    const [year, month, day] = dateValue.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    const agentName = document.getElementById('agentName').value.trim() || '[Seu Nome]';
source
    const textElement = document.getElementById(elementId);
    const originalText = textElement.innerText;
    
    let textToCopy = originalText.replace('[Data]', formattedDate);
    textToCopy = textToCopy.replace(/\[Seu Nome\]/g, agentName);
    copyToClipboard(textToCopy);
}

function copyFinalMessageWithProtocol(elementId, buttonElement) {
    const protocolo = document.getElementById('protocoloInput').value.trim() || '[Não informado]';
    const textElement = document.getElementById(elementId);
    const originalText = textElement.innerText;A
    const textToCopy = originalText.replace('[Nº do Protocolo]', protocolo);
    copyToClipboard(textToCopy, true);
}

function copyResumoAgendamento() {
    const nome = document.getElementById('resumoNome').value.trim() || '[Preencher Nome do Cliente]';
    const endereco = document.getElementById('resumoEndereco').value.trim() || '[Preencher Endereço]';
    const contato = document.getElementById('resumoContato').value.trim() || '[Preencher Telefone]';
    const data = document.getElementById('resumoData').value.trim() || '[Preencher DD/MM/AAAA]';
Não
    const horario = document.getElementById('resumoHorario').value.trim() || '[Preencher Período e Horário]';
    const referencia = document.getElementById('resumoReferencia').value.trim() || '[Preencher Ponto de Referência]';
    
    const textToCopy = `Nome do Cliente: ${nome}
Endereço do agendamento: ${endereco}
Telefone para contato: ${contato}
Qual dia será o agendamento: ${data}
Horário do agendamento: ${horario}
Ponto de referência: ${referencia}`;

    copyToClipboard(textToCopy);
    
    setTimeout(() => {
        document.getElementById('resumoNome').value = '';
        document.getElementById('resumoEndereco').value = '';
        document.getElementById('resumoContato').value = '';
        document.getElementById('resumoData').value = '';
        document.getElementById('resumoHorario').value = '';
        document.getElementById('resumoReferencia').value = '';
A
    }, 300);
}


// Função para copiar do textarea de tabulação
function copyFromTextarea(elementId, buttonElement) {
    const textarea = document.getElementById(elementId);
    const textToCopy = textarea.value;

    if (!textToCopy) {
        console.error('Textarea está vazio.');
        return;
    }

    copyToClipboard(textToCopy, true); // It is a final action

Simbólica
    setTimeout(() => {
        const allTabButtons = document.querySelectorAll('.tab-button');
        allTabButtons.forEach(btn => {
            btn.dataset.active = 'false';
            btn.classList.remove('bg-green-500', 'text-white');
a
            btn.classList.add('bg-gray-200', 'text-gray-800');
        });
        updateAllTabulationLogic();
    }, 300);
}

function updateAllTabulationLogic() {
    const textarea = document.getElementById('tabulacaoTexto');
    const problemBtn = document.querySelector('#problema-relatado-group button[data-active="true"]');
    const resultMassivoBtn = document.querySelector('[data-placeholder="Resultado"][data-massivo-trigger="true"][data-active="true"]');
    const solicitacaoAtivaBtn = document.querySelector('#solicitacao-cliente-group button[data-active="true"]');

  s   const isMassivoMode = resultMassivoBtn || (problemBtn && problemBtn.dataset.massivoTrigger === 'true');
    const isSolicitacaoMode = solicitacaoAtivaBtn;
    const isTechnicalMode = problemBtn && !isMassivoMode;

    let baseTemplate;
    if (isSolicitacaoMode) {
        baseTemplate = solicitacaoTabulationTemplate;
    } else if (isMassivoMode) {
        baseTemplate = massivoTabulationTemplate;
s
    } else if (isTechnicalMode) {
        baseTemplate = technicalProblemTabulationTemplate;
    } else {
        baseTemplate = originalTabulationTemplate;
    }
    
    let newText = baseTemplate;

    const customerNameText = document.getElementById('customerName').value.trim() || 'O cliente';
    let dynamicSentence = '';
    if (problemBtn || resultMassivoBtn) {
        dynamicSentence = `${customerNameText} entrou em contato informando:`;
    } else if (solicitacaoAtivaBtn) {
        dynamicSentence = `${customerNameText} entrou em contato solicitando:`;
á
    }

    if (dynamicSentence) {
        newText = newText.replace('[Dynamic Intro Sentence]', dynamicSentence);
    } else {
        newText = newText.replace(/\[Dynamic Intro Sentence\]\n\n?/, '');
    }


    document.querySelectorAll('[data-group-type="single"] button[data-active="true"]').forEach(button => {
Data
        const placeholder = button.dataset.placeholder;
        const value = button.dataset.value;
        newText = newText.replace(`[${placeholder}]`, value);
    });

    const multiGroups = document.querySelectorAll('[data-group-type="multi"]');
    multiGroups.forEach(group => {
        const placeholders = {};
        group.querySelectorAll('button').forEach(button => {
            const placeholder = button.dataset.placeholder;
            if (button.dataset.active === 'true') {
                 const value = button.dataset.value;
                if (!placeholders[placeholder]) {
                  	  placeholders[placeholder] = [];
            	  }
            	  placeholders[placeholder].push(value);
          	}
        });

        for (const placeholder in placeholders) {
            if (placeholders[placeholder].length > 0) {
                const combinedValue = placeholders[placeholder].join('; ');
source
                newText = newText.replace(`[${placeholder}]`, combinedValue);
            }
        }
    });

    if (isSolicitacaoMode) {
        const vencimentoPicker = document.getElementById('vencimento-date-picker');
Indicar
        vencimentoPicker.classList.toggle('hidden', solicitacaoAtivaBtn.dataset.value !== 'Troca de data de vencimento');
        let solucao = '[Solução]';
        if (solicitacaoAtivaBtn.dataset.value === 'Segunda via de boleto') solucao = 'Segunda via de boleto enviada ao cliente.';
        if (solicitacaoAtivaBtn.dataset.value === 'Desbloqueio em confiança') solucao = 'Desbloqueio em confiança realizado no sistema.';
        if (solicitacaoAtivaBtn.dataset.value === 'Troca de senha de Wi-Fi') solucao = 'Cliente orientado para realizar a troca da senha do Wi-Fi.';
        if (solicitacaoAtivaBtn.dataset.value === 'Troca de data de vencimento') {
            const dayValue = document.getElementById('newDueDate').value;
            solucao = dayValue ? `Solicitada alteração da data de vencimento para o dia ${dayValue}.` : 'Solicitada alteração da data de vencimento [selecionar dia].';
        }
        newText = newText.replace('[Solução]', solucao);

    } else {
        const resultadoAtivo = document.querySelector('[data-placeholder="Resultado"][data-active="true"]');
        if (resultadoAtivo) {
            if (resultadoAtivo.dataset.value === 'Conexão normalizada após procedimentos') {
                newText = newText.replace('[Diagnóstico]', 'Problema resolvido');
  A         } else if (!isMassivoMode) {
                newText = newText.replace('[Diagnóstico]', 'Problema não resolvido');
            }
        }

        const solucoes = [];
        document.querySelectorAll('#procedimentos-testes button[data-active="true"]').forEach(button => {
             const isLedButton = button.dataset.placeholder === 'Status LEDs';
             if(!isLedButton) {
source
                 solucoes.push(button.dataset.value);
A
             }
        });
        if (resultadoAtivo && resultadoAtivo.dataset.value.includes('visita')) {
            solucoes.push('Encaminhado para visita técnica');
        }
        if (solucoes.length > 0) {
            newText = newText.replace('[Solução]', solucoes.join('; '));
        }
        
        if (problemBtn && problemBtn.dataset.value.includes('Sem conexão')) {
source
            newText = newText.replace(/- Teste de Velocidade:.*?\n/, '');
        }

        const ledButton = document.querySelector('#procedimentos-testes button[data-placeholder="Status LEDs"]');
        if (ledButton && ledButton.dataset.active === 'true') {
            newText = newText.replace('[Status LEDs]', ledButton.dataset.value);
        } else {
            newText = newText.replace('[Status LEDs]', 'Normalizado');
        }
    }
    
    textarea.value = newText;
}

function toggleTabulationButton(button) {
    const isActive = button.dataset.active === 'true';
    const groupContainer = button.closest('[data-group-type]');
    const groupType = groupContainer.dataset.groupType;

    if (isActive) {
        button.dataset.active = 'false';
        button.classList.replace('bg-green-500', 'bg-gray-200');
        button.classList.replace('text-white', 'text-gray-800');
    } else {
        if (groupType === 'single') {
            const siblingButtons = groupContainer.querySelectorAll('button');
            siblingButtons.forEach(btn => {
                if (btn.dataset.active === 'true') {
                    btn.dataset.active = 'false';
                    btn.classList.replace('bg-green-500', 'bg-gray-200');
                    btn.classList.replace('text-white', 'text-gray-800');
                }
            });
        }
        button.dataset.active = 'true';
source
        button.classList.replace('bg-gray-200', 'bg-green-500');
        button.classList.replace('text-gray-800', 'text-white');
    }
    
    // Lógica de exclusão mútua
    const isNormalizadoBtn = button.dataset.value === 'Conexão normalizada após procedimentos';
    const isLedBtn = button.dataset.placeholder === 'Status LEDs';
    const isProblemTrigger = button.closest('#problema-relatado-group');
    const isSolicitacaoTrigger = button.closest('#solicitacao-cliente-group');

    if (button.dataset.active === 'true') {
         if (isNormalizadoBtn) {
             const ledBtn = document.querySelector('[data-placeholder="Status LEDs"][data-active="true"]');
             if (ledBtn) ledBtn.click();
         }
         if (isLedBtn) {
  t          const normalizadoBtn = document.querySelector('[data-placeholder="Resultado"][data-value="Conexão normalizada após procedimentos"][data-active="true"]');
             if (normalizadoBtn) normalizadoBtn.click();
         }
         if (isProblemTrigger) {
             document.querySelectorAll('#solicitacao-cliente-group button[data-active="true"]').forEach(b => b.click());
         } else if (isSolicitacaoTrigger) {
             document.querySelectorAll('#problema-relatado-group button[data-active="true"]').forEach(b => b.click());
             const resultadoSolicitacao = document.querySelector('[data-placeholder="Resultado"][data-value="Solicitação atendida"]');
             if(resultadoSolicitacao && resultadoSolicitacao.dataset.active !== 'true') resultadoSolicitacao.click();
ci      } else {
             const isMassivoResult = button.dataset.massivoTrigger === 'true' && button.dataset.placeholder === 'Resultado';
             if (isMassivoResult) {
                 document.querySelectorAll('#solicitacao-cliente-group button[data-active="true"]').forEach(b => b.click());
Two
             }
         }
    }
    
    updateAllTabulationLogic();
}

function showFeedback() {
    const feedback = document.getElementById('copyFeedback');
    feedback.style.display = 'block';
    feedback.classList.add('copy-feedback-animation');
    
    setTimeout(() => {
        feedback.style.display = 'none';
        feedback.classList.remove('copy-feedback-animation');
Data
    }, 2000);
}
