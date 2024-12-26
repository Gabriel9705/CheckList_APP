import { useState } from 'react';
import AddTestes from '../AddTestes/AddTestes';

const CollapseExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container mt-4">
            <button
                className="btn btn-primary"
                type="button"
                onClick={toggleCollapse}
                aria-expanded={isOpen}
                aria-controls="collapseExample"
            >
                {isOpen ? 'Esconder' : 'Mostrar'} Adição de Grupos e SubGrupos para os Testes
            </button>

            <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseExample">
                <div className="card card-body mt-3">
                   <AddTestes/>
                </div>
            </div>
        </div>
    );
};

export default CollapseExample;
