let chave = "Login";
let valor = JSON.parse(localStorage.getItem(chave)) || { logado: "deslogado" };
localStorage.setItem(chave, JSON.stringify(valor));

document.getElementById('searchForm').onsubmit = function() {
    var userInput = document.getElementsByName('q')[0].value;
    document.getElementsByName('q')[0].value = userInput + ' Coffee Shop';
};

function mensagem() {
    alert("Contato enviado, entraremos em contato!");

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}

function log() {
    let valorR = JSON.parse(localStorage.getItem(chave));
    if (valorR.logado === "deslogado") {
        alert("Faça login para comprar!");
        window.location.href = "../views/login.html";
    }

    if (valorR.logado === "logado") {
        document.getElementById("product").scrollIntoView({ behavior: "smooth" });
    }
}

function men() {
    let valorR = JSON.parse(localStorage.getItem(chave));
    if (valorR.logado === "deslogado") {
        alert("Faça login para comprar!");
        window.location.href = "login.html";
    }

    if (valorR.logado === "logado") {
        alert("Sem Estoque!");
    }
}

function entrar() {
    let valorR = JSON.parse(localStorage.getItem(chave));
    valorR.logado = "logado";
    localStorage.setItem(chave, JSON.stringify(valorR));
}

window.onblur = function() {
    document.title = "Cafezinho?";
}

window.onfocus = function() {
    document.title = "Coffee Shop";
}
