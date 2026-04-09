const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


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

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    const get_books = new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify({books}, null, 4)));
    });
  
    get_books.then(() => console.log("Promise for Task 10 resolved"));
  });
// public_users.get('/',function (req, res) {
//   res.send(JSON.stringify(books, null, 4));
// //   return res.status(300).json({message: "Yet to be implemented"});
// });

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const get_book_details = new Promise((resolve, reject) => {
      const isbn = req.params.isbn;
      if (books[isbn]) {
        resolve(res.send(JSON.stringify(books[isbn], null, 4)));
      } else {
        reject(res.status(404).json({message: "Book not found"}));
      }
    });
  
    get_book_details.then(
      () => console.log("Promise for Task 11 resolved"),
      (err) => console.log("Error finding book")
    );
  });
// public_users.get('/isbn/:isbn',function (req, res) {
//   const isbn = req.params.isbn;
//   res.send(books[isbn]);
// //   return res.status(300).json({message: "Yet to be implemented"});
//  });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const get_books_author = new Promise((resolve, reject) => {
      const author = req.params.author;
      const authorBooks = Object.values(books).filter(book => book.author === author);
      
      if (authorBooks.length > 0) {
        resolve(res.send(JSON.stringify(authorBooks, null, 4)));
      } else {
        reject(res.status(404).json({message: "No books found by this author"}));
      }
    });
  
    get_books_author.then(() => console.log("Promise for Task 12 resolved"));
  });
// public_users.get('/author/:author',function (req, res) {
//     const author = req.params.author;
//     let keys = Object.keys(books);
//     let filtered_books = [];
  
//     keys.forEach((key) => {
//     if (books[key].author === author) {
//     filtered_books.push(books[key]);
//    }
//   });
  
// res.send(JSON.stringify(filtered_books, null, 4));
// //   return res.status(300).json({message: "Yet to be implemented"});
// });

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const get_books_title = new Promise((resolve, reject) => {
      const title = req.params.title;
      const titleBooks = Object.values(books).filter(book => book.title === title);
  
      if (titleBooks.length > 0) {
        resolve(res.send(JSON.stringify(titleBooks, null, 4)));
      } else {
        reject(res.status(404).json({message: "No books found with this title"}));
      }
    });
  
    get_books_title.then(() => console.log("Promise for Task 13 resolved"));
  });
// public_users.get('/title/:title',function (req, res) {
//     const title = req.params.title;
//     let keys = Object.keys(books);
//     let filtered_books = [];
  
//     keys.forEach((key) => {
//       if (books[key].title === title) {
//         filtered_books.push(books[key]);
//       }
//     });
  
//     res.send(JSON.stringify(filtered_books, null, 4));
// });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
