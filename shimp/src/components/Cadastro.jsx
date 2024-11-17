import React, { useState } from 'react';

function Cadastro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    birthDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrando usuário:', formData);
    // Enviar os dados para a API/backend
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
        <label>Data de Nascimento:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
