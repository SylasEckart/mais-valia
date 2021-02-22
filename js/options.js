const
  save = document.querySelector('#save-button'),
  salario = document.querySelector('.salario'),
  horasDia = document.querySelector('.horasDia'),
  horasSemana = document.querySelector('.horasSemana'),
  status = document.querySelector('#status'),
  setValues = array => array.map(({value,name})=> window.localStorage.setItem(name,value)),
  retrieveValues = ()=>{
    const
      localStorage = window.localStorage

    if(localStorage.getItem('salario')) salario.value = localStorage.getItem('salario')
    if(localStorage.getItem('horas-dia')) horasDia.value = localStorage.getItem('horas-dia')
    if(localStorage.getItem('horas-semana')) horasSemana.value = localStorage.getItem('horas-semana')

  },
  bindEvents = () => {

    save.addEventListener('click',()=>{
      const
        valores = Array.from(document.querySelectorAll('input')).map(({value,name})=>(value ? {value,name} : undefined))
        if(valores.some(i=>!i)) {
          setValues(valores.map(i=>i))
          status.textContent = "Favor preencha todos os campos para o correto funcionamento"
          status.classList.add("error")
        }
        else{
          setValues(valores)
          status.textContent = "Reinicie a página limpando o cache (ctrl+shift+r) para validar as alterações"
          status.classList.remove("error")
        }

        chrome.storage.sync.set({'options':JSON.stringify(window.localStorage)}, function() {
          console.log('Settings saved');
        });    
    })

    salario.addEventListener('keyup',()=>{

    
      let
        valor = salario.value || 0

      valor = valor + ''
      
      valor = parseInt(valor.replace(/[\D]+/g,''))
      if(isNaN(valor)) valor = 0
      valor = valor + ''
      
      valor = valor.replace(/([0-9]{2})$/g, ",$1")

      if (valor.length > 6)  valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

      salario.value = valor
    })

  }

retrieveValues()

bindEvents()