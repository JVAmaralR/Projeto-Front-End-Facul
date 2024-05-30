const express = require('express');
const session = require('express-session');
const path = require('path');

const port = 3000;
const app = express();

app.use(session({
    secret: 'chavesecretatoptop', // Substitua por uma chave secreta real
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use secure: true se estiver usando HTTPS
}));



// Configura o mecanismo de visualização para renderizar arquivos HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define o diretório de visualizações como "views"
app.set('views', path.join(__dirname, 'views'));

// Configura o Express para servir arquivos estáticos do diretório "public"
app.use(express.static('public'));

// Rota para renderizar o arquivo index.html
app.get('/', (req, res) => {
    res.render('login.html');
});

app.post('/Back-end/controlador-login.js', (req, res) => {});
// Inicia o servidor
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
