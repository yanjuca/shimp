import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json()); // Permite trabalhar com JSON no body das requisições

// Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const novoUsuario = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        cpf: req.body.cpf,
        phone: req.body.phone,
      },
    });

    // Retorna o usuário criado com status 201 (Created)
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      usuario: novoUsuario,
    });
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target.includes('email')) {
      // Erro de email duplicado
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
    const usuarios = await prisma.user.findMany(); // Busca todos os usuários no banco
    res.json(usuarios); // Retorna a lista de usuários
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

app.put('/usuarios/:id', async (req, res) => {
   try {
     // Atualizando o usuário pelo ID
     const id = parseInt(req.params.id); // Certifique-se de converter o ID para número (se for INT no banco)
     const usuarioAtualizado = await prisma.user.update({
       where: {
         id: id, // ID do usuário a ser atualizado
       },
       data: {
         email: req.body.email,
         name: req.body.name,
         password: req.body.password,
         cpf: req.body.cpf,
         phone: req.body.phone,
       },
     });
    
     // Retorna o usuário atualizado
     res.status(200).json({
       message: 'Usuário atualizado com sucesso!',
       usuario: usuarioAtualizado,
     });
   } catch (error) {
     // Tratamento de erros
     if (error.code === 'P2025') {
       // Quando o usuário não é encontrado
       return res.status(404).json({
         error: 'Usuário não encontrado.',
       });
     }
     console.error(error);
     res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
   }
});

// Rota para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
   try {
     const id = req.params.id; // Aqui não é necessário converter para inteiro, pois o Prisma espera String
     
     await prisma.user.delete({
       where: {
         id: id, // O ID deve ser passado como string
       },
     });
 
     res.status(200).json({ message: 'Usuário deletado com sucesso!' });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Erro ao deletar o usuário.' });
   }
 });
 
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
