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
            state.taskList.push(action.payload);
        },
        editTask: (state, action) => {
            const { id, title, description, status } = action.payload;
            const taskIndex = state?.taskList.findIndex((task) => task.id === id);

            if (taskIndex >= 0) {
                state.taskList[taskIndex] = { ...state.taskList[taskIndex], title, description, status };
            }
        },
        deleteTask: (state, action) => {
            state.taskList = state.taskList.filter((task) => task.id !== action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addTask, editTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer