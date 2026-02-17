function debugCalendario(mes, ano) {

    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const totalDiasMes = new Date(ano, mes + 1, 0).getDate();

    console.log("Primeiro dia semana:", primeiroDiaSemana);
    console.log("Total dias mês:", totalDiasMes);

    let contadorDia = 1;

    for (let semana = 0; semana < 6; semana++) {

        let linha = "";

        for (let diaSemana = 0; diaSemana < 7; diaSemana++) {

            if (semana === 0 && diaSemana < primeiroDiaSemana) {
                linha += " - ";
            } 
            else if (contadorDia > totalDiasMes) {
                break;
            } 
            else {
                linha += String(contadorDia).padStart(2,"0") + " ";
                contadorDia++;
            }
        }

        console.log(linha);

        if (contadorDia > totalDiasMes) break;
    }
}

debugCalendario(0, 2026);