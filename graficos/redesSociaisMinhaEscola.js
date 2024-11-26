import { criarGrafico, getCSS, incluirTexto } from "./common.js";

const CACHE_KEY = 'impactoAmbientalDados';
const CACHE_EXPIRACAO = 86400000; // 1 dia em milissegundos

function salvarDadosComExpiracao(chave, dados) {
    const item = {
        valor: dados,
        timestamp: Date.now()
    };
    localStorage.setItem(chave, JSON.stringify(item));
}

function obterDadosComExpiracao(chave) {
    const itemString = localStorage.getItem(chave);
    if (!itemString) return null;

    const item = JSON.parse(itemString);
    if (Date.now() - item.timestamp > CACHE_EXPIRACAO) {
        localStorage.removeItem(chave);
        return null;
    }

    return item.valor;
}

async function impactoAmbientalDados() {
    try {
        let dados = obterDadosComExpiracao(CACHE_KEY);

        if (!dados) {
            console.log("Carregando dados da API...");
            const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=EXEMPLO_DE_URL&lib=EXEMPLO_DE_LIB';
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Erro ao carregar dados: ${res.statusText}`);
            }

            dados = await res.json();
            salvarDadosComExpiracao(CACHE_KEY, dados);
        } else {
            console.log("Carregando dados do cache...");
        }

        processarDadosImpactoAmbiental(dados);
    } catch (error) {
        console.error("Erro ao obter ou processar os dados:", error);
        incluirTexto("Ocorreu um erro ao carregar as informações. Tente novamente mais tarde.");
    }
}

function processarDadosImpactoAmbiental(dados) {
    if (!Array.isArray(dados) || dados.length === 0) {
        console.error("Os dados obtidos são inválidos.");
        incluirTexto("Nenhum dado disponível para exibir o impacto ambiental.");
        return;
    }

    const impactos = dados.slice(1).map(item => item[1]).filter(Boolean);
    const contagemImpactos = impactos.reduce((acc, impacto) => {
        acc[impacto] = (acc[impacto] || 0) + 1;
        return acc;
    }, {});

    if (Object.keys(contagemImpactos).length === 0) {
        console.warn("Nenhum impacto ambiental foi encontrado nos dados.");
        incluirTexto("Nenhum dado disponível sobre o impacto ambiental.");
        return;
    }

    criarGraficoImpactoAmbiental(contagemImpactos);
}

function criarGraficoImpactoAmbiental(contagemImpactos) {
    const valores = Object.values(contagemImpactos);
    const labels = Object.keys(contagemImpactos);

    const data = [
        {
            values: valores,
            labels: labels,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ];

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 700,
        title: {
            text: 'Principais Impactos Ambientais Identificados',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30
            }
        },
        legend: {
            font: {
                color: getCSS('--primary-color'),
                size: 16
            }
        }
    };

    criarGrafico(data, layout);
    incluirTexto(`O gráfico acima mostra os impactos ambientais mais frequentes, baseados em dados coletados.`);
}

impactoAmbientalDados();
