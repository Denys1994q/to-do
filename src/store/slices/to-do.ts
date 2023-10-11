import { createSlice } from "@reduxjs/toolkit";

export interface Task {
    id: string,
    title: string,
    description: string,
    status: number
}

const initialState = {
    tasks: [
        {
            id: '1',
            title: "Зробити справу 1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, quisquam temporibus.",
            status: 1,
        },
        {
            id: '2',
            title: "Зробити справу 2",
            description: "Lorem ipsum dolor sit",
            status: 0,
        },
    ] as Task[]
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
    },
})

const { actions, reducer } = ToDoSlice;

export default reducer;

export const {toDo_addTask} = actions;