import React, { useEffect,useState,useRef } from 'react';
import axios from 'axios';
import api from '../services/api';
import '../styles/cadastro.css';



function Cadastro() {
  const[users,setUsers]= useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Enviando dados:', formData); // Verifique se os dados aparecem no console
  
      const response = await api.post('/usuarios', formData);
      alert('Usuário cadastrado com sucesso!');
      console.log('Resposta da API:', response.data);
  
      // Limpar o formulário após o envio
      setFormData({
        name: '',
        email: '',
        password: '',
        cpf: '',
        phone: '',
      });
  
      // Redirecionar para a página de login após cadastro
      window.location.href = '/login';  // Aqui você pode usar a navegação correta com React Router
  
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert(error.response?.data?.error || 'Erro ao cadastrar usuário. Tente novamente.');
    }
  };
  
  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>E-mail:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          maxLength="11"
          required
        />
        <label>Telefone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
