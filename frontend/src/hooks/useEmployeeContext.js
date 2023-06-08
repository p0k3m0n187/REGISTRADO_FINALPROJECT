import { EmployeeContext } from "../Context/EmployeeContext";
import { useContext } from "react";

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext)

    if (!context) {
        throw Error('useEmployeeContext must be used inside an EmployeeContextProvider')
    }

    return context
}