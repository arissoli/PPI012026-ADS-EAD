document.addEventListener("DOMContentLoaded", function () {

    const quantidadeInput = document.getElementById("quantidade");
    const totalElemento = document.getElementById("total");
    const preco = 200;

    quantidadeInput.addEventListener("input", function () {

        let quantidade = parseInt(quantidadeInput.value);

        if (quantidade > 0) {
            let total = quantidade * preco;
            totalElemento.innerHTML = "Valor total: R$ " + total.toFixed(2);
        } else {
            totalElemento.innerHTML = "";
        }

    });

});