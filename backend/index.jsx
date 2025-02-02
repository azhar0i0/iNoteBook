const connectToMongo = require('./db.jsx');


const express = require('express');

connectToMongo();
const app = express();
const port = 5001;
const cors = require("cors");
app.use(cors());

app.use(express.json())

// aviable routes
app.use('/api/auth',require('./routes/auth.jsx'))
app.use('/api/notes',require('./routes/notes.jsx'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
