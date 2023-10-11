import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Task {
    id: string,
    title: string,
    description: string,
    status: number
}

const initialState = {
    tasks: [
        {
            id: uuidv4(),
            title: "Зробити справу 1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, quisquam temporibus.",
            status: 1,
        },
        {
            id: uuidv4(),
            title: "Зробити справу 2",
            description: "Lorem ipsum dolor sit",
            status: 0,
        },
    ] as Task[],
    filteredTasks: [] as Task[]
};

const ToDoSlice = createSlice({
    name: "toDo",
    initialState,
    reducers: {
        toDo_addTask: (state, action) => {
            state.tasks.push(action.payload as Task);
        },
        toDo_removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task: Task) =>  task.id !== action.payload);
        },
        toDo_editTask: (state, action) => {
            const editedTask = action.payload as Task;
            const taskIndex = state.tasks.findIndex((task) => task.id === editedTask.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = editedTask;
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