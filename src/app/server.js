const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hr',
  password: 'UTM123',
  port: 5432,
});

// Rutas CRUD para EMPLOYEES

// Obtener todos los empleados
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los empleados');
  }
});

// Obtener un empleado por ID
app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Empleado no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el empleado');
  }
});

// Crear un nuevo empleado
app.post('/api/employees', async (req, res) => {
  const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el empleado');
  }
});

// Actualizar un empleado
app.put('/api/employees/:employee_id', async (req, res) => {
  const { employee_id } = req.params;
  const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE employees 
       SET first_name = $1, last_name = $2, email = $3, phone_number = $4, hire_date = $5, job_id = $6, salary = $7, commission_pct = $8, manager_id = $9, department_id = $10 
       WHERE employee_id = $11 RETURNING *`,
      [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id, employee_id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Empleado no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el empleado');
  }
});

// Eliminar un empleado
app.delete('/api/employees/:employee_id', async (req, res) => {
  const { employee_id } = req.params;
  try {
    const result = await pool.query('DELETE FROM employees WHERE employee_id = $1 RETURNING *', [employee_id]);
    if (result.rows.length > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send('Empleado no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el empleado');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});