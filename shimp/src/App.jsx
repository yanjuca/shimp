import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './components/Cadastro';  // Importando o componente Cadastro corretamente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />  // Rota para o componente Cadastro
        {/* Outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
