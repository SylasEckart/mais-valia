

function getSufixOfCurrency(sufix){
    switch (sufix) {
        case "mil":
            return 1000;
        case "mi":
            return 1000000;
        case "milhão":
            return 1000000;
        case "milhões":
            return 1000000;
        case "bi":
            return 1000000000;
        case "bilhão":
            return 1000000000;
        case "bilhões":
            return 1000000000;
        case "tri":
            return 1000000000000;
        case "trilhão":
            return 1000000000000;
        case "trilhões":
            return 1000000000000;
        default:
            return 1;
    }
}




function getHoursPerDay(){

    return Number(window.localStorage.getItem('horas-dia') || 8)
}

function getHoursPerWeek(){

    return Number(window.localStorage.getItem('horas-semana') || 40)
}


function getSalary(){

    if(window.localStorage.getItem('salario')){
        return parseFloat(window.localStorage.getItem('salario')
            .replace(/[^0-9,.]/g, '')
            .replace(/[.]/g, '')
            .replace(',', '.'))
            .toFixed(0);
    }

    return 1100;
}


function salaryPerMinute(){

    let salary = getSalary();
    let hoursPerWeek = getHoursPerWeek();
    let totalWeek = 4.5;

    return (salary / (hoursPerWeek * totalWeek) ) / 60
}




function getSalarySufix(tempo_salario){

    let horasPorDia = getHoursPerDay();

    if (tempo_salario < 1) {

        let tempo_salario_segundos = Number((tempo_salario * 60).toFixed(0));

        if (tempo_salario_segundos === 0) {
            tempo_salario = (tempo_salario * 60 * 1000).toFixed(0);
            if (tempo_salario !== 1){
                return 'milisegundos';
            }

            return 'milisegundo';
        }

        tempo_salario = tempo_salario_segundos;
        if (tempo_salario !== 1){
            return  'segundos';
        }

        return  'segundo';
    }

    if (tempo_salario >= 60) {

        tempo_salario = Number((tempo_salario / 60).toFixed(0));

        if (tempo_salario >= horasPorDia) {

            tempo_salario = Number((tempo_salario / horasPorDia).toFixed(0));

            if (tempo_salario >= 365) {

                tempo_salario = Number((tempo_salario / 365).toFixed(0));

                if (tempo_salario !== 1){
                    return 'anos';
                }

                return 'ano';
            }

            if (tempo_salario !== 1){
                return 'dias';
            }

            return 'dia';
        }


        if (tempo_salario !== 1){
            return 'horas';
        }

        return 'hora';
    }

    tempo_salario = tempo_salario.toFixed(0);

    if (tempo_salario === 1){
        return 'minuto';
    }
}


function timeSalary(valor_final) {

    let totalhoras;

    if (!isNaN(valor_final)) {
        let tempo_salario = (valor_final / salaryPerMinute());
        let tempo_salario_sufixo = 'minutos';

        let total_calculado_valor = tempo_salario.replace(".", ",") + " ";
        let total_calculado = totalhoras ? total_calculado_valor + tempo_salario_sufixo + ' ou ' + totalhoras + " horas de trabalho " : total_calculado_valor + tempo_salario_sufixo;
        return total_calculado;
    }
}


module.exports = {

    getSufixOfCurrency: getSufixOfCurrency(),
    getHoursPerDay: getHoursPerDay(),
    getHoursPerWeek: getHoursPerWeek(),
    getSalary: getSalary(),
    salaryPerMinute: salaryPerMinute(),
    getSalarySufix: getSalarySufix(),
    timeSalary: timeSalary()
};
