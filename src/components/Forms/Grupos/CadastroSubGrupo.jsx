import { useEffect, useState } from 'react';
import { getAllGrupos, postSubGrupo } from '../../../services/grupos.service';
import Loading from '../../Loading/Loading';

const CadastroSubGrupo = () => {
    const [nomeSubGrupo, setNomeSubGrupo] = useState('');
    const [grupoId, setGrupoId] = useState('');
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(false);

    // Função para carregar grupos existentes
    const carregarGrupos = async () => {
        try {
            const response = await getAllGrupos();
            setGrupos(response.data);
        } catch (error) {
            console.error('Erro ao carregar grupos:', error);
        }
    };

    useEffect(() => {
        carregarGrupos();
    }, []);

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const resSubGrupoNome = ({ nome: nomeSubGrupo[0].toUpperCase() + nomeSubGrupo.substring(1), grupoId });
            await postSubGrupo(resSubGrupoNome);
            alert('Subgrupo cadastrado com sucesso!');
            setNomeSubGrupo('');
            setGrupoId('');
        } catch (error) {
            console.error('Erro ao cadastrar subgrupo:', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-grupo'>
                <strong style={{
                    color: 'black'
                }}>Nome do SubGrupo:</strong>
                <input
                    type="text"
                    className='form-control'
                    value={nomeSubGrupo}
                    placeholder='Adicionar novo SubGrupo...'
                    onChange={(e) => setNomeSubGrupo(e.target.value)}
                    required
                />
            </div>
            <div className='form-grupo'>
                <strong style={{
                    color: 'black'
                }}>Grupo Associado:</strong>
                <select
                    className='form-control'
                    value={grupoId}
                    onChange={(e) => setGrupoId(e.target.value)}
                    required>
                    <option value="">Associe o subGrupo a um Grupo...</option>
                    {grupos.map((grupo) => (
                        <option key={grupo._id} value={grupo._id}>
                            {grupo.nome}
                        </option>
                    ))}
                </select>
                <button type="submit" className='btn btn-secondary mt-2 space"'>Cadastrar SubGrupo</button>
            </div>
            {loading && <Loading />}
        </form>
    );
};

export default CadastroSubGrupo;
