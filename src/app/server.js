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
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los empleados');
  }
});

app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el empleado');
  }
});

app.post('/api/employees', async (req, res) => {
  const { name, jobTitle } = req.body;
  try {
    const result = await pool.query('INSERT INTO employees (name, jobTitle) VALUES ($1, $2) RETURNING *', [name, jobTitle]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el empleado');
  }
});

app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, jobTitle } = req.body;
  try {
    await pool.query('UPDATE employees SET name = $1, jobTitle = $2 WHERE id = $3', [name, jobTitle, id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el empleado');
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el empleado');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
