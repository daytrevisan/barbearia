document.addEventListener('DOMContentLoaded', () => {

    // Cache de Elementos (DOM)

    const mesAnoLabel = document.querySelector('.mes-ano');
    const tabelaCorpo = document.querySelector('.tabela-calendario tbody');

    const btnAnterior = document.querySelectorAll('.cal-btn')[0];
    const btnProximo = document.querySelectorAll('.cal-btn')[1];

    const formAgendamento = document.getElementById('form-agendamento');
    const selectUnidade = document.getElementById('unidade');

    const modalConfirmacao = document.getElementById('modal-confirmacao');
    const btnFecharModal = document.getElementById('fechar-modal');
    
    const modalErro = document.getElementById('modal-erro');
    const btnFecharModalErro = document.getElementById('fechar-modal-erro');
    
    const gridHorarios = document.querySelector('.grid-horarios');

    // Estado da Aplicação

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Hoje
    const hoje = new Date();
    let anoHoje = hoje.getFullYear();
    let mesHoje = hoje.getMonth();
    let diaHoje = hoje.getDate();
    // let diaSemanaHoje = hoje.getDay();
    // const validaDomingo = new Date(ano, mes, dia).getDay();
    // let horaHoje = hoje.getHours();

    // Dia/hora selecionados
    // const dataSelecionada = new Date();
    let anoSelecionado = anoHoje;
    let mesSelecionado = mesHoje;
    let diaSelecionado = diaHoje;
    let horarioSelecionado = "";

    // Funções utilitárias (Modais)

    function abrirModal(modal) {
        if (modal) modal.style.display = 'flex';
    }

    function fecharModal(modal) {
        if (modal) modal.style.display = 'none';
    }

    // Geração do Calendário

    function gerarCalendario(mes, ano) {

        tabelaCorpo.innerHTML = '';
        mesAnoLabel.textContent = `${meses[mes]} ${ano}`;

        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
        const maxSemanasMes = 6; // Máximo semanas possíveis no mês
        const totalDiasSemana = 7;
        const totalDiasMes = new Date(ano, mes + 1, 0).getDate(); // Último dia mês atual

        // const primeiroDiaMes = new Date().getDate();
        // const ultimoDiaMes = totalDiasMes;
        let contadorDia = 1;

        for (let semanaCalendario = 0; semanaCalendario < maxSemanasMes; semanaCalendario++) {
            const semana = document.createElement('tr');

            for (let diaSemanaCalendario = 0; diaSemanaCalendario < totalDiasSemana; diaSemanaCalendario++) {
                const dia = document.createElement('td');
                
                // Dias do mês anterior
                if (semanaCalendario === 0 && diaSemanaCalendario < primeiroDiaSemana) {
                    dia.classList.add('dia-vazio');

                // Dias do mês corrente  
                } else if (contadorDia <= totalDiasMes) {
                    dia.textContent = contadorDia;

                    const diaAtualLoop = contadorDia;

                    // Dias passados
                    if(
                        (ano < anoHoje) ||
                        (ano === anoHoje && mes < mesHoje) ||
                        (ano === anoHoje && mes === mesHoje && contadorDia <= diaHoje)
                    ) {
                        dia.classList.add('dia-invalido')
                    }
                    
                    // Domingos
                    const diaSemana = new Date(ano, mes, contadorDia).getDay();
                    if (diaSemana === 0) {
                        dia.classList.add('dia-invalido');
                    }

                    dia.addEventListener('click', () => {
                        document
                        .querySelectorAll('.tabela-calendario td')
                        .forEach(td => td.classList.remove('dia-selecionado'));

                        dia.classList.add('dia-selecionado');

                        diaSelecionado = `${diaAtualLoop} de ${meses[mes]} de ${ano}`;
                    });

                    contadorDia++;

                } else if (contadorDia > totalDiasMes) {
                    dia.classList.add('dia-vazio');
                }    
                    
                semana.appendChild(dia);
            }

            tabelaCorpo.appendChild(semana);            
            
        }
        
    }

    // Navegação pelos meses

    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
        
            if (anoSelecionado > anoHoje || (anoSelecionado === anoHoje && mesSelecionado > mesHoje)) {
                mesSelecionado--;

                if (mesSelecionado < 0) {
                    mesSelecionado = 11;
                    anoSelecionado--;
                }

                gerarCalendario(mesSelecionado, anoSelecionado);
            }

        });
    }

    if (btnProximo) {
        btnProximo.addEventListener('click', () => {
            
            if(mesSelecionado <= 6) {
                mesSelecionado++;

                if (mesSelecionado > 11) {
                    mesSelecionado = 0;
                    anoSelecionado++;
                }
    
                gerarCalendario(mesSelecionado, anoSelecionado);
            }

        });
    }

    // Seleção de horários

    if (gridHorarios) {

        gridHorarios.addEventListener('click', (e) => {

            if (e.target.classList.contains('btn-horario')) {

                document
                .querySelectorAll('.btn-horario')
                .forEach(b => b.classList.remove('horario-selecionado'));

                e.target.classList.add('horario-selecionado');
                horarioSelecionado = e.target.textContent;
            }
        });
    }

    // Submit e Validação

    if (formAgendamento) {

        formAgendamento.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const unidade = selectUnidade.options[selectUnidade.selectedIndex].text;

            // Validação
            if (!diaSelecionado || !horarioSelecionado) {
                abrirModal(modalErro);
                return               
            }

            // Preencher resumo Agendamento
            document.getElementById('resumo-nome').textContent = nome;
            document.getElementById('resumo-unidade').textContent = unidade;
            document.getElementById('resumo-data').textContent = diaSelecionado;
            document.getElementById('resumo-horario').textContent = horarioSelecionado;

            // Mostrar confirmação
            abrirModal(modalConfirmacao);
        });
    }

    // Fechar modais

    if (btnFecharModalErro) {
        btnFecharModalErro.addEventListener('click', () => {
            fecharModal(modalErro);
        });
    }

    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Fechar ao clicar fora do conteúdo do modal de confirmação
    if (modalConfirmacao) {
        modalConfirmacao.addEventListener('click', (e) => {
            if (e.target === modalConfirmacao) {
                modalConfirmacao.style.display = 'none';
            }
        });
    }

    // Renderização Calendário
    gerarCalendario(mesSelecionado, anoSelecionado);
    
});
