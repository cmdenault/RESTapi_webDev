//import express, { Request, Response } from 'express'
var express = require('express');
//import { getIdFromPath } from './authors.js'; // TODO: exporting results in: SyntaxError: Unexpected token 'export'
//var authors = require('./authors') 
var authors = require('../models/authors')
var {books, bookEditions} = require('../models/books_editions') // arrays for books and for the editions of books
// import authors from './authors.js'
// const bodyParser = require('body-parser');



const router = express.Router(); // can it be the same name?


// Get id num from path helper function
function getIdFromPath(req){
    return parseInt(req.params.id)
}


// ****************** Book Endpoints

// POST a book (add new book)
router.post('/', (req, res) => {
    const { title, subtitle, origPubDate, tags, primaryAuthID } = req.body; // get data from request

    // validate data
    if (!title || !origPubDate || !tags || !primaryAuthID) {
        return res.status(400).send('Missing required book atribute(s)');
    }

    // ensure author is already in authors array
    const author = authors.find((author) => author.id === primaryAuthID); // callback function inside find checks authors array and returns true for matchind ID nums
                                                                          // if found, stored in author
    if (!author) {
        return res.status(404).send('Author not found');
    }

    const newBookID = books.length + 1
    const newBook = { 
        id: newBookID,
        title, 
        subtitle,
        origPubDate, 
        tags,
        primaryAuthID,
    };

    books.push(newBook);
    res.status(201).send(newBook);
})

// ****** Requesting things functions

// List all books (GET)
router.get('/', (req, res) => { 
    res.send(books)
})

// List all editions (GET)
router.get('/editions', (req, res) => { 
    res.send(bookEditions)
})


// List all books that match given list of tags (GET /books?tags=tag1,tag2)
router.get('/tags', (req, res) => {

    const { tags } = req.query.tags // get tags string from url
    const tagList = tags.split(',') // split into array of tags

    //if no tags given, return all
    if(tagList.length === 0) {
        //console.log('No tags given')
        return res.json(books)       
    }

    // every tag from the provided tags array must be present
    const filteredBooks = books.filter((book) => {
        return tagList.some((tag) => book.tags.includes(tag));
    });

    // return just the array of wanted books
    res.status(200).json(filteredBooks)

    /* 
    More restful way !
    router.get('/', (req, res) => {
        const tags = req.query.tags // gets the 'tags=horror, romance' from url

        if (tags) {

        } else if (req.query.authorId) { // GET ALL BOOKS BY AN AUTHOR

        }
    }
    */
})



// Get details of specific book (GET)
router.get('/:id', (req, res) => {
    const bookId = parseInt(req.params.id) // Extract ID from request path

    const book = books.find((book) => book.id === bookId) // get the book w matching ID
  
    // if no such book
    if (!book) {
      res.status(404).json({ message: 'Book not found :(' });
      return
    }
  
    res.status(200).send(book);  // Return book details
})


// Update any attribute of specific book (PUT) 
router.patch('/:id', (req, res) => {
    const bookId = getIdFromPath(req)
    const { title, subtitle, origPubDate, tags } = req.body // get all the info fron request body

    const bookIndex = books.findIndex(book => book.id === bookId) // get the index

    if (bookIndex === -1) { // index is -1 if not there
        return res.status(404).send('Book not found')
    }

    const updatedBook = { ...books[bookIndex]} // spread existing book data

    // given something to change, change it
    if (title) {updatedBook.title = title}
    if (subtitle) {updatedBook.subtitle = subtitle}
    if (origPubDate) {updatedBook.origPubDate = origPubDate}
    if (tags) {updatedBook.tags = tags}

    // replace current book with the updated version
    books[bookIndex] = updatedBook
    res.status(200).send(updatedBook)

})


// Remove a book (and by extension all its editions) (DELETE)
router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id)
    const bookIndex = books.findIndex((book) => book.id === bookId) // get the index

    if (bookIndex === -1) { // index is -1 if not there
        return res.status(404).send('Book not found')
    }
    // get index of other edition and remove it
    if (bookEditions.length > 0) { // if editions are present

        for (const edition of bookEditions) { // iterate through and delete if it matches id
            const index = books.indexOf(edition);
            if (edition.id === bookId) {
              bookEditions.splice(index, 1); // Remove each edition individually
            }
        }
    }
    
    // remove the book itself
    books.splice(bookIndex, 1);
    res.status(204).send(books)

})


// Add an edition of a specific book
router.post('/:id/editions', (req, res) => {

    // check book exists
    const bookId = parseInt(req.params.id)
    const bookIndex = books.findIndex((book) => book.id === bookId)
    if (bookIndex === -1) {
        return res.status(404).send('Original Edition Not Found')
    }

    const { pubDate, editionNum } = req.body; // get data from request

    // validate data
    if (!editionNum || !pubDate ) {
        return res.status(400).send('Missing required edition atribute(s)');
    }

    const newEdition = {
        id: bookId, // shared with book in books array
        pubDate: pubDate,
        editionNum: editionNum,
    }

    bookEditions.push(newEdition)

    res.status(201).send(newEdition)
    
})


// List editions of a specific book (GET)
router.get('/:id/editions', (req, res) => {

    // check book exists
    const bookId = parseInt(req.params.id)
    const Abook = books.find((book) => book.id === bookId)
    if (!Abook) {
        return res.status(404).send('Original Edition Not Found')
    }

    // get all editions with the matching book ID
    const wantedEditions = bookEditions.filter((edition) => edition.id === bookId);

    // get all books in editions list with desired ID
    if (wantedEditions.length > 0) {
        res.status(200).json(wantedEditions); // 200 for successful retrieval
    } else {
        res.status(204).send(); // 204 for if no editions found
    }
})

// Remove an edition of a specific book by ID num (DELETE /book/:id/editions/:ed)
router.delete('/:id/editions/:ed', (req, res) => { 

    // check book exists
    const bookId = parseInt(req.params.id)
    const editionId = parseInt(req.params.ed)

    const editionIndex = bookEditions.findIndex(
        (edition) => edition.id === bookId && edition.editionNum === editionId
    );                                                      
    if (editionIndex === -1) {
        return res.status(404).send('Edition Not Found')
    }

    // remove that edition of the book
    bookEditions.splice(editionIndex, 1)
    res.status(204).send(bookEditions)
})

// export the router
module.exports = router


