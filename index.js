const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = require('./lib/questions');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Olivia1023',
        database: 'company_db'
    },
    console.log('Connected to the company_db database.')
);

// const employeeNamesUpdated = [];

let employeeUpdates = [];
let deptUpdates = [];
let roleUpdates = [];

const sqlAgain = `SELECT first_name, last_name FROM employees`;
db.query(sqlAgain, (err, rows) => {
  if (err) {
    console.log(err);
    return;
  }
  employeeUpdates = rows.map(row => `${row.first_name} ${row.last_name}`);

});

const deptSql = `SELECT department_name FROM departments`;
db.query(deptSql, (err, rows) => {
  if (err) {
    console.log(err);
    return;
  }
  deptUpdates = rows.map(row => `${row.department_name}`);
});

const roleSql = `SELECT title FROM roles`;
db.query(roleSql, (err, rows) => {
  if (err) {
    console.log(err);
    return;
  }
  roleUpdates = rows.map(row => `${row.title}`);
});

function getDepartments() {
  console.log('departments');
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('\n');
        console.table(rows);
        console.log('\n');
        return mainMenu();
    });
}

function getRoles() {
  console.log('roles');
  const sql = 'SELECT * FROM roles';
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('\n');
    console.table(rows);
    console.log('\n');
    return mainMenu();
  });
}

function getEmployees() {
  console.log('employees');
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('\n');
    console.table(rows);
    console.log('\n');
    return mainMenu();
  });
}

function addDepartment() {
  console.log('add department');
  // const sql = 'INSERT INTO depatments (name) VALUES'
  inquirer.prompt({
    type: 'input',
    name: 'DeptName',
    message: 'What is the name of the new department?'
  })
  .then((answers) => {
    console.log(answers.DeptName);
    const sql = `INSERT INTO departments (department_name) VALUES ("${answers.DeptName}")`
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      // console.table(rows);
      console.log('Department added');
      return mainMenu();
    });
  });
}

function addRole() {
  const questionList = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the new role?'
    },
    {
      type: 'list',
      name: 'dept_name',
      message: 'Which department does the new role belong to?',
      choices: deptUpdates
    }
  ]
  inquirer.prompt(questionList)
  .then((answers) => {
    console.log(answers.title, answers.salary, answers.dept_name);
    const sql = `INSERT INTO roles (title, salary, dept_name) VALUES ("${answers.title}", "${answers.salary}", "${answers.dept_name}")`
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      // console.table(rows);
      console.log('Role added');
      return mainMenu();
    });
  });
}

function addEmployee() {
  const employeeNames = [{name: 'John Doe', value: 1}, {name: 'Mike Chan', value: 2}, {name: 'Ashley Rodriguez', value: 3}, {name: 'Kevin Tupik', value: 4},
    {name: 'Malia Brown', value: 5}, {name: 'Sarah Lourd', value: 6}, {name: 'Tom Allen', value: 7}, {name: 'Michael Scott', value: 8}];
  const questionListTwo = [
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee?'
    },
    {
      type: 'confirm',
      name: 'choose_role',
      message: 'Do you want to choose a role for the new employee from the list or type your own?',
      default: true
    },
    {
      type: 'list',
      name: 'role_name',
      message: 'Which role does the new employee belong to?',
      choices: roleUpdates,
      when: (answers) => answers.choose_role
    },
    {
      type: 'input',
      name: 'role_name',
      message: 'Type the name of the role the new employee belongs to:',
      when: (answers) => !answers.choose_role
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the new employee?'
    },
    {
      type: 'list',
      name: 'department',
      message: 'Which department does the new employee belong to?',
      choices: deptUpdates
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the manager of the new employee?',
      choices: employeeNames
    }
  ]
  inquirer.prompt(questionListTwo)
    .then((answers) => {
      console.log(answers.first_name, answers.last_name, answers.role_name, answers.salary, answers.department, answers.manager);
      const sql = `INSERT INTO employees (first_name, last_name, role_name, salary, department, manager) VALUES ("${answers.first_name}", "${answers.last_name}", "${answers.role_name}", "${answers.salary}", "${answers.department}", "${answers.manager}")`
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        // console.table(rows);
         console.log('Employee added');
         return mainMenu();
      });
  });
};



function updateEmployeeRole() {
  const questionListThree = [
    {
      type: 'list',
      name: 'employee_name',
      message: 'Which employee do you want to update?',
      choices: employeeUpdates
    },
    {
      type: 'list',
      name: 'new_role',
      message: 'What is the new role of the employee?',
      choices: roleUpdates
    }
  ]
  inquirer.prompt(questionListThree)
    .then((answers) => {
      console.log(answers.employee_name, answers.new_role);
      const sql = `UPDATE employees SET role_name = "${answers.new_role}" WHERE first_name = "${answers.employee_name.split(' ')[0]}" AND last_name = "${answers.employee_name.split(' ')[1]}"`
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        // console.table(rows);
        console.log('Employee role updated');
        return mainMenu();
      });
  });
};
function mainMenu() {
  inquirer.prompt(questions).then((answers) => {
      console.log(answers.text);
    switch(answers.text) {
      case 'View all Departments':
        getDepartments();
        break;
      case 'View all Roles':
        getRoles();
        break;
      case 'View all Employees':
        getEmployees();
        break;
      case 'Add Department':
        addDepartment();
        break;    
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Quit':
        console.log('Goodbye!');
        process.exit(0);
    }})
    .catch((error) => {
      console.log('Its an error!', error);
  
});
}

mainMenu(); 