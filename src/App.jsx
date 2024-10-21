import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HeaderCheckList from './components/Forms/HeaderCheckList/HearderCheckList';
import ListaDeTestes from './components/ListaDeTestes/ListaDeTeste';

const App = () => {
  const [modoDark, setModoDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', modoDark);
  }, [modoDark]);

  const toggleModoDark = () => {
    setModoDark((prevModoDark) => !prevModoDark);
  };

  return (
    <div className={`container ${modoDark ? 'dark-mode' : ''}`}>
      <h1 className='checklist'>Checklist de Testes</h1>

      {/* Botão para alternar o modo escuro */}
      <button onClick={toggleModoDark} className="btn btn-secondary mb-3">
        {modoDark ? 'Modo Claro' : 'Modo Escuro'}
      </button>

    <HeaderCheckList />
    <ListaDeTestes/>
    </div>
  );
}

export default App;
