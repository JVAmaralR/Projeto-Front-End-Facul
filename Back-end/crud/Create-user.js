const bcrypt = require('bcrypt');

async function cadastrarUsuario(conexao, email, senha) {
    try {
        // Verifica se o email já está em uso
        if (await usuarioJaExiste(conexao, email)) {
            console.log('Erro ao cadastrar usuário! Email já está em uso');
            return false;
        }

        // Criptografa a senha antes de salvar no banco de dados
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Insere os dados na tabela usuários
        const [rows] = await conexao.execute("INSERT INTO usuarios (email, senha, nome, DataRegistro) VALUES (?, ?, ?, NOW())", [email, senhaCriptografada]);

        if (rows.affectedRows > 0) {
            console.log('Cadastro realizado com sucesso!');
            return true;
        } else {
            console.log('Ocorreu um erro ao cadastrar o usuário');
            return false;
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return false;
    }
}

async function usuarioJaExiste(conexao, email) {
    const [rows] = await conexao.execute("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows.length > 0;
}

module.exports = { cadastrarUsuario, usuarioJaExiste };