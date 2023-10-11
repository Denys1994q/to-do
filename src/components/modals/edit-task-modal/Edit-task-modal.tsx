import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { styled } from "styled-components";

const EditTaskModal = ({ show, handleClose }: any): JSX.Element => {
    const CustomModal = styled(Modal)`
        .modal-title {
            font-size: 24px;
        }
        .modal-body,
        .modal-footer {
            font-size: 18px;
        }
    `;
    const CustomButton: any = styled(Button)`
        font-size: 18px;
    `;

    return (
        <CustomModal show={show} onHide={handleClose} animation={false} centered>
            <CustomModal.Header closeButton>
                <CustomModal.Title>Редагувати завдання</CustomModal.Title>
            </CustomModal.Header>
            <CustomModal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control type='email' placeholder='name@example.com' autoFocus />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                        <Form.Label>Опис</Form.Label>
                        <Form.Control as='textarea' rows={3} />
                    </Form.Group>
                    <Form.Check
                        type='checkbox'
                        label='Виконано'
                        // checked={item.status === 1}
                        // onChange={() => changeStatusOnClick(item)}
                    />
                </Form>
            </CustomModal.Body>
            <CustomModal.Footer>
                <CustomButton variant='secondary' onClick={handleClose}>
                    Закрити
                </CustomButton>
                <CustomButton variant='primary' onClick={handleClose}>
                    Зберегти
                </CustomButton>
            </CustomModal.Footer>
        </CustomModal>
    );
};

export default EditTaskModal;
