const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;
  
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required for registration." });
    }
  
    // Check if the username already exists
    if (users.find(user => user.username === username)) {
      return res.status(409).json({ message: "Username already exists. Please choose a different username." });
    }
  
    // If everything is valid, add the new user to the users array (you may want to store passwords securely in a real-world scenario)
    users.push({ username, password });
  
    // Respond with a success message
    res.status(201).json({ message: "User successfully registered." });
  });
  

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  try {
    // Make an asynchronous request to fetch the list of books
    const response = await axios.get('https://amibenado-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/'); // Assuming your server is running on localhost:5000

    // Extract the book list from the response
    const bookList = response.data;

    // Respond with the book list
    res.status(200).json(bookList);
  } catch (error) {
    console.error('Error fetching book list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
  
    try {
      // Make an asynchronous request to fetch book details based on ISBN
      const response = await axios.get(`https://amibenado-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/${isbn}`);
  
      // Extract the book details from the response
      const bookDetails = response.data;
  
      // Respond with the book details
      res.status(200).json(bookDetails);
    } catch (error) {
      console.error(`Error fetching book details for ISBN ${isbn}:`, error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
  
    // Obtain all the keys for the 'books' object
    const bookIds = Object.keys(books);
  
    // Initialize an array to store books by the specified author
    const booksByAuthor = [];
  
    // Iterate through the 'books' array & check if the author matches the one provided in the request parameters
    bookIds.forEach((id) => {
      const book = books[id];
      if (book.author === author) {
        booksByAuthor.push({ id, ...book });
      }
    });
  
    // Check if any books were found for the specified author
    if (booksByAuthor.length > 0) {
      res.json(booksByAuthor);
    } else {
      res.status(404).json({ message: "No books found for the specified author." });
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
  
    try {
      // Make an asynchronous request to fetch book details based on Title
      const response = await axios.get(`https://amibenado-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/${title}`);
  
      // Extract the book details from the response
      const bookDetails = response.data;
  
      // Respond with the book details
      res.status(200).json(bookDetails);
    } catch (error) {
      console.error(`Error fetching book details for Title ${title}:`, error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
