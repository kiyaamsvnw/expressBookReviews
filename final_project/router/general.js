const axios = require('axios');
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

/**
 * Task 6: Register a new user.
 * Validates if the username is unique and saves the new user to the shared users array.
 */
public_users.post("/register", (req,res) => {
    const { username, password } = req.body;

    if (username && password) {
      if (!isValid(username)) { 
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
      } else {
        return res.status(404).json({ message: "User already exists!" });
      }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

/**
 * Task 10: Get the book list available in the shop.
 * Implements an asynchronous call using Axios to retrieve the full list of books.
 */
public_users.get('/', async function (req, res) {
  try {
    // Calling the internal endpoint asynchronously
    const response = await axios.get("http://localhost:5000/");
    res.status(200).json(response.data);
  } catch (error) {
    // Error handling for failed data retrieval
    res.status(500).json({ message: "Error fetching book list" });
  }
});

/**
 * Task 11: Get book details based on ISBN.
 * Uses an async Axios request to fetch details for a specific book by its ISBN path parameter.
 */
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "ISBN not found" });
  }
});
  
/**
 * Task 12: Get book details based on author.
 * Asynchronously searches for all books associated with a specific author using Axios.
 */
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "No books found for this author" });
  }
});

/**
 * Task 13: Get all books based on title.
 * Performs an asynchronous search by title using Axios and handles cases where titles match.
 */
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "No books found with this title" });
  }
});

/**
 * Task 5: Get book reviews based on ISBN.
 * Synchronously retrieves the reviews object for a specific book entry.
 */
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.send(books[isbn].reviews);
    } else {
        res.status(404).json({ message: "Book reviews not found" });
    }
});

module.exports.general = public_users;
