const connection = require('../back-end/connection'); // Supondo que você já tenha a conexão configurada

function funcionarioJaExiste(conexao, nome, cargo, setor, dataContratacao, salario, callback) {
    const sql = "SELECT COUNT(*) AS count FROM funcionario WHERE nome = ? AND cargo = ? AND setor = ? AND dataContratacao = ? AND salario = ?";
    
    conexao.query(sql, [nome, cargo, setor, dataContratacao, salario], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        
        const count = results[0].count;
        
        callback(null, count > 0);
    });
}

const bcrypt = require('bcrypt');
const { buscarUsuarioPorEmail } = require('./seuArquivoDeFuncoes'); // Supondo que você já tenha essa função

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



const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await buscarUsuarioPorEmail(email);

        if (usuario && await bcrypt.compare(senha, usuario.senha)) {
            console.log('Login realizado com sucesso!');
            // Redirecionamento ou resposta para o cliente
            res.status(200).send('Login realizado com sucesso!');
        } else {
            console.log('Email ou senha incorretos!');
            // Redirecionamento ou resposta para o cliente
            res.status(401).send('Email ou senha incorretos!');
        }
    } catch (error) {
        console.error('Ocorreu um erro, tente novamente mais tarde:', error);
        // Redirecionamento ou resposta para o cliente
        res.status(500).send('Ocorreu um erro, tente novamente mais tarde.');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
