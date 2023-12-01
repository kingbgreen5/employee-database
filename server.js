
const mysql = require('mysql2');
const inquirer = require('inquirer');



 //                                                                  --------------------CONNECTION------------------------
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



 //                                                            --------------------INITIAL QUESTIONS------------------------
 const questions = [
  'What would you like to do?'
  ];
function init() {                                          
  inquirer
  .prompt([
      {
          type: 'list',
          message: questions[0],
          name: 'doWhat', 
          choices: ['View Departments', 'View Roles','View Employees','Add a Department',  'Add an Employee', 'Add a Role', 'Update an employee role']
        },
    
  ])
  .then((response) =>{ // user answers stored in response

   firstIf(response)                  //calls write to file
  });
}


//                                                              ---------------------INITIAL IF BLOCK-------------------------
function firstIf(data) {                                       
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
    employeeUpdateQuestions()

 }};
 


//                            -----------------------------------------------------DEPARTMENT FUNCTIONS-----------------------------------------------------
//                                                               

//                                                                               ----DEPARTMENT QUESTIONS----
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
   addDepartment(response)                                   
   viewAllDepartments()                                      
  });

};

//                                                                              ----VIEW DEPARTMENTS----
function viewAllDepartments(){
  db.query('SELECT * FROM departments;', function (err, results) {    
  console.log('');
  console.info('------All Departments------')
  // res.json(results)
  console.table(results)
  init()  
});       
}

//                                                                              ----ADD DEPARTMENT----
function addDepartment(data){
  db.query(`INSERT INTO departments (dept_name) `+
          `VALUES ('${data.addDepartment}');`
          )
  console.log(`${data.addDepartment} added to Departments table`);
  console.log('')

}



//                            -----------------------------------------------------ROLE FUNCTIONS-----------------------------------------------------

//                                                                             ----ROLES QUESTIONS----
function rolesQuestions() {
  return inquirer.prompt
  ([
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
  });

};
 //                                                                            ----VIEW ROLES----
function viewAllRoles(){
  db.query('SELECT * FROM roles;', function (err, results) {                                  
  console.log('');
  console.info('------All Roles------');
  console.table(results);
  init();  
})};
//                                                                             ----ADD ROLES----
function addRole(data){
  db.query(`INSERT INTO roles (title, salary, department_id)`+
          `VALUES ('${data.rollTitle}',${data.roleSalary},${data.roleDeptID});`
          )
  console.log(`${data.rollTitle} added to Roles table`);
  console.log('')
  viewAllRoles()   
}


//                       --------------------------------------------------------EMPLOYEE FUNCTIONS-----------------------------------------------------

function employeeQuestions() {
  return inquirer.prompt([
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
 //                                                                          ----ADD EMPLOYEES----
  function addEmployee(data){
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)`+
            `VALUES ('${data.firstname}','${data.lastname}',${data.roleId},${data.managerId});`)
    console.log(`${data.firstname}${data.lastname} added to Employee table`);
  }
  
 //                                                                         ----VIEW EMPLOYEES----
  function viewAllEmployees(){
    db.query("SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS role_title, CONCAT(m.first_name, ' ', m.last_name) AS manager_full_name FROM employees e JOIN roles r ON e.role_id = r.id LEFT JOIN employees m ON e.manager_id = m.id;"
      , function (err, results) {         // VIEW ALL ROLES
      console.log('');
      console.info('------All Employees------')  
      console.table(results);
  
      init();
    });
    };
    
    //                                                                       ----EMPLOYEE UPDATE----

    function employeeUpdateQuestions() {                                    
    // Execute the query
  db.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employees;', (error, results) => {
      if (error) {
        console.error(error);
        db.end();
      } else {
        // Prompts the user to select from a list of options
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'selectedemployee',
              message: 'Choose an employee:',
              choices: results.map((employee) => ({ name: employee.full_name, value: employee.id })),
            },
          
          ])
          .then((response) => {
            console.log(`You selected employee with ID ${response.selectedemployee}`);
            let selectedEmployeeID = response.selectedemployee
            // let selectedEmployeeName = results.full_name

            db.query('SELECT id, title FROM roles;',function(err, resultsOfRoleQuery) {
              
              inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'selectedRole',
                  message: 'Which Role do you want to assign the selected employee?:',
                  choices: resultsOfRoleQuery.map((role) => ({ name: role.title, value: role.id })),
                }
              ])
              .then((response) => {
                let selectedRoleID = response.selectedRole
                console.log(`You selected Employee ${selectedEmployeeID} and replaced their role with ID ${selectedRoleID}`);
               
                db.query(
                  'UPDATE employees ' +
                  'SET role_id = ? ' +
                  'WHERE id = ?',
                  [selectedRoleID, selectedEmployeeID],
                  function (err, results) {
                    if (err) {
                      console.error(err);
                      db.end();
                    }
                  }
                );
                  viewAllEmployees()
              })
              .catch((inquirerError) => {
                console.error(inquirerError);
              });
              })
          })
          .catch((inquirerError) => {
            console.error(inquirerError);
          });
      }
    });
  }


  db.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employees;', (error, results) => {
    if (error) {
      console.error(error);
      db.end();
    }})

//                   --------------------------------------------------------INITIATE PROGRAM WHEN START IS RUN-----------------------------------------------------
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
