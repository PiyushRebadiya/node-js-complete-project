const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const routes = require('./Routes/routes.js');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { connectToDatabase } = require('./sql/connectToDatabase.js');

const app = express();

app.use(bodyParser.json());
dotenv.config();
app.use(express.json())
app.use(cookieParser());
app.use(cors());

app.use('/images',express.static('./images'))


// Connect to the database
connectToDatabase()
  .then(() => {

    console.log('Connected to the database successfully');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

app.use("/", routes);


app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
