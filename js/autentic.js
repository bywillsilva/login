let usuarios = [];

function registrarUsuario(nome, email, senha) {
    if (!nome || nome.split(' ').length < 2) {
        throw new Error('Nome deve conter pelo menos duas palavras.');
    }
    if (!email) {
        throw new Error('Email é obrigatório.');
    }
    if (usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email já cadastrado.');
    }
    if (usuarios.find(usuario => usuario.nome.toLowerCase() === nome.toLowerCase())) {
        throw new Error('Nome de usuário já cadastrado.');
    }
    usuarios.push({ nome, email, senha });
}

function autenticarUsuario(nome, senha) {
    const usuario = usuarios.find(u => u.nome.toLowerCase() === nome.toLowerCase());
    if (!usuario || usuario.senha !== senha) {
        throw new Error('Credenciais inválidas.');
    }
    return usuario;
}

function resetUsuarios() {
    usuarios = [];
}

module.exports = { usuarios, registrarUsuario, autenticarUsuario, resetUsuarios };
