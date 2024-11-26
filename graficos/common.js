const getCSS = (variavel) => {
    return getComputedStyle(document.body).getPropertyValue(variavel).trim();
};

const tickConfig = {
    color: getCSS('--primary-color'),
    size: 16,
    family: getCSS('--font')
};

function criarGrafico(data, layout, extraClass = '') {
    const container = document.getElementById('graficos-container');
    if (!container) {
        console.error("Elemento com ID 'graficos-container' não encontrado.");
        return;
    }

    const grafico = document.createElement('div');
    grafico.className = `grafico ${extraClass}`.trim();
    container.appendChild(grafico);

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot(grafico, data, layout, config);
}

function incluirTexto(texto, extraClass = '') {
    const container = document.getElementById('graficos-container');
    if (!container) {
        console.error("Elemento com ID 'graficos-container' não encontrado.");
        return;
    }

    const paragrafo = document.createElement('p');
    paragrafo.className = `graficos-container__texto ${extraClass}`.trim();
    paragrafo.innerHTML = texto;
    container.appendChild(paragrafo);
}

// Exemplo: Exibindo informações sobre impacto ambiental
async function exibirImpactoAmbiental() {
    try {
        const emissoes = {
            "Transporte": 3500,
            "Indústria": 4200,
            "Agricultura": 5100,
            "Energia": 6300,
            "Resíduos": 1200
        };

        const setores = Object.keys(emissoes);
        const valores = Object.values(emissoes);

        // Criar gráfico de barras
        const data = [
            {
                x: setores,
                y: valores,
                type: 'bar',
                marker: {
                    color: getCSS('--primary-color')
                }
            }
        ];

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Emissões Globais de Gases de Efeito Estufa por Setor',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    family: getCSS('--font'),
                    size: 30
                }
            },
            xaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Setores Econômicos',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            },
            yaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Emissões (milhões de toneladas de CO₂e)',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            }
        };

        criarGrafico(data, layout);

        // Adicionar texto explicativo
        incluirTexto(
            `As emissões globais de gases de efeito estufa são impulsionadas principalmente pelos setores de <span>energia</span> e <span>indústria</span>, 
            responsáveis por grande parte das emissões totais. A redução dessas emissões é essencial para limitar o aquecimento global a níveis sustentáveis.`,
            'impacto-texto'
        );
    } catch (error) {
        console.error("Erro ao gerar gráfico de impacto ambiental:", error);
    }
}

exibirImpactoAmbiental();

export { getCSS, tickConfig, criarGrafico, incluirTexto };
