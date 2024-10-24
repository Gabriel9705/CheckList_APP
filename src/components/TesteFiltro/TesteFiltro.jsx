import { useState, useEffect } from 'react';
import { getAllGrupos, getSubGrupoPorGrupo } from '../../services/listaTestes';

const TesteFiltro = () => {
  const [grupos, setGrupos] = useState([]);
  const [subGrupos, setSubGrupos] = useState([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState("");

  // Buscar grupos ao montar o componente
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await getAllGrupos(); // Endpoint para buscar grupos
        setGrupos(response.data);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    };

    fetchGrupos();
  }, []);

  // Buscar subgrupos quando o grupo for selecionado
  useEffect(() => {
    if (grupoSelecionado) {
      const fetchSubGrupos = async () => {
        try {
          const response = await getSubGrupoPorGrupo(grupoSelecionado); // Endpoint para buscar subgrupos por grupo
          setSubGrupos(response.data);
          console.log(grupoSelecionado);
        } catch (error) {
          console.error("Erro ao buscar subgrupos:", error);
        }
      };

      fetchSubGrupos();
    } else {
      setSubGrupos([]); // Limpar subgrupos se nenhum grupo estiver selecionado
    }
  }, [grupoSelecionado]);

  return (
    <div>
      <div>
        <label htmlFor="grupo">Selecione um Grupo:</label>
        <select
          id="grupo"
          value={grupoSelecionado}
          onChange={(e) => setGrupoSelecionado(e.target.value)}
        >
          <option value="">Selecione um grupo</option>
          {grupos.map((grupo) => (
            <option key={grupo._id} value={grupo._id}>
              {grupo.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="subGrupo">Selecione um SubGrupo:</label>
        <select id="subGrupo" disabled={!grupoSelecionado}>
          <option value="">Selecione um subgrupo</option>
          {subGrupos.map((subGrupo) => (
            <option key={subGrupo._id} value={subGrupo._id}>
              {subGrupo.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TesteFiltro;
