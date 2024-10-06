const { registrarUsuario } = require('../../js/autentic');
let usuarios = [];

beforeEach(() => {
    usuarios = []; // Limpar a lista de usuários antes de cada teste
});

describe('Testes de validação - Registro de Usuário', () => {
    test('Deve falhar ao registrar um usuário com email já cadastrado', () => {
        registrarUsuario('Willian Raniere', 'willianraniere4@gmail.com', 'Wrbds');
        expect(() => {
            registrarUsuario('Outro Nome', 'willianraniere4@gmail.com', 'outrasenha');
        }).toThrow('Email já cadastrado.');
    });

    test('Deve falhar ao registrar um usuário sem email', () => {
        expect(() => {
            registrarUsuario('Nome Válido', '', 'senha');
        }).toThrow('Email é obrigatório.');
    });
});