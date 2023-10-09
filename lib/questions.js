const questions = [
    {
        name: 'text',
        message: 'What would you like to do?',
        type: 'list',
        choices: [
            'View all Employees',
            'Add Employee',
            'Update Employee Role', 
            'View all Roles',
            'Add Role',
            'View all Departments',
            'Add Department', 
            'Quit']
    },
];

module.exports = questions;