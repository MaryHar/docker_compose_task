const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

async function waitForDatabase() {
  try {
    const db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    console.log('Database connected');
    return db;
  } catch (err) {
    console.error('Database connection failed. Retrying in 2 seconds...');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return waitForDatabase();
  }
}

waitForDatabase()
  .then((db) => {
    app.locals.db = db;

    app.get('/', (req, res) => {
      res.send('Hello, Docker Compose with Node.js and MySQL!');
    });

    app.listen(3000, () => {
      console.log('Node.js app is listening on port 3000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });