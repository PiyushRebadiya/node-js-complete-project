const { pool, sql } = require('../sql/connectToDatabase');

// Define a route to retrieve user list
const fetchUserList = async (req, res) => {
    try {
        // Query the database
        const result = await pool.request().query('SELECT * FROM users');
        // Send the query result as JSON response
        res.json(result.recordset);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Define a route to insert a new user
const addUserList = async (req, res) => {
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
}

// delete user
const removeUserListById = async (req, res) => {
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
}

//update user

const updateUserListById = async (req, res) => {
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
}

module.exports = {
    fetchUserList,
    addUserList,
    removeUserListById,
    updateUserListById
};