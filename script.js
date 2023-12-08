const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []


input.addEventListener('keypress', e => {
  if(e.key == 'Enter' && input.value != '') {
    addNovaTask()
  }
})


function addNovaTask() {
    minhaListaDeItens.push({
        task: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTasks()
}

function mostrarTasks(){

    let novaLi = ''
    
    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = 
          novaLi + 
        
        `
    <li class="task ${item.concluida && "done"}">
        <img src="images/certo.png" alt="check do site" onclick="concluirTask(${posicao})"> 
        <p>${item.task}</p>
        <img src="images/delete.png" alt="task-pro-lixo" onclick="deletarItem(${posicao})">
    </li>
    
    `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

      
}

function concluirTask(posicao){
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
  mostrarTasks()

}

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)

    mostrarTasks()
}

function recarregarTask() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTasks()
}

recarregarTask()
button.addEventListener('click', addNovaTask)

