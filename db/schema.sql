DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL UNIQUE,
    dept_name VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id, salary),
    FOREIGN KEY (dept_name) REFERENCES departments(department_name)
);

ALTER TABLE roles
ADD INDEX salary_idx (salary);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_name VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department VARCHAR(30) NOT NULL,  
    manager INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_name) REFERENCES roles(title),
    FOREIGN KEY (manager) REFERENCES employees(id),
    FOREIGN KEY (salary) REFERENCES roles(salary),
    FOREIGN KEY (department) REFERENCES departments(department_name)
);