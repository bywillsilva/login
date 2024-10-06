
const { registrarUsuario, autenticarUsuario, resetUsuarios } = require('../../js/autentic');

describe('Testes de validação - Autenticação de Usuário', () => {
    beforeEach(() => {
        resetUsuarios();  // Reseta a lista de usuários antes de cada teste
    });

    test('Deve falhar ao autenticar um usuário com senha inválida', () => {
        registrarUsuario('Willian Raniere', 'willianraniere4@gmail.com', 'Wrbds');
        
        expect(() => {
            autenticarUsuario('Willian Raniere', 'senhaIncorreta');
        }).toThrow('Credenciais inválidas.');
    });

    test('Deve autenticar um usuário com credenciais válidas', () => {
        registrarUsuario('Willian Raniere', 'willianraniere4@gmail.com', 'Wrbds');

        const usuario = autenticarUsuario('Willian Raniere', 'Wrbds');
        expect(usuario).toBeDefined();
        expect(usuario.nome).toBe('Willian Raniere');
    });

    test('Deve falhar ao autenticar um usuário não registrado', () => {
        expect(() => {
            autenticarUsuario('Nome Inexistente', 'qualquerSenha');
        }).toThrow('Credenciais inválidas.');
    });
});