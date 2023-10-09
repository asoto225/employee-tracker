INSERT INTO departments (department_name)
VALUES ('Sales'), 
    ('Engineering'), 
    ('Finance'), 
    ('Legal');

INSERT INTO roles (dept_name, title, salary)
VALUES ('Sales', 'Sales Lead', 100000), 
    ('Sales', 'Salesperson', 80000), 
    ('Engineering', 'Lead Engineer', 150000), 
    ('Engineering', 'Software Engineer', 120000), 
    ('Finance', 'Accountant', 125000), 
    ('Finance', 'Account Manager', 150000), 
    ('Legal', 'Legal Team Lead', 250000), 
    ('Legal', 'Lawyer', 190000);

INSERT INTO employees (first_name, last_name, role_name)
VALUES ('John', 'Doe', 'Sales Lead'), 
    ('Mike', 'Chan', 'Salesperson'), 
    ('Ashley', 'Rodriguez', 'Lead Engineer'), 
    ('Kevin', 'Tupik', 'Software Engineer'), 
    ('Malia', 'Brown', 'Accountant'), 
    ('Sarah', 'Lourd', 'Account Manager'), 
    ('Tom', 'Allen', 'Legal Team Lead'), 
    ('Jason', 'Bourne', 'Lawyer');