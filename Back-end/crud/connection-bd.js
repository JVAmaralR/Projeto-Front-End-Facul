const mysql = require("mysql");

// Configurações do Banco de Dados.
const bd = mysql.createConnection({
    host: "localhost", // Endereço do Banco de Dados.
    user: "root", // Usuário do Banco de Dados.
    password: "3838jaum", // Senha do Banco de Dados.
    database: "grabieldb" // Nome do Banco de Dados.
});

// Conexão com o Banco de Dados.
bd.connect((erro) => {
    if(erro) {
        throw erro;
    } else {
        console.log(`Conexão realizada!\nBanco de Dados: ${bd.config.database}.`);
    }
});

module.exports = bd;
