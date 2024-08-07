let valorAdicionado = parseFloat(localStorage.getItem('valorAdicionado')) || 0;

function atualizarTotal() {
    const tabela = document.querySelector("#tabelaDeCompras table");
    let total = valorAdicionado;

    for (let i = 1; i < tabela.rows.length; i++) {
        const preco = parseFloat(tabela.rows[i].cells[1].textContent);
        total -= preco; 
    }

    const faltaGastar = document.getElementById("faltaGastar");
    faltaGastar.textContent = total.toFixed(2);

    if (total >= 30) {
        faltaGastar.style.color = "green"; 
    } else if (total >= 0 && total < 30) {
        faltaGastar.style.color = "yellow";
    } else {
        faltaGastar.style.color = "red"; 
    }
}

window.onload = function() {
    const tabela = document.querySelector("#tabelaDeCompras table");
    const savedItems = JSON.parse(localStorage.getItem("tabelaItens")) || [];

    const valorAdicionadoLocalStorage = parseFloat(localStorage.getItem("valorAdicionado"));
    if (!isNaN(valorAdicionadoLocalStorage)) {
        valorAdicionado = valorAdicionadoLocalStorage;
    }

    savedItems.forEach(item => {
        const novaLinha = tabela.insertRow(-1);

        const celulaNome = novaLinha.insertCell(0);
        const celulaPreco = novaLinha.insertCell(1);
        const celulaExcluir = novaLinha.insertCell(2);

        celulaNome.textContent = item.nome;
        celulaPreco.textContent = item.preco.toFixed(2);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="bi bi-trash3-fill"></i>';
        botaoExcluir.style.border = 'none';
        botaoExcluir.style.backgroundColor = 'transparent';
        botaoExcluir.style.cursor = 'pointer';
        botaoExcluir.onclick = function () {
            tabela.deleteRow(novaLinha.rowIndex);
            atualizarTotal();
            salvarTabela();
        };
        celulaExcluir.appendChild(botaoExcluir);
    });

    atualizarTotal(); 
};

function adicionarValor() {
    const valorAdicionadoInput = parseFloat(document.getElementById("valorAdicionado").value);
    
    if (!isNaN(valorAdicionadoInput)) { 
        valorAdicionado = valorAdicionadoInput; 
        localStorage.setItem("valorAdicionado", valorAdicionado); 
        atualizarTotal();
    } else {
        alert("Preencha com um valor valido!")
    }

    document.getElementById("valorAdicionado").value = "";
}

function adicionarProduto() {
    const nomeProduto = document.getElementById("nomeProduto").value;
    const valorProduto = parseFloat(document.getElementById("valorProduto").value);

    if (!isNaN(valorProduto) && nomeProduto.trim() !== "") { 
        const tabela = document.querySelector("#tabelaDeCompras table");
        const novaLinha = tabela.insertRow(1); // Insere a nova linha no início
        novaLinha.className = "tableBorder";

        const celulaNome = novaLinha.insertCell(0);
        const celulaPreco = novaLinha.insertCell(1);
        const celulaExcluir = novaLinha.insertCell(2);

        celulaNome.textContent = nomeProduto;
        celulaPreco.textContent = valorProduto.toFixed(2);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="bi bi-trash3-fill"></i>';
        botaoExcluir.style.border = 'none';
        botaoExcluir.style.backgroundColor = 'transparent';
        botaoExcluir.style.cursor = 'pointer';
        botaoExcluir.onclick = function () {
            tabela.deleteRow(novaLinha.rowIndex);
            atualizarTotal(); 
            salvarTabela(); 
        };
        celulaExcluir.appendChild(botaoExcluir);

        salvarTabela(); 
        atualizarTotal(); 

    } else {
        alert("Verifique se o nome do produto ou o preço estão preenchido!")
    }

    document.getElementById("nomeProduto").value = "";
    document.getElementById("valorProduto").value = "";
}

function salvarTabela() {
    const tabela = document.querySelector("#tabelaDeCompras table");
    const items = [];

    for (let i = 1; i < tabela.rows.length; i++) {
        const nome = tabela.rows[i].cells[0].textContent;
        const preco = parseFloat(tabela.rows[i].cells[1].textContent);

        items.push({ nome, preco });
    }

    localStorage.setItem("tabelaItens", JSON.stringify(items));
}

function limparInformacoes(){
    localStorage.removeItem('tabelaItens');
    localStorage.removeItem('valorAdicionado');
    valorAdicionado = 0;
    atualizarTotal();
    limparTabela();
    location.reload();
}

function limparTabela(){
    const tabela = document.querySelector("#tabelaDeCompras table");
    while (tabela.rows.length > 1){
        tabela.deleteRow(1);
    }
}