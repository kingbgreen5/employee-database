
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
  console.log(`Connected to the schema.sql database.`)
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
          name: 'doWhat?', 
          choices: ['View Departments', 'View Roles','View Employees']
        },
    
  ])
  .then((response) =>{ // user answers stored in response

    // writeToFile('./dir/logo.svg', response)                         //calls write to file
  });
}

function ifOne(fileName, data) {                            // write to file function, if shapetype is one of three shapes, runs that code

  if (data.shapetype =='Rectangle'){
   const rectangle = new Rectangle(window,data.text,data.textcolor,data.shapecolor)        
   var data = rectangle.renderRectangle()     
 
 }else if (data.shapetype=='Circle'){
   const circle = new Circle(window,data.text,data.textcolor,data.shapecolor)
   var data = circle.renderCircle()   
 
  }else if (data.shapetype=='Triangle'){ 
  const triangle = new Triangle(window,data.text,data.textcolor,data.shapecolor)
  var data = triangle.renderTri()
  }
    
    fs.writeFile('./dir/logo.svg', data, (err) => {
       if (err) {
         console.error(err);
       }else{
         console.log("Sucess!")
         console.log("DATA LOGGED: " + data)
       }
     });
 }
 



init()






























// Hardcoded query: DELETE FROM course_names WHERE id = 3;

// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query('SELECT * FROM course_names', function (err, results) {
//   console.log(results);
// });

