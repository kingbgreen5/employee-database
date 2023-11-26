
const mysql = require('mysql2');
const inquirer = require('inquirer');
//                                                        FUNCTIONS WHICH PREFORM QUERIES INTO THE DB
// const { viewAllDepartments, addDepartment, writeToFile } = require('./queryfunct/query');


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

const questions = [
  'What would you like to do?'
  ];

function init() {                                           // Initialize 
  inquirer
  .prompt([
      {
          type: 'list',
          message: questions[0],
          name: 'doWhat', 
          choices: ['View Departments', 'View Roles','View Employees','Add a Department', 'Add a Role', 'Add an Employee', 'Update an employee role']
        },
    
  ])
  .then((response) =>{ // user answers stored in response

   firstIf(response)                  //calls write to file
  });
}



function firstIf(data) {                            //INITIAL QUESTIONS

  if (data.doWhat =='View Departments'){
    viewAllDepartments()
      init()

 }else if (data.doWhat =='View Roles'){

  viewAllRoles()
  init()            
 
  }else if (data.doWhat =='View Employees'){
    db.query('SELECT * FROM employees;', function (err, results) {        // VIEW ALL ROLES
      console.log('');
      console.info('------All Employees------')
      console.log(results);});
      console.log('');
      init()            
   
    }else if (data.doWhat =='View Employees'){
      db.query('SELECT * FROM employees;', function (err, results) {        // VIEW ALL ROLES
        console.log('');
        console.info('------All Employees------')
        console.log(results);});
        console.log('');
        init() 

      }else if (data.doWhat =='Add a Department'){
        departmentQuestions()

      }else if (data.doWhat =='Add a Role'){
        rolesQuestions()
        
 }};
 



//                                                                  DEPARTMENT FUNCTIONS
//                                                                WHEN  ADD A DEPARTMENT HAS BEEN SELECTED, ASKS THESE QUESTIONS
 function departmentQuestions() {
  inquirer
  .prompt([
        {
          type: 'input',
          message: "Enter Department Name",
          name: 'addDepartment',
        }
  ])
  .then((response) =>{ // user answers stored in response
   addDepartment(response)                                    //calls add department function
  });
  viewAllDepartments()                                      // displays all departments after the change
};

function viewAllDepartments(){
  db.query('SELECT * FROM departments;', function (err, results) {    // VIEW ALL DEPARTMENTS
  console.log('');
  console.info('------All Departments------')
  console.log(results);});       
}

function addDepartment(data){
  db.query(`INSERT INTO departments (dept_name) `+
          `VALUES ('${data.addDepartment}');`
          )
  console.log(`${data.addDepartment} added to Departments table`);
  console.log('')
  init()
}


//                                                              ROLE FUNCTIONS
//                                                                  Asks questions when roles questions is called
function rolesQuestions() {
  inquirer
  .prompt([
        {
          type: 'input',
          message: "Enter Role Title",
          name: 'rollTitle',
        },
        {
          type: 'input',
          message: "Enter Role Salary",
          name: 'roleSalary',
        },
        {
          type: 'input',
          message: "Enter Role'S Department ID",
          name: 'roleDeptID',
        }
  ])
  .then((response) =>{ // user answers stored in response
   addRole(response)
                                  //calls add rolefunction
  });
  

                                        // displays all roles after the change
};

function viewAllRoles(){
  db.query('SELECT * FROM roles;', function (err, results) {    // VIEW ALL Roles
  console.log('');
  console.info('------All Roles------')
  console.log(results);});       
}

function addRole(data){
  db.query(`INSERT INTO roles (title, salary, department_id)`+
          `VALUES ('${data.rollTitle}',${data.roleSalary},${data.roleDeptID});`
          )
  console.log(`${data.rollTitle} added to Roles table`);
  console.log('')
  viewAllRoles()   
  init()
}






















init()



























// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: v
// view all departments, view all roles, view all employees,
//  add a department, add a role, add an employee, and update an employee role

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
