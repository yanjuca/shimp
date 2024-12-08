import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './components/Cadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Outras rotas aqui */}
      </Routes>
    </Router>
  );
}

export default App;
