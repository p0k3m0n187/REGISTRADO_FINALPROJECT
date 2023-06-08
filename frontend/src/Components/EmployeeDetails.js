import { useState } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";

// date fns
//import formatDistanceToNow from "date-fns/formatDistanceToNow";

const EmployeeDetails = ({ employee }) => {
  const { dispatch } = useEmployeeContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState(employee);

  const handleDelete = async () => {
    const response = await fetch("/api/employee/" + employee._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_EMPLOYEE", payload: json });
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
  };

  const handleSave = async () => {
    const response = await fetch("/api/employee/" + updatedEmployee._id, {
      method: "PUT",
      body: JSON.stringify(updatedEmployee),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_EMPLOYEE", payload: json });
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setUpdatedEmployee(employee);
    setIsUpdating(false);
  };

  const handleChange = (e) => {
    setUpdatedEmployee({
      ...updatedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="Employee-details">
      <h4>{employee.position}</h4>
      {isUpdating ? (
        <>
          <input
            type="text"
            name="position"
            value={updatedEmployee.position}
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstname"
            value={updatedEmployee.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            value={updatedEmployee.lastname}
            onChange={handleChange}
          />
          <input
            type="number"
            name="salary"
            value={updatedEmployee.salary}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
        
          <p>
            <strong>FirstName: </strong>
            {employee.firstname}
          </p>
          <p>
            <strong>LastName: </strong>
            {employee.lastname}
          </p>
          <p>
            <strong>Salary: </strong>
            {employee.salary}
          </p>
          {/* <p>
            {formatDistanceToNow(new Date(employee.createdAt), {
              addSuffix: true,
            })}
          </p> */}
          <span onClick={handleDelete}>Delete</span>
          <button
            style={{ color: "black" }}
            size="small"
            onClick={handleUpdate}>
            Update
          </button>
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;