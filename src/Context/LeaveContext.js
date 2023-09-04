import React, { createContext, useContext, useReducer } from 'react';

const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const initialState = {
    leaves: [],
  };

  const leaveReducer = (state, action) => {
    switch (action.type) {
      case 'SET_LEAVES':
        return {
          ...state,
          leaves: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(leaveReducer, initialState);  // pass reducer and initial value

  return (
    <LeaveContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeaveContext = () => {
  return useContext(LeaveContext);
};
