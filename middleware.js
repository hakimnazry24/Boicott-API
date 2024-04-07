const express = require("express");
const path = require("path");
const app = require("./routes/app");

// static files middleware served at public directory
app.use(express.static(path.join(__dirname, 'public')));

// parse request body
app.use(express.json());

// serve static file
app.use(express.static(path.join(__dirname, "public")));


