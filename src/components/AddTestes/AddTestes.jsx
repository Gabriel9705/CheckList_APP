import Cookies from 'js-cookie';
import { useState, useEffect, useContext } from 'react';
import { ErrorSpan } from '../../schema/ErrosStyled';
import { postTeste } from '../../services/testes.service';
import { getAllGrupos, getAllSubGrupos } from '../../services/grupos.service';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const AddTestes = ({grupoFiltro, subGrupoFiltro}) => {
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
        const grupoNome = grupos.find(grupo => grupo._id === grupoFiltro)?.nome;
        const subGrupoNome = subGrupos.find(subGrupo => subGrupo._id === subGrupoFiltro).nome;

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
        const responseG = await getAllGrupos(); // Endpoint para buscar grupos
        const responseSG = await getAllSubGrupos(); // Endpoint para buscar grupos
        setGrupos(responseG.data);
        setSubGrupos(responseSG.data);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    };

    fetchGrupos();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
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
