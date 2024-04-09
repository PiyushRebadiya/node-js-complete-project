const sql = require('mssql');

// Configuration for the connection
const config = {
    user: 'sa',
    password: 'monarch@1',
    server: '154.61.80.42',
    database: 'testing',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

// Create a function to initialize the pool
function initializePool(config) {
    return new sql.ConnectionPool(config);
}

// Initialize the pool with the initial configuration
let pool = initializePool(config);

async function changeDatabase(newDatabase) {
    try {
        const updatedConfig = {
            ...config,
            database: newDatabase
        };

        const newPool = initializePool(updatedConfig);
        await newPool.connect();
        return newPool;
    } catch (error) {
        console.error('Error changing database:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}


// Function to connect to the database
async function connectToDatabase() {
    try {
        // Connect to the database
        await pool.connect();
        console.log('Connected to SQL Server');
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

// Function to close the database connection
async function closeDatabaseConnection() {
    try {
        // Close the connection pool
        await pool.close();
        console.log('Connection to SQL Server closed');
    } catch (error) {
        console.error('Error closing connection to SQL Server:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

module.exports = { sql, pool, connectToDatabase, closeDatabaseConnection, changeDatabase };