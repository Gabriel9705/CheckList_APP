import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormAddTeste from '../Forms/FormAddTeste/FormAddTeste';

const ModalExemple = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary mt-2 space" onClick={handleShow}>
                Cadastrar Novo Grupo
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{
                        color: 'black'
                    }}>Cadastrar novo Grupo e SubGrupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAddTeste />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalExemple;
