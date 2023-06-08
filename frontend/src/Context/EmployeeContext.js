import { createContext, useReducer } from "react";
//import { post } from "../../../backend/routes/employee";

export const EmployeeContext = createContext()

export const employeeReducer = (state, action) => {
    switch(action.type){
        case 'SET_EMPlOYEE':
            return{
                employee: action.payload
            }
        case 'CREATE_EMPLOYEE':
            return{
                employee: [action.payload, ...state.employee]
            }
        case 'DELETE_EMPLOYEE':
            return{
                employee: state.employee.filter((w) => w.id !== action.payload._id)
            }
         case 'UPDATE_EMPLOYEE':
            return {
                ...state,
                employee: state.employee.map((employee) =>
                employee._id === action.payload._id ? action.payload : employee
                 )
            };
        default:
            return Array.isArray(state) ? state : [];
           // return state
    }
}

export const EmployeesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(employeeReducer, []);

    return(
        <EmployeeContext.Provider value = {{...state, dispatch}}>
            {children}
        </EmployeeContext.Provider>
    )
}