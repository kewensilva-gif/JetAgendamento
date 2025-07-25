import request from 'supertest';
import { app } from '../app';
import { prisma } from '../database/prismaClient';

describe('Autenticação e Registro de Usuário', () => {
  // Limpa o banco de dados de teste após cada teste
  afterEach(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
  });

  // Fecha a conexão com o banco após todos os testes
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve ser capaz de registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: 'Usuário de Teste',
        email: 'teste@exemplo.com',
        password: 'senha123456',
      });

    // Verifica a resposta HTTP
    expect(response.status).toBe(201);
    
    // Verifica se o corpo da resposta tem as propriedades esperadas
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('teste@exemplo.com');
    expect(response.body.name).toBe('Usuário de Teste');

    // Garante que a senha nunca é retornada
    expect(response.body).not.toHaveProperty('password');
  });

  it('não deve ser capaz de registrar um usuário com um email já existente', async () => {
    // Primeiro, cria um usuário para garantir que o email já exista
    await request(app)
      .post('/api/user')
      .send({
        name: 'Usuário Original',
        email: 'duplicado@exemplo.com',
        password: 'senha123456',
      });

    // Depois, tenta criar outro com o mesmo email
    const response = await request(app)
      .post('/api/user')
      .send({
        name: 'Usuário Duplicado',
        email: 'duplicado@exemplo.com',
        passoword: 'outrasenha',
      });
      
    // Espera um status de conflito
    expect(response.status).toBe(409);
    expect(response.body.error).toBe('Email já cadastrado');
  });

  it('deve ser capaz de autenticar um usuário e retornar um token JWT', async () => {
    // Primeiro, registra um usuário
    await request(app)
      .post('/api/user')
      .send({
        name: 'Usuário Login',
        email: 'login@exemplo.com',
        password: 'senhaforte',
      });

    // Depois, tenta fazer login com as credenciais corretas
    const response = await request(app)
      .post('/api/auth')
      .send({
        email: 'login@exemplo.com',
        password: 'senhaforte',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});