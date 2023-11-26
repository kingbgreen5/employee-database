const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Welcome1',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
















module.exports = { viewAllDepartments, addDepartment};