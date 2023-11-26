DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary INT,
  department_id INT,
  PRIMARY KEY (id),             
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  -- ON DELETE
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),             
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  FOREIGN KEY (manager_id) 
  -- CONSTRAINT tb_fk foreign key (manager_id) 
  REFERENCES employees (id)
  -- ON DELETE SET NULL
);



SHOW TABLES;

DESCRIBE departments;
DESCRIBE roles;
DESCRIBE employees;