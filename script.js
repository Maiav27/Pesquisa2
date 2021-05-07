let pesquisa = {}
let carboidratosA = []


const salvar = (campo,event) =>{
  
    pesquisa = JSON.parse(localStorage.getItem('pesquisa'))
   
      
    if(event.target.type == 'checkbox' ){
        if(!pesquisa.carboidratos   ){
             
                pesquisa = {...pesquisa, [campo] : [   event.target.value]}
                localStorage.setItem('pesquisa', JSON.stringify(pesquisa))
        } else{ 
          carboidratosA = pesquisa.carboidratos
    
          let found = carboidratosA.find( elemento => elemento == event.target.value) 
          
          if(found){
           console.log(found)
            carboidratosA =  carboidratosA.filter(elemento => elemento !=  found )
            console.log('ta entrando', carboidratosA)
            pesquisa = {...pesquisa, carboidratos :  carboidratosA}
           console.log(pesquisa.carboidratos)
            localStorage.setItem('pesquisa',JSON.stringify(pesquisa))
            
          }else {
            
            carboidratosA.push(event.target.value)
            pesquisa = {...pesquisa, carboidratos : carboidratosA}
            console.log(pesquisa.carboidratos)
            localStorage.setItem('pesquisa', JSON.stringify(pesquisa))
          }
         } 
         
     
    }else{

        
         pesquisa ={ ...pesquisa, [campo] : event.target.value }
     
     
         localStorage.setItem('pesquisa', JSON.stringify(pesquisa))
    }

    


}

const carregar = ( pagina) =>{
 pesquisa = JSON.parse(localStorage.getItem('pesquisa'))

    Object.keys(pesquisa).forEach((chave) => { 
      let campo =  document.getElementById(String(chave))
      
     console.log(pagina)
      

      if(pagina == 1 && (chave == 'nome' || chave == 'Motivo')){
          campo.value = pesquisa[chave]
      }else  if( pagina == 2  && (chave == 'praticou' || chave == 'exercicioPraticado')){
          console.log('entrou', 'praticou')
          campo = document.getElementById(pesquisa['praticou'])
          console.log(campo)
        //  if(campo ){
              console.log(campo)
             campo.checked = true
             
             if(campo.id == 'Sim' && campo.checked){
                document.getElementById('div').style.display = 'block'
                document.getElementById('exercicioPraticado').value = pesquisa['exercicioPraticado']
             }else{
                document.getElementById('div').style.display = 'none' 
             }
             
       //     } 
          
      }else if((pagina == 3)  && (chave == 'carboidratos' )){
         console.log('entrou  dssdf')
          let array = pesquisa['carboidratos']
          console.log(array) 
          array.forEach(elemento => {
              let   campo = document.getElementById(elemento)
              console.log('entrou aqui', campo)
              if(campo){

                  campo.checked = true
                  console.log(document.getElementById(elemento))
              }
           })
      }

      
  })
}

const display = (event) =>{

    let pergunta =  document.getElementById('div')
   if(event.target.id == 'Sim'){
       console.log(pergunta)
       pergunta.style.display = 'block'

   }else {
    pergunta.style.display = 'none'
     
    document.getElementById('exercicioPraticado').value = ''

    delete pesquisa['exercicioPraticado']   
    
    localStorage.setItem('pesquisa', JSON.stringify(pesquisa))
       

   }
}

const carregarUltimaPg = () => {
    pesquisa = JSON.parse(localStorage.getItem('pesquisa'))

    document.getElementById('nome').innerHTML = pesquisa['nome']
    document.getElementById('Motivo').innerHTML = pesquisa['Motivo']
    document.getElementById('Praticou').innerHTML = pesquisa['praticou']
    if(pesquisa['praticou'] == 'Sim'){
        document.getElementById('mostrar').style.display = 'block'
        document.getElementById('Exercicios').innerHTML = pesquisa['exercicioPraticado']
    }
    document.getElementById('carboidratos').innerHTML = pesquisa['carboidratos'].reduce((total,elemento) => total + `<li>${elemento}</li>`  , '')

}


const novaPesquisa = () =>{
    localStorage.clear()
}