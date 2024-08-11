const lista = document.getElementById("lista");
const input = document.getElementById("input");

// Carrega as tarefas salvas quando a página é carregada
document.addEventListener("DOMContentLoaded", carregarTarefas);

// Adiciona a tarefa ao pressionar Enter
input.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        adicionar();
    }
});

function adicionar(){
    const inputText = input.value;

    if(inputText !== ""){
        adicionarTarefaNaLista(inputText);
        salvarTarefas();
        input.value = ""; // Limpa o campo de entrada após adicionar a tarefa
    }
}

function remover(button){
    const li = button.parentElement;
    lista.removeChild(li);
    salvarTarefas(); // Salva as tarefas após remover uma
}

function editar(button){
    const li = button.parentElement;
    const span = li.querySelector("span");

    const novoTexto = prompt("Digite uma nova tarefa:", span.textContent);
    if (novoTexto) {
        span.textContent = novoTexto;
        salvarTarefas(); // Salva as tarefas após editar uma
    }
}

function adicionarTarefaNaLista(texto) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${texto}</span>
        <button class="btnEditar" onclick="editar(this)">Editar</button>
        <button class="btnRemover" onclick="remover(this)">Remover</button>
    `;
    lista.appendChild(li);
}

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll("#lista li span").forEach(tarefa => {
        tarefas.push(tarefa.textContent);
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));
    if (tarefas) {
        tarefas.forEach(tarefa => adicionarTarefaNaLista(tarefa));
    }
}
