import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import H1 from "../headings/h1/H1";
import { styled } from "styled-components";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import AddTaskModal from "../modals/add-task-modal/Add-task-modal";
import EditTaskModal from "../modals/edit-task-modal/Edit-task-modal";
import { Task } from "../../store/slices/to-do";
import { toDo_addTask, toDo_removeTask, toDo_editTask, toDo_filterTasks } from "../../store/slices/to-do";
import Select from "../inputs/select/Select";

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
const FilterPanel = styled.div`
    width: 20rem;
    margin: 0 0 2rem auto;
`;

const ToDo = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: any) => state.ToDoSlice.tasks);
    const filteredTasks = useSelector((state: any) => state.ToDoSlice.filteredTasks);
    const [show, setShow] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTaskData, setEditTaskData] = useState({
        id: "",
        title: "",
        description: "",
        status: 0,
    });
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        dispatch(toDo_filterTasks(activeFilter));
    }, [tasks]);

    const buttonStyle = {
        fontSize: "1.8rem",
    };
    const listItemStyle = {
        padding: "1rem",
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    };
    const handleAddTask = (task: Task) => {
        dispatch(toDo_addTask(task));
        setActiveFilter("all");
    };

    const handleEditModalShow = (item: Task) => {
        setEditTaskData({
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status,
        });
        setShowEditModal(true);
    };
    const handleEditModalClose = () => setShowEditModal(false);

    const removeTask = (id: string) => {
        dispatch(toDo_removeTask(id));
    };

    const handleSaveTask = (task: Task) => {
        dispatch(toDo_editTask(task));
        handleEditModalClose();
    };

    const handleChange = (filter: string) => {
        setActiveFilter(filter);
        dispatch(toDo_filterTasks(filter));
    };

    useEffect(() => {
        dispatch(toDo_filterTasks("all"));
    }, []);

    return (
        <>
            <Header>
                <H1 text='To Do List' />
                <Button variant='dark' style={buttonStyle} onClick={handleShow}>
                    Додати завдання
                </Button>
            </Header>
            <FilterPanel>
                <Select handleChange={handleChange} activeFilter={activeFilter} />
            </FilterPanel>

            {filteredTasks.length > 0 ? (
                <ListGroup variant='flush' style={{ maxHeight: "40rem", overflowY: "auto" }}>
                    {filteredTasks.map((item: any) => {
                        return (
                            <ListGroup.Item style={listItemStyle} variant='light' action>
                                <ListItem>
                                    <ItemMain>
                                        <ItemHeading>{item.title}</ItemHeading>
                                        <p>{item.description}</p>
                                    </ItemMain>
                                    <ActionsBtnsWrapper>
                                        <EditButton variant='dark' onClick={() => handleEditModalShow(item)}>
                                            &#9998;
                                        </EditButton>
                                        <DeleteButton variant='danger' onClick={() => removeTask(item.id)}>
                                            &#128465;
                                        </DeleteButton>
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
            ) : (
                <ItemHeading>Немає доданих завдань</ItemHeading>
            )}

            <AddTaskModal show={show} handleClose={handleClose} handleAddTask={handleAddTask} />
            <EditTaskModal
                show={showEditModal}
                handleClose={handleEditModalClose}
                editTaskData={editTaskData}
                handleSaveTask={handleSaveTask}
            />
        </>
    );
};

export default ToDo;
