function calcularTotal() {
    let quantidade = document.getElementById("quantidade").value;
    let preco = 200;
    let total = quantidade * preco;

    document.getElementById("total").innerHTML =
        "Valor total: R$ " + total;
}