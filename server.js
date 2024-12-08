import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bcrypt from 'bcrypt'; // Para criptografia de senhas

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Rota para criar um novo usuário (com criptografia de senha)
app.post('/usuarios', async (req, res) => {
  try {
    // Criptografa a senha com um salt de 10
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const novoUsuario = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword, // Salva a senha criptografada
        cpf: req.body.cpf,
        phone: req.body.phone,
      },
    });

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      usuario: novoUsuario,
    });
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target.includes('email')) {
      return res.status(400).json({
        error: 'O email informado já está cadastrado.',
      });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Rota para listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});
// Rota para login (com verificação de senha criptografada)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
// Busca o usuário pelo email no banco de dados
    const usuario = await prisma.user.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({
        error: 'E-mail ou senha incorretos.',
      });
    }

    // Compara a senha fornecida com a senha criptografada no banco
    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (passwordMatch) {
      res.status(200).json({
        message: 'Login realizado com sucesso!',
      });
    } else {
      res.status(401).json({
        error: 'E-mail ou senha incorretos.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});
// Rota para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o usuário existe antes de deletar
    const usuario = await prisma.user.findUnique({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    await prisma.user.delete({ where: { id } });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar o usuário.' });
  }
});

// Inicializa o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
