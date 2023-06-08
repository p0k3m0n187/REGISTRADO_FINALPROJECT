import { useState } from "react"
import { useEmployeeContext } from '../hooks/useEmployeeContext'

const EmployeeForm = ({ employee }) => {
    const {dispatch} = useEmployeeContext()
    const [position, setPosition] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [salary, setSalary] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const employee = {position, firstname, lastname, salary}

        const response = await fetch('/api/employee', {
            method: 'POST',
            body: JSON.stringify(employee),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setPosition('')
            setFirstname('')
            setLastname('')
            setSalary('')
            setError(null)
            setEmptyFields([])
            console.log("New Employee Added!", json)
            dispatch({type: 'CREATE_EMPLOYEE', payload: json})
        }
    }

    return (
        <form className="Create" onSubmit={handleSubmit}>
            <h3>Registration Form</h3>

            <label>Disability:</label>
            <input
                type="text"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                className={emptyFields.includes('position') ? 'error' : ''}
            />

            <label>First Name:</label>
            <input
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                className={emptyFields.includes('firstname') ? 'error': ''}
            />
            <label>Last Name:</label>
            <input
                type="text"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                className={emptyFields.includes('lastname') ? 'error': ''}
            />
            <label>Salary Per Hour:</label>
            <input
                type="number"
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                className={emptyFields.includes('salary') ? 'error': ''}
            />

            <button>Apply</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EmployeeForm;