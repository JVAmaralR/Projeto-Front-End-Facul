const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { getConnection } = require('./conection.js'); // Supondo que você tenha a função getConnection no arquivo conection.js

// Função para modificar a senha no banco de dados
async function modificadorSenha(senhanova, codigosenha) {
    try {
        // Criar uma instância da conexão com o banco de dados
        const conexao = getConnection();

        // Criptografar a nova senha
        const senhaCriptografada = await bcrypt.hash(senhanova, 10);

        // Query para atualizar a senha com base no código de recuperação
        const sql = 'UPDATE Usuarios SET Senha = ? WHERE CodigoRecuperaSenha = ?';
        const [result] = await conexao.execute(sql, [senhaCriptografada, codigosenha]);

        // Verificar se pelo menos uma linha foi afetada (a senha foi atualizada)
        if (result.affectedRows > 0) {
            console.log('Senha modificada com sucesso!');
            return true;
        } else {
            console.log('Nenhum registro foi afetado (nenhuma senha foi atualizada).');
            return false;
        }
    } catch (error) {
        console.error('Erro ao modificar a senha:', error);
        return false;
    }
}

// Função para inserir o código de recuperação no banco de dados
async function inserirCodigoRecuperaIndb(email, codigosenha) {
    try {
        // Criar uma instância da conexão com o banco de dados
        const conexao = getConnection();

        // Query para atualizar o código de recuperação com base no email
        const sql = 'UPDATE Usuarios SET CodigoRecuperaSenha = ? WHERE email = ?';
        const [result] = await conexao.execute(sql, [codigosenha, email]);

        // Verificar se pelo menos uma linha foi afetada
        if (result.affectedRows > 0) {
            console.log('Código de recuperação inserido com sucesso!');
            return true;
        } else {
            console.log('Nenhum registro foi afetado.');
            return false;
        }
    } catch (error) {
        console.error('Erro ao inserir o código de recuperação:', error);
        return false;
    }
}
