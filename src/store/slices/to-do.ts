import { createSlice } from "@reduxjs/toolkit";

export interface Task {
    id: string,
    title: string,
    description: string,
    status: number
}

const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

const initialState = {
    tasks: savedTasks as Task[],
    filteredTasks: [] as Task[]
};

const ToDoSlice = createSlice({
    name: "toDo",
    initialState,
    reducers: {
        toDo_addTask: (state, action) => {
            state.tasks.push(action.payload as Task);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        toDo_removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task: Task) =>  task.id !== action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        toDo_editTask: (state, action) => {
            const editedTask = action.payload as Task;
            const taskIndex = state.tasks.findIndex((task) => task.id === editedTask.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = editedTask;
                localStorage.setItem("tasks", JSON.stringify(state.tasks));
            }
        },
        toDo_filterTasks: (state, action) => {
            if (action.payload == 'all') {
                state.filteredTasks = state.tasks
            } else {
                state.filteredTasks = state.tasks.filter((task: Task) => task.status == action.payload)
            }
        }
    },
})

const { actions, reducer } = ToDoSlice;

export default reducer;

export const {toDo_addTask, toDo_removeTask, toDo_editTask, toDo_filterTasks} = actions;