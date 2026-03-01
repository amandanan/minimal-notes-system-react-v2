// ==========================
// ESTADO GLOBAL
// ==========================

let dados = JSON.parse(localStorage.getItem("cadernoPro")) || {};
let pastaAtual = null;
let paginaAtual = null;
let abasAbertas = [];
let dragIndex = null;

// ==========================
// SALVAR LOCAL
// ==========================

function salvarLocal() {
    localStorage.setItem("cadernoPro", JSON.stringify(dados));
}

// ==========================
// PASTAS
// ==========================

function criarPasta() {
    let nome = prompt("Nome da pasta:");
    if (!nome) return;

    if (dados[nome]) {
        alert("Pasta já existe.");
        return;
    }

    dados[nome] = {};
    salvarLocal();
    renderizar();
}

function excluirPasta(nome) {
    if (!confirm("Excluir pasta?")) return;

    delete dados[nome];

    abasAbertas = abasAbertas.filter(a => a.pasta !== nome);

    if (pastaAtual === nome) {
        pastaAtual = null;
        paginaAtual = null;
        document.getElementById("editor").innerHTML = "";
    }

    salvarLocal();
    renderizar();
    renderizarAbas();
}

// ==========================
// PÁGINAS
// ==========================

function criarPagina() {
    if (!pastaAtual) {
        alert("Selecione uma pasta.");
        return;
    }

    let nome = prompt("Nome da página:");
    if (!nome) return;

    if (dados[pastaAtual][nome]) {
        alert("Página já existe.");
        return;
    }

    dados[pastaAtual][nome] = "";
    salvarLocal();
    renderizar();
}

function excluirPagina(pasta, pagina) {
    if (!confirm("Excluir página?")) return;

    delete dados[pasta][pagina];

    abasAbertas = abasAbertas.filter(
        a => !(a.pasta === pasta && a.pagina === pagina)
    );

    if (paginaAtual === pagina && pastaAtual === pasta) {
        paginaAtual = null;
        document.getElementById("editor").innerHTML = "";
    }

    salvarLocal();
    renderizar();
    renderizarAbas();
}

// ==========================
// ABRIR PÁGINA
// ==========================

function abrirPagina(pasta, pagina) {
    pastaAtual = pasta;
    paginaAtual = pagina;

    if (!abasAbertas.find(a => a.pasta === pasta && a.pagina === pagina)) {
        abasAbertas.push({ pasta, pagina });
    }

    renderizar();
    renderizarAbas();

    document.getElementById("editor").innerHTML = dados[pasta][pagina];
}

// ==========================
// ABAS
// ==========================

function renderizarAbas() {
    let tabs = document.getElementById("tabs");
    tabs.innerHTML = "";

    abasAbertas.forEach((aba, index) => {

        let div = document.createElement("div");
        div.className = "tab" +
            (aba.pasta === pastaAtual && aba.pagina === paginaAtual ? " active" : "");

        div.draggable = true;

        div.ondragstart = () => dragIndex = index;

        div.ondragover = e => e.preventDefault();

        div.ondrop = () => {
            let item = abasAbertas.splice(dragIndex, 1)[0];
            abasAbertas.splice(index, 0, item);
            renderizarAbas();
        };

        // Título
        let titulo = document.createElement("span");
        titulo.textContent = aba.pagina;
        titulo.onclick = () => abrirPagina(aba.pasta, aba.pagina);

        // Botão fechar
        let fechar = document.createElement("span");
        fechar.textContent = "x";
        fechar.className = "close-tab";
        fechar.onclick = () => {

            abasAbertas.splice(index, 1);

            if (aba.pasta === pastaAtual && aba.pagina === paginaAtual) {
                paginaAtual = null;
                document.getElementById("editor").innerHTML = "";
            }

            renderizarAbas();
        };

        div.appendChild(titulo);
        div.appendChild(fechar);
        tabs.appendChild(div);
    });
}

// ==========================
// SALVAR PÁGINA
// ==========================

function salvar() {
    if (!pastaAtual || !paginaAtual) {
        alert("Nenhuma página aberta.");
        return;
    }

    dados[pastaAtual][paginaAtual] =
        document.getElementById("editor").innerHTML;

    salvarLocal();
}

// ==========================
// INSERIR IMAGEM
// ==========================

function inserirImagem() {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onload = ev => {
            document.execCommand(
                "insertHTML",
                false,
                `<img src="${ev.target.result}" style="max-width:100%">`
            );
        };

        reader.readAsDataURL(file);
    };

    input.click();
}

// ==========================
// EXPORTAR ARQUIVO
// ==========================

function exportarArquivo() {
    if (!paginaAtual) return;

    let conteudo = document.getElementById("editor").innerHTML;

    let blob = new Blob([conteudo], { type: "text/html" });

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = paginaAtual + ".html";
    a.click();
}

// ==========================
// BUSCA + RENDERIZAÇÃO
// ==========================
function buscar(texto) {
    texto = texto.toLowerCase();

    let estrutura = document.getElementById("estrutura");
    estrutura.innerHTML = "";

    for (let pasta in dados) {

        // Cria a pasta
        let divPasta = document.createElement("div");
        divPasta.className = "folder" + (pasta === pastaAtual ? " active" : "");

        let nome = document.createElement("span");
        nome.textContent = pasta;
        nome.onclick = () => {
            pastaAtual = pasta;
            renderizar();
        };

        let del = document.createElement("span");
        del.textContent = "Excluir";
        del.className = "delete-btn";
        del.onclick = () => excluirPasta(pasta);

        divPasta.appendChild(nome);
        divPasta.appendChild(del);
        estrutura.appendChild(divPasta);

        // Percorre todas as páginas da pasta (não só a pasta atual)
        for (let pagina in dados[pasta]) {

            // Se houver texto e não encontrar, ignora
            if (texto && !pagina.toLowerCase().includes(texto)) continue;

            let divPagina = document.createElement("div");
            divPagina.className = "page" + (pagina === paginaAtual ? " active" : "");

            let nomePagina = document.createElement("span");
            nomePagina.textContent = " - " + pagina;
            nomePagina.onclick = () => abrirPagina(pasta, pagina);

            let delPag = document.createElement("span");
            delPag.textContent = "Excluir";
            delPag.className = "delete-btn";
            delPag.onclick = () => excluirPagina(pasta, pagina);

            divPagina.appendChild(nomePagina);
            divPagina.appendChild(delPag);
            estrutura.appendChild(divPagina);
        }
    }
}

function renderizar() {
    buscar("");
}

// ==========================
// CONECTAR INPUT DE BUSCA
// ==========================
const inputBusca = document.getElementById("busca");
if (inputBusca) {
    inputBusca.addEventListener("input", (e) => {
        buscar(e.target.value);
    });
}

// ==========================
// INICIALIZAÇÃO
// ==========================

renderizar();