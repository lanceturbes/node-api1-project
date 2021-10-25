// Imports
const express = require("express");
const User = require("./users/model");
// Express Instance
const server = express();
// Middleware
server.use(express.json());

// Endpoints
server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const user = await User.insert({ name, bio });
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});
server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "The users information could not be retrieved",
    });
  }
});

module.exports = server;
