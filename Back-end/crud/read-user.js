const Usuario = require('../models/user.js');
const bd = require('./conection-bd.js');
const bcrypt = require('bcrypt');

async function funcionarioJaExiste(conexao, nome, cargo, setor, dataContratacao, salario) {
    return new Promise((resolve, reject) => {
        // Preparar a consulta SQL
        const sql = "SELECT COUNT(*) AS count FROM funcionario WHERE nome = ? AND cargo = ? AND setor = ? AND dataContratacao = ? AND salario = ?";
        
        // Executar a consulta
        conexao.query(sql, [nome, cargo, setor, dataContratacao, salario], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Buscar o resultado da contagem
                const count = results[0].count;
                
                // Retornar true se a contagem for maior que 0, caso contrário, retornar false
                resolve(count > 0);
            }
        });
    });
}

async function login(email, senha) {
    try {
        const usuario = await buscarUsuarioPorEmail(email);

        if (usuario && await bcrypt.compare(senha, usuario.senha)) {
            console.log('Login realizado com sucesso!');
            // Redirecionamento ou resposta para o cliente
        } else {
            console.log('Email ou senha incorretos!');
            // Redirecionamento ou resposta para o cliente
        }
    } catch (error) {
        console.error('Ocorreu um erro, tente novamente mais tarde:', error);
        // Redirecionamento ou resposta para o cliente
    }
}

async function VerificaEmailNoReturnDados(email) {
    try {
        // Prevenir SQL Injection usando consultas preparadas
        const sql = "SELECT COUNT(*) AS total FROM usuarios WHERE email = ?";
        const [rows] = await bd.execute(sql, [email]);

        // Obter o total de registros com o email fornecido
        const total = rows[0].total;

        // Retorna true se houver registros, false caso contrário
        return total > 0;
    } catch (error) {
        console.error('Erro ao verificar o email no banco de dados:', error);
        return false;
    }
}

async function buscarUsuarioPorEmail(email) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        
        bd.query(sql, [email], function(error, results, fields) {
            if (error) {
                console.error('Erro ao executar a consulta:', error.message);
                return reject(error);
            }
    
            if (results.length > 0) {
                const dadosUsuario = results[0];
                const usuario = new Usuario(
                    dadosUsuario.UsuarioID,
                    dadosUsuario.Email,
                    dadosUsuario.Senha,
                    dadosUsuario.Tipo,
                    dadosUsuario.DataRegistro
                );
    
                resolve(usuario);
            } else {
                resolve(null);
            }
        });
    });
}

module.exports = { VerificaEmailNoReturnDados, funcionarioJaExiste, login };
