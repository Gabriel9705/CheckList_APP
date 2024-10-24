import { useState } from 'react';
import { postGrupo } from '../../../services/listaTestes';

const CadastroGrupo = () => {
    const [nomeGrupo, setNomeGrupo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resGrupoNome = { nome: nomeGrupo[0].toUpperCase() + nomeGrupo.substring(1) };
            await postGrupo(resGrupoNome);
            alert('Grupo cadastrado com sucesso!');
            setNomeGrupo('');
        } catch (error) {
            console.error('Erro ao cadastrar grupo:', error);
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
        </form>
    );
};

export default CadastroGrupo;
