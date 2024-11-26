import { getCSS, tickConfig, criarGrafico } from "./common.js";

async function impactoAmbientalPorSetor() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/emissoes-setores.json'; // Exemplo de URL para dados sobre emissões

    try {
        console.log("Carregando dados...");
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Erro ao carregar os dados: ${res.status} ${res.statusText}`);
        }

        const dados = await res.json();
        const setores = Object.keys(dados);
        const emissoes = Object.values(dados);

        if (!setores.length || !emissoes.length) {
            throw new Error("Os dados carregados estão vazios ou inválidos.");
        }

        const data = [
            {
                x: setores,
                y: emissoes,
                type: 'bar',
                marker: {
                    color: getCSS('--primary-color'),
                }
            }
        ];

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Emissões de Gases de Efeito Estufa por Setor',
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
                    text: 'Emissões (em milhões de toneladas de CO₂ equivalente)',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            }
        };

        criarGrafico(data, layout);
    } catch (error) {
        console.error("Erro ao carregar ou processar os dados:", error);
        alert("Ocorreu um erro ao carregar as informações. Por favor, tente novamente mais tarde.");
    }
}

impactoAmbientalPorSetor();
