const express = require('express');
// const sql = require('mssql');
const sql = require('mssql/msnodesqlv8')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Configuration for the connection
// const config = {
//   user: 'sa',
//   password: 'monarch@1',
//   server: '154.61.80.42',
//   database: 'testing',
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   }
// };

const config = {
    server: 'DESKTOP-7D71JMJ\\SQLEXPRESS',
    database: 'db',
    options: {
      trustedConnection: true, // Trust the self-signed certificate
      encrypt: false, // Enable SSL encryption
    }
};

// Create a connection pool
const pool = new sql.ConnectionPool(config);

// Connect to the database initially
pool.connect().then(() => {
  console.log('Connected to SQL Server');
}).catch((err) => {
  console.error('Error connecting to SQL Server:', err);
});

// Define a route to retrieve user list
app.get('/userlist', async (req, res) => {
  try {
    // Query the database
    const result = await pool.request().query('SELECT * FROM Persons');
    // Send the query result as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route to insert a new user
app.post('/userlist', async (req, res) => {
  try {
    const { userID, Name } = req.body;
    // Insert data into the users table using parameterized query

    // Check if userID and Name are provided and are not null or undefined
    if (!userID || !Name || userID === null || userID === undefined || Name === null || Name === undefined) {
      return res.status(400).send('userID and Name parameters are required and must not be null or undefined');
    }
    const result = await pool.request()
      .input('userID', sql.Int, userID)
      .input('Name', sql.NVarChar(500), Name)
      .query('INSERT INTO users (userID, Name) VALUES (@userID, @Name)');
    // Send a success response
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// delete user
app.delete('/userlist', async (req, res) => {
  try {
    const query = req.query;
    const { id } = query;

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid value for parameter "id". Must be a valid number.');
    }

    // Execute the DELETE query
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM users WHERE userID = @id');

    // Check if any rows were affected (indicating successful deletion)
    if (result.rowsAffected[0] > 0) {
      return res.status(200).send('User deleted successfully');
    } else {
      return res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

//update user

app.put('/userlist', async (req, res) => {
  try {
    const { userID, Name } = req.body;

    // Check if the required parameters are provided
    if (!userID || !Name) {
      return res.status(400).send('userID and Name parameters are required');
    }

    // Execute the UPDATE query
    const result = await pool.request()
      .input('userID', sql.Int, userID)
      .input('Name', sql.NVarChar(500), Name)
      .query('UPDATE users SET Name = @Name WHERE userID = @userID');

    // Check if any rows were affected (indicating successful update)
    if (result.rowsAffected[0] > 0) {
      return res.status(200).send('User updated successfully');
    } else {
      return res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});





app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
