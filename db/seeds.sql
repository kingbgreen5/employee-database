
INSERT INTO departments (id, dept_name)
VALUES (0, "Managment"),
        (1, "Sales"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal");
 
INSERT INTO roles (id, title, salary, department_id)
VALUES  (0, "null", 0, 0),
        (1, "Sales Lead", 100000, 1),
        (2, "Salesperson",70000, 1),
        (3, "Lead Engineer", 150000, 2),
        (4, "Software Engineer", 120000, 2),
        (5, "Account Manager", 160000, 3),
        (6, "Accountant", 120000, 3),
        (7, "Legal Team Lead", 250000, 4),
        (8, "Lawyer", 190000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (0, "Null", '', 0, 0),
        (1, "Richland", 'Dodge', 1, 0),
        (2, "Lafayette", 'Green', 2, 1),
        (3, "Cornelius", 'Hedges', 3,0),
        (4, "Floyd", 'Chickasaw', 4, 3),
        (5, "Vernon", 'Wallworth', 5, 0),
        (6, "Jackson", 'Cedar', 6, 5),
        (7, "Wallaby", 'Jones', 7, 0),
        (8, "Bill", 'Farmington', 8, 7);


-- veiw all depts
SELECT * FROM departments;
-- veiw all roles
SELECT * FROM roles;

select * from employees;
