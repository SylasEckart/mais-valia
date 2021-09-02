if(window.ativado) console.log("reset")
else{
    
    chrome.storage.sync.get(['options'], function(items) {
        const
            options = JSON.parse(items.options)
            console.log(items)

        if(options){
            window.localStorage.setItem('salario',options.salario || "") 
            window.localStorage.setItem('horas-dia',options["horas-dia"] || "")
            window.localStorage.setItem('horas-semana',options["horas-semana"] || '')  
        }
        console.log(window.localStorage)
    });
    window.ativado = true
    let 
        mutationCounter = 0,
        horasPorDia = window.localStorage.getItem('horas-dia') || 8,
        salario = window.localStorage.getItem('salario') ? parseFloat(window.localStorage.getItem('salario').replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.')).toFixed(0) : 1100,
        horasSemanais = window.localStorage.getItem('horas-semana') || 40,
        totalSemanas = 4.5,   
        minutoSalario = () =>  ((salario / (horasSemanais * totalSemanas) ) / 60),
        observeDOM = () => {
            let MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
                eventListenerSupported = window.addEventListener

            return (obj, callback) => {
                if(obj && obj.nodeType){
                    if( MutationObserver ){
                        let disableObserver = false;
                        let obs = new MutationObserver(function(mutations, observer){
                            if( mutations[0].addedNodes.length || mutations[0].removedNodes.length ){
                                mutations.forEach(mutation => {
                                    if (mutation.addedNodes && !disableObserver) {
                                        [].slice.call(mutation.addedNodes).forEach(node => {
                                            nodeHTML = node.innerHTML
                                            reais = 'R$'
                                            reais_extenso = 'reais'
                                            if (nodeHTML && (nodeHTML.indexOf(reais) !== -1)) {
                                                disableObserver = true
                                                substituiValores("*")
                                                disableObserver = false
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        obs.observe( obj, { childList:true, subtree:true })
                    }    
                }   
            }
        },
        detectaSufixo = sufixo =>{
            switch (sufixo) {
                case "mil":
                    sufixo_numero = 1000;
                    break;
                case "mi":
                    sufixo_numero = 1000000;
                    break;
                case "milhão":
                    sufixo_numero = 1000000;
                    break;
                case "milhões":
                    sufixo_numero = 1000000;
                    break;
                case "bi":
                    sufixo_numero = 1000000000;
                    break;
                case "bilhão":
                    sufixo_numero = 1000000000;
                    break;
                case "bilhões":
                    sufixo_numero = 1000000000;
                    break;
                case "tri":
                    sufixo_numero = 1000000000000;
                    break;
                case "trilhão":
                    sufixo_numero = 1000000000000;
                    break;
                case "trilhões":
                    sufixo_numero = 1000000000000;
                    break;
                default:
                    sufixo_numero = 1;
            }
            return sufixo_numero;
        },
        tempoSalario = valor_final=> {
        let totalhoras
        if(!isNaN(valor_final)){
            tempo_salario = (valor_final / minutoSalario());
            tempo_salario_sufixo = 'minutos';
            if (tempo_salario < 1) {
                tempo_salario_segundos = (tempo_salario * 60).toFixed(0);
                if (tempo_salario_segundos == 0) {
                    tempo_salario = (tempo_salario * 60 * 1000).toFixed(0);
                    if (tempo_salario != 1)
                        tempo_salario_sufixo = 'milisegundos';
                    else
                        tempo_salario_sufixo = 'milisegundo';
                } else {
                    tempo_salario = tempo_salario_segundos;
                    if (tempo_salario != 1)
                        tempo_salario_sufixo = 'segundos';
                    else
                        tempo_salario_sufixo = 'segundo';
                }
            } else if (tempo_salario >= 60) {
                tempo_salario = (tempo_salario / 60).toFixed(0);
                if (tempo_salario != 1)
                    tempo_salario_sufixo = 'horas';
                else
                    tempo_salario_sufixo = 'hora';
                if (tempo_salario >= horasPorDia) {
                    totalhoras = tempo_salario
                    tempo_salario = (tempo_salario / horasPorDia).toFixed(0);
                    
                    if (tempo_salario != 1)
                        tempo_salario_sufixo = 'dias';
                    else
                        tempo_salario_sufixo = 'dia';
                    if (tempo_salario >= 365) {
                        tempo_salario = (tempo_salario / 365).toFixed(0);
                        if (tempo_salario != 1)
                            tempo_salario_sufixo = 'anos';
                        else
                            tempo_salario_sufixo = 'ano';

                    }
                }
            } else {
                tempo_salario = tempo_salario.toFixed(0);
                if (tempo_salario == 1) tempo_salario_sufixo = 'minuto';
            }
            total_calculado_valor = tempo_salario.replace(".", ",") + " " ;
            total_calculado = totalhoras ? total_calculado_valor + tempo_salario_sufixo + ' ou ' + totalhoras+ " horas de trabalho " : total_calculado_valor + tempo_salario_sufixo 
            return total_calculado;    
        }
        },
        substituiValores = function(evt) {
            jQuery(evt).not('script').not('style').not('iframe').not('canvas').not('input').not('textarea').contents().each(function() {
                if (this.nodeType == 3) {                 
                    var u = this.nodeValue;
                    var reais = 'R$';
                    var reais_extenso = 'reais';
                    if (u.indexOf(reais) !== -1) {
                        
                        var total_preco = u.split("R$");
                        var calculou = 0;
                        for (var k = 0; k < total_preco.length - 1; k++) {
                            var valores = total_preco[k + 1];
                            if (valores[0] == ' ') {
                                valores = valores.slice(1);
                                espaco = ' ';
                            } else {
                                espaco = '';
                            }
                                if (valores.indexOf(" ") == -1) {
                                    var total_sufixo = new Array();
                                    total_sufixo[0] = valores;
                                    total_sufixo[1] = '';
                                }else{
                                    var total_sufixo = valores.split(" ");
                                }                                
                                    var prefixo_sem_pontuacao = total_sufixo[0].replace(/\b[-.,;()&$#!?\[\]{}""“”']+\B|\B[-.,;()&$#!?\[\]{}"“”']+\b/g, "");
                                    string_a_substituir = reais + espaco + prefixo_sem_pontuacao;
                                    var sufixo_sem_pontuacao = total_sufixo[1].replace(/\b[-.,;()&$#!?\[\]{}""“”']+\B|\B[-.,;()&$#!?\[\]{}"“”']+\b/g, "");
                                    var sufixo = sufixo_sem_pontuacao.toLowerCase().trim();

                                sufixo_numero = detectaSufixo(sufixo);
                                if (sufixo_numero != 1) {
                                    string_a_substituir = string_a_substituir + " " + sufixo_sem_pontuacao;
                                }
                                var valor_financeiro = total_sufixo[0].replace(/\./g, "").replace(/,/g, ".");
                                valor_financeiro = parseFloat(valor_financeiro);
                                var valor_final = valor_financeiro * sufixo_numero;
                                tempo_salario = tempoSalario(valor_final);

                                if (typeof tempo_salario !== 'undefined' && !isNaN(valor_financeiro)) {
                                    span_calculado = '<bdi class="tempoSalario" title="' + string_a_substituir + '">' + total_calculado + '</bdi>';
                                    replacedText = u.replace(string_a_substituir, span_calculado);
                                    u = replacedText;
                                    calculou = 1;
                                }
                            
                        }
                        if(calculou){
                            this.outerHTML = replacedText
                            jQuery(this).replaceWith(replacedText);
                        }
                    } else if (u.indexOf(reais_extenso) !== -1) {
                        var total_preco = u.split("reais");
                        var calculou = 0;
                        for (var k = 0; k < total_preco.length - 1; k++) {
                            var valores = total_preco[k].trim();
                            if (valores.indexOf(" ") !== -1) {
                                var total_sufixo = valores.split(" ");
                                var checa_ultimo = total_sufixo[total_sufixo.length - 1];
                                if (isNaN(checa_ultimo)) {
                                    if (checa_ultimo.toLowerCase() == 'de') {
                                        conectivo = ' de';
                                        sufixo = total_sufixo[total_sufixo.length - 2];
                                        valor_financeiro = total_sufixo[total_sufixo.length - 3];
                                    } else {
                                        conectivo = '';
                                        sufixo = checa_ultimo;
                                        valor_financeiro = total_sufixo[total_sufixo.length - 2];
                                    }
                                } else {
                                    conectivo = '';
                                    sufixo = '';
                                    valor_financeiro = checa_ultimo;
                                }
                            } else if (!isNaN(valores)) {
                                sufixo = '';
                                conectivo = '';
                                valor_financeiro = valores;
                            }
                            sufixo_final = sufixo.toLowerCase().trim();
                            sufixo_numero = detectaSufixo(sufixo_final);
                            var valor_final = valor_financeiro * sufixo_numero;

                            tempo_salario = tempoSalario(valor_final);
                            if (sufixo != '')
                                string_a_substituir = valor_financeiro + ' ' + sufixo + conectivo + ' ' + reais_extenso;
                            else
                                string_a_substituir = valor_financeiro + ' ' + reais_extenso;
                            if (typeof tempo_salario !== 'undefined' && !isNaN(valor_financeiro)) {
                                    span_calculado = '<bdi class="tempoSalario" title="' + string_a_substituir + '">' + total_calculado + '</bdi>';
                                    replacedText = u.replace(string_a_substituir, span_calculado);
                                    u = replacedText;
                                    calculou = 1;
                            }
                        }
                        if(calculou){
                            this.outerHTML = replacedText
                            jQuery(this).replaceWith(replacedText);
                        }
                    }
                }
            })      
        }

    jQuery(document).ready(function(){
        substituiValores('*');
    })

    observeDOM(document.body)
}
