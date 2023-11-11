function cadastrar() {
    var email = document.getElementById('emailCadastro').value;
    var senha = document.getElementById('senhaCadastro').value;

    $.ajax({
        type: "POST",
        url: "acoes.php",
        data: {
            acao: 'cadastrar',
            email: email,
            senha: senha
        },
        success: function (response) {
            alert(response);
            listarUsuarios();
        }
    });
}

function login() {
    var email = document.getElementById('emailLogin').value;
    var senha = document.getElementById('senhaLogin').value;

    $.ajax({
        type: "POST",
        url: "acoes.php",
        data: {
            acao: 'login',
            email: email,
            senha: senha
        },
        success: function (response) {
            alert(response);
            listarUsuarios();
        }
    });
}

function listarUsuarios() {
    $.ajax({
        type: "GET",
        url: "acoes.php",
        data: { acao: 'listar' },
        success: function (response) {
            document.getElementById('listaUsuarios').innerHTML = response;
        }
    });
}

$(document).ready(function () {
    listarUsuarios();
});
