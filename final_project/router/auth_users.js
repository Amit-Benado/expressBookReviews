const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  if (!username) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  const isbn = req.params.isbn;
  const review = req.query.review;

  if (!review) {
    return res.status(400).json({ message: "Review is required." });
  }

  // Check if the book with the provided ISBN exists
  if (books[isbn]) {
    // Check if the user has already reviewed the book
    if (books[isbn].reviews[username]) {
      // Modify the existing review
      books[isbn].reviews[username] = review;
      return res.status(200).json({ message: "Review modified successfully." });
    } else {
      // Add a new review for the book by the user
      books[isbn].reviews[username] = review;
      return res.status(201).json({ message: "Review added successfully." });
    }
  } else {
    return res.status(404).json({ message: "Book not found with the specified ISBN." });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
