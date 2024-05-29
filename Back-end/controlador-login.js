const Usuario = require("./back-end/models/user");
const { login } = require("./back-end/crud/read-user"); // Supondo que você tenha um módulo de autenticação separado
const connection = require("./back-end/crud/connection-bd");

// Verifica se a requisição é do tipo POST.
if (req.method === "POST") {
    if (req.body && req.body.email && req.body.senha) {
        const { email, senha } = req.body;
        // Executa a função de login e lida com o resultado
        login(email, senha)
            .then((resultado) => {
                // Faça algo com o resultado, como enviar uma resposta HTTP
                res.status(200).send(resultado);
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error);
                // Envie uma resposta de erro adequada
                res.status(500).send("Erro interno do servidor");
            });
    } else {
        // Requisição não contém email e/ou senha no corpo
        res.status(400).send("Dados de login ausentes na requisição");
    }
} else {
    // Método de requisição inválido
    res.status(405).send("Método de requisição inválido");
}
