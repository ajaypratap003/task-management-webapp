import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    taskList: []
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state?.taskList.push(action.payload);
        },
        editTask: (state, action) => {
            const { id, title, description } = action.payload;

            state?.taskList.map((task) => {
                if (task.id === id) {
                    return { title, description };
                }
                return task;
            });
        },
        deleteTask: (state, action) => {
            state?.taskList.filter((task) => task.id !== action.id);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addTask, editTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer