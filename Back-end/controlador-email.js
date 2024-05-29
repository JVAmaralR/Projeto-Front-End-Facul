const nodemailer = require("nodemailer");
const express = require('express');
const bodyParser = require('body-parser');
const { VerificaEmailNoReturnDados } = require('./back-end/crud/read-user');
const { inserirCodigoRecuperaIndb } = require('./back-end/crud/update-user');

function geradorCodigoEmail() {
    const caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}

async function enviarEmail(destinatario, assunto, corpo) {
    let transporte = nodemailer.createTransport({
        host: "smtp.gmail.com", // Endereço do servidor SMTP
        port: 465,
        secure: true, // Usando SSL
        auth: {
            user: "clinicor458@gmail.com", // Seu e-mail
            pass: "oqyg uvot bexf iboc" // Sua senha de e-mail
        }
    });

    try {
        let info = await transporte.sendMail({
            from: '"Clinicor" <clinicor458@gmail.com>',
            to: destinatario,
            subject: assunto,
            html: corpo
        });

        console.log("E-mail enviado: %s", info.messageId);
        return true;
    } catch (erro) {
        console.error("Erro ao enviar e-mail:", erro);
        return erro.message; // Retornar a mensagem de erro para tratamento adequado
    }
}

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/recuperar-senha', async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;
        const codigoAleatorio = geradorCodigoEmail();

        if (await VerificaEmailNoReturnDados(email)) {
            inserirCodigoRecuperaIndb(email, codigoAleatorio);

            const corpoEmail = `
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email</title>
                    <style>
                        body {
                            height: 200px;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                        h1 {
                            color: #FEA625;
                        }
                        h4 {
                            color: #a93a2f;
                        }
                    </style>
                </head>
                <body>
                    <h1><b>Olá, recebemos sua solicitação de nova senha!</b></h1>
                    <h2><i>Aqui está seu código: ${codigoAleatorio}</i></h2> <br>
                    <br>
                    <br>
                    <h2><i>Por favor, clique no link a seguir para redefinir sua senha: <a href="http://localhost/inter3-copia/cadastro_nova_senha.html">Clique Aqui</a></i></h2> <br>
                    <h4>Caso tenha alguma dúvida ou precise de assistência, <br> não hesite em entrar em contato conosco. <br> Estamos sempre prontos para ajudar.</h4>
                    
                    <h4>Obrigado por escolher a <B>CLINICOR</B>. <br> Estamos ansiosos para proporcionar a melhor <br> experiência possível para você.</h4>
                    <h4>Tenha um ótimo dia!</h4>
                    <br>
                    <h4>Atenciosamente, <br>
                    <b><i>EQUIPE CLINICOR</i></b></h4>
                </body>
                </html>`;

            if (await enviarEmail(email, 'Recuperação de senha', corpoEmail)) {
                res.send('<script>window.alert("Email de recuperação enviado com sucesso!");window.location.href="../index.php";</script>');
            } else {
                res.send('<script>window.alert("Erro ao tentar enviar email, tente novamente em instantes!");window.location.href="../cadastro_recuperar_senha.html";</script>');
            }
        } else {
            res.send('<script>window.alert("Email não cadastrado!");window.location.href="../cadastro_recuperar_senha.html";</script>');
        }
    } else {
        res.send('<script>window.alert("Erro ao tentar enviar email, tente novamente em instantes!");window.location.href="../cadastro_recuperar_senha.html";</script>');
    }
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
