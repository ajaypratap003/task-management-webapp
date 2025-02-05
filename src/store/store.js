import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskSlice'


// Middleware to save state to localStorage
const saveToLocalStorage = store => next => action => {
    const result = next(action);
    localStorage.setItem('store', JSON.stringify(store.getState()));
    return result;
  };
  
  // Function to load state from localStorage
  const loadFromLocalStorage = () => {
    const stateStr = localStorage.getItem('store');
    return stateStr ? JSON.parse(stateStr) : undefined;
  };
  
  // Configure store
  export const store = configureStore({
    reducer: {
        task: taskReducer,
    },
    preloadedState: loadFromLocalStorage(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saveToLocalStorage)
  });


console.log(store);