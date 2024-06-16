let listaDeContatos = [];
let itemAEditar;

const form = document.getElementById('form-itens');
const itensInput = document.getElementById("receber-item");
const contatoInput = document.getElementById("receber-contato");
const ulContatos = document.getElementById("lista-de-itens");
const ulContatosApagados = document.getElementById("itens-comprados");
const listaRecuperada = localStorage.getItem('listaDeContatos')

function atualizaLocalStorage(){
    localStorage.setItem('listaDeContatos', JSON.stringify(listaDeContatos))
}

if(listaRecuperada){
    listaDeContatos = JSON.parse(listaRecuperada);
    mostrarContatos();
} else {
    listaDeContatos = [];
}


form.addEventListener("submit" , function(evento) {
    evento.preventDefault();
    salvarItem();
    mostrarContatos();
    itensInput.focus();
});

function salvarItem(){
    const contato = itensInput.value
    const numero = contatoInput.value

    const checarDuplicado = listaDeContatos.some((elemento) => elemento.valor.toUpperCase() === contato.toUpperCase());
    const checarNumeroDuplicado = listaDeContatos.some((elemento) => elemento.celular === numero);

    if(checarDuplicado || checarNumeroDuplicado){
        alert("Contato já foi salvo!")
    } else {

        listaDeContatos.push({
            valor: contato,
            celular: numero,
            checar: false
        })

        itensInput.value = '';
        contatoInput.value = '';
    }
}

function mostrarContatos(){
    ulContatos.innerHTML = ``;
    ulContatosApagados.innerHTML = ``;
    listaDeContatos.forEach((elemento, index) => {
        if(elemento.checar){
            ulContatosApagados.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${elemento.valor}</span>
                        <span class="itens-comprados is-size-5">${elemento.celular}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `
        } else {
            ulContatos.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${elemento.valor}"></input>
                        <input type="text" class="is-size-5" value="${elemento.celular}"></input>
                    </div>
                    <div>
                        <button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>
                        <i class="fa-regular is-clickable fa-pen-to-square editar"></i>
                    </div>
                </li>`;
        
        }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');

        inputsCheck.forEach(i => {
            i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeContatos[valorDoElemento].checar = evento.target.checked
            mostrarContatos();
            })
        })

        const deletar = document.querySelectorAll('.deletar');

        deletar.forEach(i => {
            i.addEventListener('click', (evento) => {
               const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
               listaDeContatos.splice(valorDoElemento, 1);
               mostrarContatos();
            })
        })

        const editarItens = document.querySelectorAll(".editar");

        editarItens.forEach(i => {
            i.addEventListener('click', (evento) => {
               itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
               mostrarContatos();
            })
        });
        atualizaLocalStorage();
}

function salvarEdicao(){
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    listaDeContatos[itemAEditar].valor = itemEditado.value;
    itemAEditar = -1;
    mostrarContatos();
}


