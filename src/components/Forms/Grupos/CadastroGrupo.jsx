import { useState } from 'react';
import { postGrupo } from '../../../services/grupos.service';
import Loading from '../../Loading/Loading';

const CadastroGrupo = () => {
    const [nomeGrupo, setNomeGrupo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const resGrupoNome = { nome: nomeGrupo[0].toUpperCase() + nomeGrupo.substring(1) };
            await postGrupo(resGrupoNome);
            alert('Grupo cadastrado com sucesso!');
            setNomeGrupo('');
        } catch (error) {
            alert(error)
            console.error('Erro ao cadastrar grupo:', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-grupo'>
                <label>Nome do Grupo:</label>
                <input
                    type="text"
                    className='form-control'
                    value={nomeGrupo}
                    placeholder='Adicionar novo grupo...'
                    onChange={(e) => setNomeGrupo(e.target.value)}
                    required
                />
                <button type="submit" className='btn btn-success mt-2'>Cadastrar Grupo</button>
            </div>
            {loading && <Loading />}
        </form>
    );
};

export default CadastroGrupo;
