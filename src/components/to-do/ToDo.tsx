import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import H1 from "../headings/h1/H1";
import Select from "../inputs/select/Select";
import AddTaskModal from "../modals/add-task-modal/Add-task-modal";
import EditTaskModal from "../modals/edit-task-modal/Edit-task-modal";
import ConfirmModal from "../modals/confirm-modal/Confirm-modal";
import { Task } from "../../store/slices/to-do";
import { toDo_addTask, toDo_removeTask, toDo_editTask, toDo_filterTasks } from "../../store/slices/to-do";

const ActionsBtnsWrapper = styled.div`
    font-size: 1.8rem;
    visibility: hidden;
    display: flex;
    gap: 1rem;
`;
const ListItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    &:not(:last-child) {
        margin-bottom: 2rem;
    }
    &:hover ${ActionsBtnsWrapper} {
        visibility: visible;
    }

    @media (max-width: 400px) {
        gap: 1rem;
    }
`;
const ItemMain = styled.div`
    width: 70%;

    @media (max-width: 600px) {
        width: 50%;
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`;
const ItemStatus = styled.div``;
const ItemHeading = styled.h2`
    font-size: 2.2rem;
    margin-bottom: 1rem;
`;
const Header = styled.header`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 400px) {
        justify-content: center;
    }
`;
const HeaderTitle = styled.div`
    margin-bottom: 3rem;

    @media (max-width: 400px) {
        width: 100%;
        margin-bottom: 1rem;
    }
`;
const FilterPanel = styled.div`
    width: 20rem;
    margin: 0 0 2rem auto;

    @media (max-width: 400px) {
        margin: 2rem 0 2rem auto;
    }
`;

const ToDo = (): JSX.Element => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: any) => state.ToDoSlice.tasks);
    const filteredTasks = useSelector((state: any) => state.ToDoSlice.filteredTasks);
    const [show, setShow] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [idToDel, setIdToDel] = useState("");
    const [editTaskData, setEditTaskData] = useState({
        id: "",
        title: "",
        description: "",
        status: 0,
    });

    useEffect(() => {
        dispatch(toDo_filterTasks("all"));
    }, []);

    useEffect(() => {
        dispatch(toDo_filterTasks(activeFilter));
    }, [tasks]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
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
        setIdToDel(id);
        setShowConfirmModal(true);
    };
    const confirmDeleting = () => {
        dispatch(toDo_removeTask(idToDel));
        setShowConfirmModal(false);
    };
    const handleSaveTask = (task: Task) => {
        dispatch(toDo_editTask(task));
        handleEditModalClose();
    };
    const handleSelectChange = (filter: string) => {
        setActiveFilter(filter);
        dispatch(toDo_filterTasks(filter));
    };

    const buttonStyle = {
        fontSize: "1.8rem",
    };

    return (
        <>
            <Header>
                <HeaderTitle>
                    <H1 text='To Do List' withBadge withBadgeValue={filteredTasks.length} />
                </HeaderTitle>
                <Button variant='outline-dark' style={buttonStyle} onClick={handleShow}>
                    <span>Додати завдання</span>
                </Button>
            </Header>
            <FilterPanel>
                <Select
                    options={[
                        { value: "all", label: "Всі завдання" },
                        { value: "1", label: "Виконані" },
                        { value: "0", label: "Не виконані" },
                    ]}
                    handleChange={handleSelectChange}
                    activeFilter={activeFilter}
                />
            </FilterPanel>
            {filteredTasks.length > 0 ? (
                <ListGroup variant='flush' style={{ maxHeight: "40rem", overflowY: "auto" }}>
                    {filteredTasks.map((item: any) => {
                        return (
                            <ListGroup.Item key={uuidv4()} style={{ padding: "1rem" }} variant='light' action>
                                <ListItem>
                                    <ItemMain>
                                        <ItemHeading>{item.title}</ItemHeading>
                                        <p>{item.description}</p>
                                    </ItemMain>
                                    <ActionsBtnsWrapper>
                                        <Button
                                            as='span'
                                            variant='dark'
                                            style={{ fontSize: "1.8rem" }}
                                            onClick={() => handleEditModalShow(item)}
                                        >
                                            &#9998;
                                        </Button>
                                        <Button
                                            as='span'
                                            variant='danger'
                                            style={{ fontSize: "1.8rem" }}
                                            onClick={() => removeTask(item.id)}
                                        >
                                            &#128465;
                                        </Button>
                                    </ActionsBtnsWrapper>
                                    <ItemStatus>
                                        {item.status === 1 ? (
                                            <Button as='span' variant='success' style={buttonStyle}>
                                                &#10004;
                                            </Button>
                                        ) : (
                                            <Button as='span' variant='danger' style={buttonStyle}>
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
                <ItemHeading>Немає завдань</ItemHeading>
            )}
            <AddTaskModal show={show} handleClose={handleClose} handleAddTask={handleAddTask} />
            <EditTaskModal
                show={showEditModal}
                handleClose={handleEditModalClose}
                editTaskData={editTaskData}
                handleSaveTask={handleSaveTask}
            />
            <ConfirmModal
                show={showConfirmModal}
                title={"Видалити"}
                text={"Підтвердіть видалення завдання"}
                onConfirm={confirmDeleting}
                handleClose={() => setShowConfirmModal(false)}
            />
        </>
    );
};

export default ToDo;
