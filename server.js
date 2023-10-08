const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Olivia1023',
        database: 'company_db'
    },
    console.log('Connected to the company_db database.')
);

// Get all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// Get all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// Get all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// update employee role
app.put('/api/employees/:id', (req, res) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
}); 

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});