import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

const host = "0.0.0.0";
const porta = 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));

// SESSION 
app.use(session({
    secret: 'segredo-cursos',
    resave: false,
    saveUninitialized: false
}));

// Arquivos públicos
app.use(express.static(path.join(__dirname, "Views/public")));


// ====== MIDDLEWARE ======
function verificarAutenticacao(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect("/login");
    }
}



// Home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Views/public/index.html"));
});

// Login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "Views/public/login.html"));
});

// Processar login
app.post("/login", (req, res) => {

    const { usuario, senha } = req.body;

    // Usuário fixo (como pedido pelo professor)
    if (usuario === "admin" && senha === "123") {
        req.session.usuario = usuario;
        res.redirect("/menu");
    } else {
        res.send("<h2>Usuário ou senha inválidos</h2><a href='/login'>Voltar</a>");
    }

});

// Página detalhes (privada)
app.get("/menu", verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, "Views/private/menu.html"));
});

// Página cadastro (privada)
app.get("/cadastro", verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, "Views/private/cadastro.html"));
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});