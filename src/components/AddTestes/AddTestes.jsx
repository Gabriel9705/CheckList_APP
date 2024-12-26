import Cookies from 'js-cookie';
import { useState, useEffect, useContext } from 'react';
import { ErrorSpan } from '../../schema/ErrosStyled';
import { postTeste } from '../../services/testes.service';
import { getAllGrupos, getSubGrupoPorGrupo } from '../../services/grupos.service';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { loggedUser } from '../../services/user.service';
import Loading from '../Loading/Loading';

const AddTestes = () => {
  const { user } = useContext(UserContext);
  const [filtros, setFiltros] = useState({ grupo: "", subGrupo: "" });
  const [formValues, setFormValues] = useState({
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [subGrupos, setSubGrupos] = useState([]);
  const [errors, setErrors] = useState({});

  // Função para gerenciar mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Se o campo do grupo ou subgrupo mudar, atualizar os filtros
    if (name === 'grupo') {
      setFiltros({ grupo: value, subGrupo: "" }); // Limpa subgrupo ao trocar de grupo
    } else if (name === 'subGrupo') {
      setFiltros((prevFiltros) => ({ ...prevFiltros, subGrupo: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.grupo) {
      newErrors.grupo = "O grupo é obrigatório.";
    }
    if (!formValues.subGrupo) {
      newErrors.subGrupo = "O subgrupo é obrigatório.";
    }
    if (!formValues.description) {
      newErrors.description = "A descrição é obrigatória.";
    }
    if (formValues.description === '') {
      newErrors.tecnico = "O teste não pode estar vazio.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        // Mapeia o ID para o nome do grupo e subgrupo
        const grupoNome = grupos.find(grupo => grupo._id === formValues.grupo)?.nome;
        const subGrupoNome = subGrupos.find(subGrupo => subGrupo.nome === formValues.subGrupo)?.nome;

        const testeData = {
          grupoNome: grupoNome, // Nome do grupo
          subGrupoNome: subGrupoNome, // Nome do subgrupo
          description: formValues.description[0].toUpperCase() + formValues.description.substring(1),
          resultado: "Não Testado" // Campo fixo
        };

        await postTeste(testeData); // Enviar os dados
        alert("Teste adicionado com sucesso!");
        navigate("/")
        setFormValues({ grupo: "", subGrupo: "", description: "" }); // Resetar o formulário
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      } finally{
        setLoading(false)
      }
    }
  };

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
    if (formValues.grupo) {
      const fetchSubGrupos = async () => {
        try {
          const response = await getSubGrupoPorGrupo(formValues.grupo); // Buscar subgrupos pelo grupo selecionado
          setSubGrupos(response.data);
        } catch (error) {
          console.error("Erro ao buscar subgrupos:", error);
        }
      };

      fetchSubGrupos();
    } else {
      setSubGrupos([]); // Limpar subgrupos se nenhum grupo estiver selecionado
    }
  }, [formValues.grupo]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <strong>Nome do Técnico:</strong>
        <input
          type="text"
          className="form-control"
          name="tecnico"
          placeholder={user.name}
          value={formValues.user}
          onChange={handleInputChange}
          disabled
        />
      </div>

      {/* Dropdown para selecionar Grupo */}
      <div className="form-group">
        <label htmlFor='grupo'>Selecione um Grupo:</label>
        <select
          className="form-control"
          id="grupo"
          name="grupo"
          value={formValues.grupo}
          onChange={handleInputChange}
        >
          <option value="">Selecione um grupo</option>
          {grupos.map((grupo) => (
            <option key={grupo._id} value={grupo._id}>
              {grupo.nome}
            </option>
          ))}
        </select>
      </div>
      {errors.grupo && <ErrorSpan>{errors.grupo}</ErrorSpan>}

      {/* Dropdown para selecionar SubGrupo */}
      <div className="form-group">
        <label htmlFor="subGrupo">Selecione um SubGrupo:</label>
        <select
          className="form-control"
          id="subGrupo"
          name="subGrupo"
          value={formValues.subGrupo}
          onChange={handleInputChange}
          disabled={subGrupos.length === 0}
        >
          <option value="">{subGrupos.length === 0 ? "Nenhum subGrupo encontrado" : "Selecione um subgrupo..."}</option>
          {subGrupos.map((subGrupo) => (
            <option key={subGrupo._id} value={subGrupo.nome}>
              {subGrupo.nome}
            </option>
          ))}
        </select>
      </div>
      {errors.subGrupo && <ErrorSpan>{errors.subGrupo}</ErrorSpan>}

      <div className="form-group">
        <strong>Caso de uso:</strong>
        <input
          type="text"
          className="form-control"
          placeholder="Descrição do teste a ser realizado"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
        />
        {errors.description && <ErrorSpan>{errors.description}</ErrorSpan>}
        <button className="btn btn-primary mt-2" type="submit">Adicionar Teste</button>
      </div>
      {loading && <Loading />}
    </form>
  );
};

export default AddTestes;
