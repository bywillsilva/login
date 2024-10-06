const { app } = require('./../../index');
const request = require('supertest');

// Testes de integração
describe('Testes de Integração', () => {
    test('Deve registrar e autenticar um usuário com sucesso', async () => {
        // Registrar um novo usuário
        const registroResponse = await request(app)
            .post('/registrar')
            .send({ nome: 'Willian Raniere', email: 'willianraniere4@gmail.com', senha: 'Wrbds' });

        expect(registroResponse.status).toBe(201);
        expect(registroResponse.body.message).toBe('Usuário registrado com sucesso!');

        // Autenticar o usuário
        const autenticacaoResponse = await request(app)
            .post('/autenticar')
            .send({ nome: 'Willian Raniere', senha: 'Wrbds' });

        expect(autenticacaoResponse.status).toBe(302);
    });

    test('Deve retornar erro ao tentar autenticar um usuário não registrado', async () => {
        const response = await request(app)
            .post('/autenticar')
            .send({ nome: 'Nome Inexistente', senha: 'qualquerSenha' });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Credenciais inválidas.');
    });

    test('Deve retornar erro ao tentar registrar um usuário com nome já cadastrado', async () => {
        await request(app)
            .post('/registrar')
            .send({ nome: 'Willian Raniere', email: 'willianraniere4@gmail.com', senha: 'Wrbds' });

        const response = await request(app)
            .post('/registrar')
            .send({ nome: 'Willian Raniere', email: 'willianraniere5@gmail.com', senha: 'Wrbds2' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nome de usuário já cadastrado.');
    });
});