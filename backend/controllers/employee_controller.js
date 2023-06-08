const Employee = require('../models/employee_model')
const mongoose = require('mongoose')

//get all employees
const getEmployees = async(req,res) =>{
    const employee = await Employee.find({}).sort({createdAt: -1})

    res.status(200).json(employee)
}

//get single employee
const getEmployee = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Employee'})
    }

    const employee = await Employee.findById(id)

    if(!employee){
        return res.status(404).json({error: 'No such Employee'})
    }

    res.status(200).json(employee)
}

//create a new employee
const createEmployee = async (req, res) => {
    const {firstname,lastname,position,salary} = req.body

    let emptyFields = []

    if(!position) {
        emptyFields.push('position')
    }
    if(!firstname) {
        emptyFields.push('firstname')
    }
    if(!lastname) {
        emptyFields.push('lastname')
    }
    if(!salary) {
        emptyFields.push('salary')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill all the Fields', emptyFields})
    }
    

    //add to mongoDB
    try {
        const employee = await Employee.create({firstname,lastname,position,salary})
        res.status(200).json(employee)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete an employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Employee'})
    }

    const employee = await Employee.findOneAndDelete({_id: id})

    if(!employee){
        return res.status(404).json({error: 'No such Employee'})
    }

    res.status(200).json(employee)
}

//update an employee

const updateEmployee = async (req, res) => {
    const { id: _id } = req.params;
    const employee = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: 'No such Employee' });
    }
  
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id }, // Corrected: Add object with _id field as the first argument
      employee,
      { new: true }
    );
  
    if (!updatedEmployee) { // Corrected: Check updatedEmployee instead of employee
      return res.status(400).json({ error: 'No such Employee' });
    }
  
    res.status(200).json(updatedEmployee);
  };

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee
}