
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

function init() {                                           // --------------------INITIAL QUESTIONS------------------------
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



function firstIf(data) {                                 //---------------------INITIAL IF BLOCK-------------------------
//                                                            When a response is selected, runs corresponding function which will then continue the process if need be
  if (data.doWhat =='View Departments'){                                                
    viewAllDepartments()

  }else if (data.doWhat =='View Roles'){
    viewAllRoles()

  }else if (data.doWhat =='View Employees'){
    viewAllEmployees()            

  }else if (data.doWhat =='Add a Department'){
    departmentQuestions()

  }else if (data.doWhat =='Add a Role'){
    rolesQuestions()

  }else if (data.doWhat =='Add an Employee'){
    employeeQuestions()
  
  }else if (data.doWhat =='Update an employee role'){
    

 }};
 






//                                                                  ------------------DEPARTMENT FUNCTIONS------------------------
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
   viewAllDepartments()                                      // displays all departments after the change
  });

};

function viewAllDepartments(){
  db.query('SELECT * FROM departments;', function (err, results) {    // VIEW ALL DEPARTMENTS
  console.log('');
  console.info('------All Departments------')
  // res.json(results)
  console.table(results)
  init()  
});       
}

function addDepartment(data){
  db.query(`INSERT INTO departments (dept_name) `+
          `VALUES ('${data.addDepartment}');`
          )
  console.log(`${data.addDepartment} added to Departments table`);
  console.log('')

}







//                                                              -------------------------ROLE FUNCTIONS---------------------------
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
   viewAllRoles()// displays all roles after the change //calls add rolefunction
  });
};

function viewAllRoles(){
  db.query('SELECT * FROM roles;', function (err, results) {    // VIEW ALL Roles
  console.log('');
  console.info('------All Roles------');
  console.table(results);
  init();  
})};

function addRole(data){
  db.query(`INSERT INTO roles (title, salary, department_id)`+
          `VALUES ('${data.rollTitle}',${data.roleSalary},${data.roleDeptID});`
          )
  console.log(`${data.rollTitle} added to Roles table`);
  console.log('')
  viewAllRoles()   
}


//                                               -------------------------EMPLOYEE FUNCTIONS---------------------------

function employeeQuestions() {
  inquirer
  .prompt([
        {
          type: 'input',
          message: "Enter First Name",
          name: 'firstname',
        },
        {
          type: 'input',
          message: "Enter Last Name",
          name: 'lastname',
        },
        {
          type: 'input',
          message: "Enter Role Id",
          name: 'roleId',
        },
        {
          type: 'input',
          message: "Enter Manager Id (if none enter 'NULL')",
          name: 'managerId',
        }
  ])
  .then((response) =>{ // user answers stored in response
    addEmployee(response)
    viewAllEmployees()// displays all roles after the change //calls add rolefunction
  });
}

  function addEmployee(data){
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)`+
            `VALUES ('${data.firstname}','${data.lastname}',${data.roleId},${data.managerId});`)
    console.log(`${data.firstname}${data.lastname} added to Employee table`);
  }
  

  function viewAllEmployees(){
    db.query('SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS role_title, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employees e JOIN roles r ON e.role_id = r.id LEFT JOIN employees m ON e.manager_id = m.id;'
      , function (err, results) {        // VIEW ALL ROLES
      console.log('');
      console.info('------All Employees------')
      console.table(results);
      init();
    });
    };
    
  


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
