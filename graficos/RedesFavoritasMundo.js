import { getCSS, criarGrafico, incluirTexto } from "./common.js";

async function fontesDeEmissoesGlobais() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/emissoes-por-setor.json';
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Erro ao carregar os dados: ${res.statusText}`);
        }

        const dados = await res.json();
        const setores = Object.keys(dados);
        const valores = Object.values(dados);

        const data = [
            {
                values: valores,
                labels: setores,
                type: 'pie',
                textinfo: 'label+percent',
                marker: {
                    colors: [
                        getCSS('--color-energy'),
                        getCSS('--color-transport'),
                        getCSS('--color-industry'),
                        getCSS('--color-agriculture'),
                        getCSS('--color-waste')
                    ]
                }
            }
        ];

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            height: 700,
            title: {
                text: 'Fontes de Emissões de Gases de Efeito Estufa',
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

        incluirTexto(`
            O gráfico destaca as principais fontes de emissões globais de gases de efeito estufa. 
            A <span>energia</span> lidera como a maior responsável, contribuindo significativamente para o aquecimento global. 
            Seguem <span>indústria</span> e <span>agricultura</span> como outros grandes emissores. 
            Reduzir essas emissões é essencial para mitigar as mudanças climáticas e proteger o planeta.
        `);
    } catch (error) {
        console.error("Erro ao carregar ou processar os dados:", error);
        incluirTexto(`Houve um problema ao carregar os dados sobre emissões. Tente novamente mais tarde.`);
    }
}

fontesDeEmissoesGlobais();
