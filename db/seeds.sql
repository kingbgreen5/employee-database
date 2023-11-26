


INSERT INTO departments (dept_name)
VALUES 
        ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");



INSERT INTO roles (title, salary, department_id)
VALUES  
        ("Sales Lead", 100000, 1),
        ("Salesperson",70000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 120000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  
  ("Richland", 'Dodge', 1, NULL),
  ("Lafayette", 'Green', 2, 1),
  ("Cornelius", 'Hedges', 3, NULL),
  ("Floyd", 'Chickasaw', 4, 3),
  ("Vernon", 'Wallworth', 5, NULL),
  ("Jackson", 'Cedar', 6, 5),
  ("Wallaby", 'Jones', 7, NULL),
  ("Bill", 'Farmington', 8, 7);

-- veiw all depts
SELECT * FROM departments;
-- veiw all roles
SELECT * FROM roles;
-- veiw all employees
select * from employees;
