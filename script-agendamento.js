document.addEventListener('DOMContentLoaded', () => {
    const mesAnoElement = document.querySelector('.mes-ano');
    const tabelaCorpo = document.querySelector('.tabela-calendario tbody');
    const btnAnterior = document.querySelectorAll('.cal-btn')[0];
    const btnProximo = document.querySelectorAll('.cal-btn')[1];
    const selectUnidade = document.getElementById('unidade');

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let mesAtual = 0; // Janeiro
    const anoAtual = 2026;

    function gerarCalendario(mes, ano) {
        tabelaCorpo.innerHTML = '';
        mesAnoElement.textContent = `${meses[mes]} ${ano}`;

        const primeiroDia = new Date(ano, mes, 1).getDay();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        let data = 1;
        for (let i = 0; i < 6; i++) {
            let linha = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                let celula = document.createElement('td');
                if (i === 0 && j < primeiroDia) {
                    celula.classList.add('dia-vazio');
                } else if (data > diasNoMes) {
                    if (j === 0 && data > diasNoMes) break; 
                    celula.classList.add('dia-vazio');
                } else {
                    celula.textContent = data;
                    celula.addEventListener('click', () => {
                        document.querySelectorAll('.tabela-calendario td').forEach(td => td.classList.remove('dia-selecionado'));
                        celula.classList.add('dia-selecionado');
                    });
                    data++;
                }
                linha.appendChild(celula);
            }
            tabelaCorpo.appendChild(linha);
            if (data > diasNoMes) break;
        }
    }

    btnAnterior.addEventListener('click', () => {
        if (mesAtual > 0) {
            mesAtual--;
            gerarCalendario(mesAtual, anoAtual);
        }
    });

    btnProximo.addEventListener('click', () => {
        if (mesAtual < 11) {
            mesAtual++;
            gerarCalendario(mesAtual, anoAtual);
        }
    });

    // Lógica para selecionar unidade via URL
    const urlParams = new URLSearchParams(window.location.search);
    const unidadeParam = urlParams.get('unidade');
    if (unidadeParam && selectUnidade) {
        for (let i = 0; i < selectUnidade.options.length; i++) {
            if (selectUnidade.options[i].value.toLowerCase() === unidadeParam.toLowerCase()) {
                selectUnidade.selectedIndex = i;
                break;
            }
        }
    }

    gerarCalendario(mesAtual, anoAtual);
});
