const express = require('express')
const {
    getEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee
} = require('../controllers/employee_controller')

const router = express.Router()

//Get all employees
router.get('/', getEmployees)

//Get a single employee
router.get('/:id', getEmployee)

//POST a new employee
router.post('/', createEmployee)

//Delete a employee
router.delete('/:id', deleteEmployee)

//Update PUT a employee
router.put('/:id', updateEmployee)


module.exports = router