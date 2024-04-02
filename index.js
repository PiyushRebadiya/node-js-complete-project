const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080; // Change the port as needed

// Define the MongoDB connection URL and database name
const url = 'mongodb://localhost:27017/';

// Define the global variable to hold the database connection
let client;

// Connect to MongoDB and assign the database connection to the global variable
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('Connected to MongoDB');
        client = res;
        // client = client.db(dbName);
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if connection fails
    });

// Define the route to fetch data
app.get('/api/login', async (req, res) => {
    try {
        const db = await client.db("admin");
        // Access the collection from the global variable
        const collection = db.collection("login");

        // Find documents based on the filter
        const result = await collection.find({}).toArray();

        // Send the result as JSON response
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Define the route to fetch data
app.get('/api/local', async (req, res) => {
    try {
        const db = await client.db("local");
        // Access the collection from the global variable
        const collection = db.collection("users");

        // Find documents based on the filter
        const result = await collection.find({}).toArray();

        // Send the result as JSON response
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Define the route to fetch data
app.get('/api/users', async (req, res) => {
    try {
        const db = await client.db("local");
        // Access the collection from the global variable
        const collection = db.collection("User");

        // Find documents based on the filter
        const result = await collection.find({}).toArray();

        // Send the result as JSON response
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
