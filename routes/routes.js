// Load the MySQL pool connection
const pool = require('../data/config');
//const accessArtifact = require('../build/contracts/Access.json');
//const sysAdminArtifact = require('../build/')


const request = require('request');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs = require("fs");
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// Route the app
const router = async app => {
    // Display welcome message on the root


    //0x42bb9572ab12e65e117a8a5abf492d48d9e7cf02589dc63cd2feb7477f64c419
    // Display all users
    app.get('/allUsers/:lunaID', async function (request, response) {
        const lunaID = request.params.lunaID;
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(JSON.stringify(result));
        });
    });

    // Display a single user by ID
    app.get('/users/:id/:lunaID', async function (request, response) {
        const id = request.params.id;
        const lunaID = request.params.lunaID;
        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            //response.send({"concat": "1".concat(result[0].name, result[0].email, result[0].userType)});
            response.send((result[0]));
        });
    });

    // Add a new user
    app.post('/users/:lunaID', async function (request, response) {
        const lunaID = request.params.lunaID;
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });


    // Update an existing user
    app.put('/users/:id/:lunaID', async function (request, response) {
        const id = request.params.id;
        const lunaID = request.params.lunaID;
        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id/lunaID', async function (request, response) {
        const id = request.params.id;
        const lunaID = request.params.lunaID;
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;
