import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { styled } from "styled-components";
import { v4 as uuidv4 } from "uuid";

const CustomModal = styled(Modal)`
    .modal-title {
        font-size: 24px;
    }
    .modal-body,
    .modal-footer {
        font-size: 18px;
    }
`;
const AddButton: any = styled(Button)`
    font-size: 18px;
    display: block;
    margin-left: auto;
`;

const AddTaskModal = ({ show, handleClose, handleAddTask }: any): JSX.Element => {
    const [titleValue, setTitleValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [statusValue, setStatusValue] = useState(0);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            handleAddTask({ title: titleValue, description: descValue, status: statusValue, id: uuidv4() });
            setValidated(false);
            setTitleValue("");
            setDescValue("");
            setStatusValue(0);
            handleClose();
        }
    };

    return (
        <CustomModal show={show} onHide={handleClose} animation={false} centered enforceFocus={false}>
            <CustomModal.Header closeButton>
                <CustomModal.Title>Нове завдання</CustomModal.Title>
            </CustomModal.Header>
            <CustomModal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Введіть назву завдання'
                            value={titleValue}
                            onChange={(e: any) => setTitleValue(e.target.value)}
                            style={{ fontSize: "16px" }}
                            autoFocus
                        />
                        <Form.Control.Feedback type='invalid'>Вкажіть назву завдання.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                        <Form.Label>Опис</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            value={descValue}
                            style={{ fontSize: "16px" }}
                            onChange={(e: any) => setDescValue(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Check
                        type='checkbox'
                        label='Виконано'
                        checked={statusValue ? true : false}
                        onChange={e => setStatusValue(e.target.checked ? 1 : 0)}
                    />
                    <AddButton variant='primary' type='submit'>
                        Додати
                    </AddButton>
                </Form>
            </CustomModal.Body>
        </CustomModal>
    );
};

export default AddTaskModal;
