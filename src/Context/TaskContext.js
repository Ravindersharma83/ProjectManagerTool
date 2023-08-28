import React, { createContext, useContext, useReducer } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
  };

  const taskReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TASKS':
        return {
          ...state,
          tasks: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);  // pass reducer and initial value

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
