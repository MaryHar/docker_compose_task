  const express = require('express');
  const mysql = require('mysql');
  const app = express();
  
  const db = mysql.createConnection({
    host: 'db', // This should match the service name in the docker-compose file
    user: 'root',
    password: 'examplepassword',
    database: 'myappdb',
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Database connected');
    }
  });
  
  app.get('/', (req, res) => {
    res.send('Hello, Docker Compose with Node.js and MySQL!');
  });
  
  app.listen(3000, () => {
    console.log('Node.js app is listening on port 3000');
  });