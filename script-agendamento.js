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

    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            if (mesAtual > 0) {
                mesAtual--;
                gerarCalendario(mesAtual, anoAtual);
            }
        });
    }

    if (btnProximo) {
        btnProximo.addEventListener('click', () => {
            if (mesAtual < 11) {
                mesAtual++;
                gerarCalendario(mesAtual, anoAtual);
            }
        });
    }

    // Lógica para seleção de horários
    const gridHorarios = document.querySelector('.grid-horarios');
    if (gridHorarios) {
        gridHorarios.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-horario')) {
                document.querySelectorAll('.btn-horario').forEach(b => b.classList.remove('horario-selecionado'));
                e.target.classList.add('horario-selecionado');
                horarioSelecionado = e.target.textContent;
            }
        });
    }

    // Lógica de Finalização (Modal)
    if (formAgendamento) {
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
            if (modalConfirmacao) {
                modalConfirmacao.style.display = 'flex';
            }
        });
    }

    // Fechar modal e redirecionar
    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Fechar ao clicar fora do conteúdo do modal
    if (modalConfirmacao) {
        modalConfirmacao.addEventListener('click', (e) => {
            if (e.target === modalConfirmacao) {
                modalConfirmacao.style.display = 'none';
            }
        });
    }

    gerarCalendario(mesAtual, anoAtual);
});
