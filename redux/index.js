import React, { createContext, useContext, useReducer } from 'react';

const AppStateContext = createContext();

export const useAppState = () => {
    return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }) => {
    const initialState = {
        index:0,
        ID:"",
        Creator:"",
        Date:"",
        name:"",
        price:"",
        update:"",
    };

    const reducer = (state, action) => {
        // Xử lý các action để cập nhật trạng thái
        switch (action.type) {
            case "SET_INDEX": {
                return {
                    ...state,
                    index:action.payload
                }
            }
            case "SET_DATA": {
              return {
                  ...state,
                  ID:action.payload.ID,
                  Creator:action.payload.Creator,
                  Date:action.payload.Date,
                  name:action.payload.name,
                  price:action.payload.price,
                  update:action.payload.update
              }
          }
          case "UPDATE_DATA": {
            return {
                ...state,
                name:action.payload.name,
                price:action.payload.price,
                update:action.payload.update
            }
        }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};