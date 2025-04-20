const express = require('express');
const app = express();
const port = 3000;

// Add database module
const {db} = require('./modules/db');


app.get('/', async (req, res) => {
  console.log(await db.users.all());
  res.send('Hello World');
})


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})