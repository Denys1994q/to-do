import Modal from "react-bootstrap/Modal";
import { styled } from "styled-components";
import Button from "react-bootstrap/Button";

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
    font-size: 16px;
`;

interface ConfirmModalProps {
    show: boolean;
    title: string;
    text: string;
    onConfirm: any;
    handleClose: any;
}

const ConfirmModal = ({ show, title, text, handleClose, onConfirm }: ConfirmModalProps): JSX.Element => {
    return (
        <CustomModal show={show} onHide={handleClose} animation={false}>
            <CustomModal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </CustomModal.Header>
            <CustomModal.Body>
                <p>{text}</p>
            </CustomModal.Body>
            <CustomModal.Footer>
                <CustomButton variant='primary' onClick={onConfirm}>
                    Підтвердити
                </CustomButton>
            </CustomModal.Footer>
        </CustomModal>
    );
};

export default ConfirmModal;
