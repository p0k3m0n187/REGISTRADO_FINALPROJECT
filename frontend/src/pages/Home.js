import { useEffect } from "react"
import { useEmployeeContext } from '../hooks/useEmployeeContext'

//components
import EmployeeDetails from '../Components/EmployeeDetails'
import EmployeeForm from '../Components/EmployeeForm'


const Home = () => {
    const {employee, dispatch } = useEmployeeContext()

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch('/api/employee')
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_EMPlOYEE', payload: json})
            }
        }


        fetchEmployee()
    },[dispatch])


    return (
        <div className="home"> 
            <div className="Employees">
                {employee && employee.map((employee) => (
                    <EmployeeDetails key = {employee._id} employee = {employee}/>
                ))}
            </div>
            <EmployeeForm/>
        </div>
    )
}

export default Home;