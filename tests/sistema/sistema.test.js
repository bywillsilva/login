const request = require('supertest');
const { app } = require('./../../index');

describe('Testes de Sistema - Registro e Autenticação de Usuário', () => {


    test('Deve registrar um usuário com sucesso', async () => {
        const response = await request(app)
            .post('/registrar')
            .send({
                nome: 'Willian Raniere',
                email: 'willianraniere4@gmail.com',
                senha: 'Wrbds'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuário registrado com sucesso!');
    });

    test('Deve falhar ao registrar um usuário com email já cadastrado', async () => {
        await request(app)
            .post('/registrar')
            .send({
                nome: 'Willian Raniere',
                email: 'willianraniere4@gmail.com',
                senha: 'Wrbds'
            });

        const response = await request(app)
            .post('/registrar')
            .send({
                nome: 'Outro Nome',
                email: 'willianraniere4@gmail.com',
                senha: 'outraSenha'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email já cadastrado.');
    });

    test('Deve falhar ao registrar um usuário sem email', async () => {
        const response = await request(app)
            .post('/registrar')
            .send({
                nome: 'Willian Raniere',
                senha: 'Wrbds'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email é obrigatório.');
    });

    test('Deve autenticar um usuário com credenciais válidas', async () => {
        await request(app)
            .post('/registrar')
            .send({
                nome: 'Willian Raniere',
                email: 'willianraniere4@gmail.com',
                senha: 'Wrbds'
            });

        const response = await request(app)
            .post('/autenticar')
            .send({
                nome: 'Willian Raniere',
                senha: 'Wrbds'
            });

        expect(response.status).toBe(302);
    });

    test('Deve falhar ao autenticar um usuário com senha inválida', async () => {
        await request(app)
            .post('/registrar')
            .send({
                nome: 'Willian Raniere',
                email: 'willianraniere4@gmail.com',
                senha: 'Wrbds'
            });

        const response = await request(app)
            .post('/autenticar')
            .send({
                nome: 'Willian Raniere',
                senha: 'senhaIncorreta'
            });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Credenciais inválidas.');
    });

    test('Deve falhar ao autenticar um usuário não registrado', async () => {
        const response = await request(app)
            .post('/autenticar')
            .send({
                nome: 'Nome Inexistente',
                senha: 'qualquerSenha'
            });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Credenciais inválidas.');
    });
});
