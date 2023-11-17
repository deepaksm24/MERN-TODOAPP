const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
require("dotenv").config();

const dbconfig = require("./config/dbcongig");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const usersRoute = require("./routes/usersRoute");

// Use the cors middleware with appropriate options
app.use(cors({
  origin: 'https://todonotestaking.netlify.app', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Enable cookies and authentication headers if needed
}));

// http://localhost:3000
// test route // https://comfy-gnome-57fbec.netlify.app
app.get('/', (req, res) => {
  const data = { message: 'Todo App connection Successfull' };
  res.json(data);
});

app.use(express.json());

app.use("/users", usersRoute);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
