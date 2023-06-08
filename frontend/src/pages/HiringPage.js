import { useEffect } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import EmployeeDetails from "../Components/EmployeeDetails";


const HiringPage = () => {
  const { employee, dispatch } = useEmployeeContext();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/api/employee");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EMPLOYEE", payload: json });
      }
    };

    fetchEmployees();
  }, [dispatch]);

  return (
    <div className="HiringPage">
      <h2>Employee Information</h2>
      <div className="Employees">
        {employee &&
          employee.map((employee) => (
            <EmployeeDetails
              key={employee._id}
              employee={employee}
              showDetails
            />
          ))}
      </div>
    </div>
  );
};

export default HiringPage;