// tests/autentic.test.js
const { usuarios, registrarUsuario, autenticarUsuario } = require('../../js/autentic');

describe('Autenticação de Usuários', () => {
    beforeEach(() => {
        // Resetar o banco de dados simulado antes de cada teste
        usuarios.length = 0; // Limpar o array de usuários
    });

    test('deve registrar um novo usuário com sucesso', () => {
        expect(() => {
            registrarUsuario('Willian Raniere', 'willianraniere4@gmail.com', 'Wrbds');
        }).not.toThrow();

        expect(usuarios).toHaveLength(1);
        expect(usuarios[0]).toEqual({
            nome: 'Willian Raniere',
            email: 'willianraniere4@gmail.com',
            senha: 'Wrbds',
        });
    });

    test('não deve registrar um usuário com nome inválido', () => {
        expect(() => {
            registrarUsuario('Willian', 'willianraniere4@gmail.com', 'Wrbds');
        }).toThrow('Nome deve conter pelo menos duas palavras.');
    });

    test('não deve registrar um usuário com nome já cadastrado', () => {
        registrarUsuario('Willian Raniere', 'willianraniere4@gmail.com', 'Wrbds');

        expect(() => {
            registrarUsuario('Willian Raniere', 'willianraniere5@gmail.com', 'Wrbds2');
        }).toThrow('Nome de usuário já cadastrado.');
    });

    test('não deve registrar um usuário com email já cadastrado', () => {
        registrarUsuario('Willian Raniere', 'willianraniere4@gmail.com', 'Wrbds');

        expect(() => {
            registrarUsuario('Outro Nome', 'willianraniere4@gmail.com', 'Wrbds2');
        }).toThrow('Email já cadastrado.');
    });

    test('deve autenticar um usuário com credenciais válidas', () => {
        registrarUsuario('Willian Raniere', 'willianraniere4@gmail.com', 'Wrbds');

        const usuario = autenticarUsuario('Willian Raniere', 'Wrbds');
        expect(usuario).toEqual({
            nome: 'Willian Raniere',
            email: 'willianraniere4@gmail.com',
            senha: 'Wrbds',
        });
    });

    test('não deve autenticar um usuário com credenciais inválidas', () => {
        registrarUsuario('Willian Raniere', 'willianraniere4@gmail.com', 'Wrbds');

        expect(() => {
            autenticarUsuario('Willian Raniere', 'senhaerrada');
        }).toThrow('Credenciais inválidas.');
    });

    test('não deve autenticar um usuário que não existe', () => {
        expect(() => {
            autenticarUsuario('Nome Inexistente', 'qualquerSenha');
        }).toThrow('Credenciais inválidas.');
    });
});
