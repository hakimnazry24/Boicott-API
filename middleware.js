const express = require("express");
const path = require("path");
const app = require("./routes/app");

// static files middleware served at public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// parse request body
