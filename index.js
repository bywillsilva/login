const express = require('express');
const path = require('path');

const { registrarUsuario, autenticarUsuario } = require('./js/autentic');

const PORT = process.env.PORT || 3001

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'));
});

// Valida registro
app.post('/registrar', (req, res) => {
    const { nome, email, senha } = req.body; // Inclua email aqui
    try {
        registrarUsuario(nome, email, senha);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Valida Form
app.post('/autenticar', (req, res) => {
    const { nome, senha } = req.body;
    try {
        const usuario = autenticarUsuario(nome, senha);
        res.status(302).redirect('/home.html')
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Get HTML
app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/home.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/register.html'));
});

// Get CSS
app.get('/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'css/index.css'));
});

app.get('/home.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'css/home.css'));
});

// Get Js 
app.get('/validaInput', (req, res) => {
    res.sendFile(path.join(__dirname, 'js/validainput.js'));
});

// Port Server Listen
app.listen(PORT);


module.exports = { app };