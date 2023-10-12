import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { styled } from "styled-components";
import { Task } from "../../../store/slices/to-do";

const CustomModal = styled(Modal)`
    .modal-title {
        font-size: 2.4rem;
    }
    .modal-body,
    .modal-footer {
        font-size: 1.8rem;
    }
`;
const CustomButton: any = styled(Button)`
    font-size: 1.8rem;
    display: block;
    margin-left: auto;
`;

interface EditTaskModalProps {
    show: boolean;
    handleClose: () => void;
    editTaskData: Task;
    handleSaveTask: (task: Task) => void;
}

const EditTaskModal = ({ show, handleClose, editTaskData, handleSaveTask }: EditTaskModalProps): JSX.Element => {
    const [titleValue, setTitleValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [statusValue, setStatusValue] = useState(0);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setTitleValue(editTaskData.title);
        setDescValue(editTaskData.description);
        setStatusValue(editTaskData.status);
    }, [editTaskData]);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            const editedTask: Task = {
                id: editTaskData.id,
                title: titleValue,
                description: descValue,
                status: statusValue,
            };
            handleSaveTask(editedTask);
        }
    };

    return (
        <CustomModal show={show} onHide={handleClose} animation={false} centered>
            <CustomModal.Header closeButton>
                <CustomModal.Title>Редагувати завдання</CustomModal.Title>
            </CustomModal.Header>
            <CustomModal.Body>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Введіть назву завдання'
                            value={titleValue}
                            onChange={e => setTitleValue(e.target.value)}
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
                            style={{ fontSize: "16px" }}
                            value={descValue}
                            onChange={e => setDescValue(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Check
                        type='checkbox'
                        label='Виконано'
                        checked={statusValue ? true : false}
                        onChange={e => setStatusValue(e.target.checked ? 1 : 0)}
                    />
                    <CustomButton variant='primary' type='submit'>
                        Зберегти
                    </CustomButton>
                </Form>
            </CustomModal.Body>
        </CustomModal>
    );
};

export default EditTaskModal;
