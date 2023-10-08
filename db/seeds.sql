INSERT INTO departments (department_name)
VALUES ('Sales'), 
('Engineering'), 
('Finance'), 
('Legal');

INSERT INTO roles (department_id, title)
VALUES (1, 'Sales Lead'), 
    (1, 'Salesperson'), 
    (2, 'Lead Engineer'), 
    (2, 'Software Engineer'), 
    (3, 'Accountant'), 
    (3, 'Account Manager'), 
    (4, 'Legal Team Lead'), 
    (4, 'Lawyer');

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('John', 'Doe', 1), 
    ('Mike', 'Chan', 2), 
    ('Ashley', 'Rodriguez', 3), 
    ('Kevin', 'Tupik', 4), 
    ('Malia', 'Brown', 5), 
    ('Sarah', 'Lourd', 6), 
    ('Tom', 'Allen', 7), 
    ('Jason', 'Bourne', 8);