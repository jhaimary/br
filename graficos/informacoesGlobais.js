
const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/emissoes-globais.json';

async function vizualizarImpactoAmbientalGlobal() {
    try {
        console.log("Carregando dados...");
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Erro ao carregar os dados: ${res.status} ${res.statusText}`);
        }

        const dados = await res.json();

        // Processamento dos dados
        const emissoesTotais = (dados.total_emissoes / 1e9).toFixed(2); // Em bilhões de toneladas
        const emissoesPerCapita = dados.emissoes_per_capita.toFixed(2); // Toneladas por pessoa
        const aumentoPercentual = ((dados.aumento_anual_percentual || 0) * 100).toFixed(2); // % de aumento

        // Criação do texto dinâmico
        const paragrafo = document.createElement('p');
        paragrafo.classList.add('graficos-container__texto');
        paragrafo.innerHTML = `
            Você sabia que as emissões globais de gases de efeito estufa atingiram 
            <span>${emissoesTotais} bilhões</span> de toneladas no último ano?<br>
            Isso equivale a uma média de <span>${emissoesPerCapita} toneladas</span> por pessoa.<br>
            As emissões aumentaram aproximadamente <span>${aumentoPercentual}%</span> 
            em comparação ao ano anterior. Esses dados destacam a urgência de ações para reduzir 
            o impacto ambiental.`;

        // Adicionando o parágrafo ao container
        const container = document.getElementById('graficos-container');
        if (!container) {
            throw new Error("Elemento com ID 'graficos-container' não encontrado no DOM.");
        }
       
