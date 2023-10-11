import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import H1 from "../headings/h1/H1";
import { styled } from "styled-components";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import AddTaskModal from "../modals/add-task-modal/Add-task-modal";
import EditTaskModal from "../modals/edit-task-modal/Edit-task-modal";
import { Task } from "../../store/slices/to-do";
import { toDo_addTask } from "../../store/slices/to-do";

const ActionsBtnsWrapper: any = styled.div`
    font-size: 1.8rem;
    visibility: hidden;
    display: flex;
    gap: 1rem;
`;
const EditButton: any = styled(Button)`
    font-size: 1.8rem;
`;
const DeleteButton: any = styled(Button)`
    font-size: 1.8rem;
`;
const ListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:last-child) {
        margin-bottom: 2rem;
    }
    &:hover ${ActionsBtnsWrapper} {
        visibility: visible;
    }
`;
const ItemMain = styled.div`
    width: 70%;
`;
const ItemStatus = styled.p``;
const ItemHeading = styled.h2`
    font-size: 2.2rem;
    margin-bottom: 1rem;
`;
const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const buttonStyle = {
    fontSize: "1.8rem",
};
const listItemStyle = {
    padding: "1rem",
};

const ToDo = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: any) => state.ToDoSlice.tasks);
    const [show, setShow] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    };
    const handleAddTask = (task: Task) => {
        setShow(false);
        dispatch(toDo_addTask(task));
    };

    const handleEditModalShow = () => setShowEditModal(true);
    const handleEditModalClose = () => setShowEditModal(false);

    return (
        <>
            <Header>
                <H1 text='To Do List' />
                <Button variant='dark' style={buttonStyle} onClick={handleShow}>
                    Додати завдання
                </Button>
            </Header>
            <ListGroup variant='flush'>
                {tasks.map((item: any) => {
                    return (
                        <ListGroup.Item style={listItemStyle} variant='light' action>
                            <ListItem>
                                <ItemMain>
                                    <ItemHeading>{item.title}</ItemHeading>
                                    <p>{item.description}</p>
                                </ItemMain>
                                <ActionsBtnsWrapper>
                                    <EditButton variant='dark' onClick={handleEditModalShow}>
                                        &#9998;
                                    </EditButton>
                                    <DeleteButton variant='danger'>&#128465;</DeleteButton>
                                </ActionsBtnsWrapper>
                                <ItemStatus>
                                    {item.status === 1 ? (
                                        <Button variant='success' style={buttonStyle}>
                                            &#10004;
                                        </Button>
                                    ) : (
                                        <Button variant='danger' style={buttonStyle}>
                                            &#10008;
                                        </Button>
                                    )}
                                </ItemStatus>
                            </ListItem>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <AddTaskModal show={show} handleClose={handleClose} handleAddTask={handleAddTask} />
            <EditTaskModal show={showEditModal} handleClose={handleEditModalClose} />
        </>
    );
};

export default ToDo;
