document.addEventListener('DOMContentLoaded', () => {
    const mesAnoElement = document.querySelector('.mes-ano');
    const tabelaCorpo = document.querySelector('.tabela-calendario tbody');
    const btnAnterior = document.querySelectorAll('.cal-btn')[0];
    const btnProximo = document.querySelectorAll('.cal-btn')[1];
    const selectUnidade = document.getElementById('unidade');
    const formAgendamento = document.getElementById('form-agendamento');
    const modalConfirmacao = document.getElementById('modal-confirmacao');
    const btnFecharModal = document.getElementById('fechar-modal');

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let mesAtual = 0; // Janeiro
    const anoAtual = 2026;
    let diaSelecionado = null;
    let horarioSelecionado = null;

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
                    const diaAtualLoop = data;
                    celula.addEventListener('click', () => {
                        document.querySelectorAll('.tabela-calendario td').forEach(td => td.classList.remove('dia-selecionado'));
                        celula.classList.add('dia-selecionado');
                        diaSelecionado = `${diaAtualLoop} de ${meses[mes]} de ${ano}`;
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

    // Lógica para seleção de horários
    const botoesHorario = document.querySelectorAll('.btn-horario');
    botoesHorario.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesHorario.forEach(b => b.classList.remove('horario-selecionado'));
            botao.classList.add('horario-selecionado');
            horarioSelecionado = botao.textContent;
        });
    });

    // Lógica de Finalização (Modal)
    formAgendamento.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const unidade = selectUnidade.options[selectUnidade.selectedIndex].text;

        if (!diaSelecionado || !horarioSelecionado) {
            alert('Por favor, selecione um dia e um horário antes de finalizar.');
            return;
        }

        // Preencher resumo no modal
        document.getElementById('resumo-nome').textContent = nome;
        document.getElementById('resumo-unidade').textContent = unidade;
        document.getElementById('resumo-data').textContent = diaSelecionado;
        document.getElementById('resumo-horario').textContent = horarioSelecionado;

        // Mostrar modal
        modalConfirmacao.style.display = 'flex';
    });

    // Fechar modal e redirecionar
    btnFecharModal.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Fechar ao clicar fora do conteúdo do modal
    modalConfirmacao.addEventListener('click', (e) => {
        if (e.target === modalConfirmacao) {
            window.location.href = 'index.html';
        }
    });

    gerarCalendario(mesAtual, anoAtual);
});
