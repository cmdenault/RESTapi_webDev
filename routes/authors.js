
var express = require('express');
var authors = require('../models/authors') // author array 
var {books, bookEditions} = require('../models/books_editions') // book and book editions arrays

const router = express.Router();


// ****************** Author Endpoints
// bc were using a router we already know /authors, we can just use / in our paths

// POST a book (add new author)
router.post('/', (req, res) => { // /authors is implied bc of router
    const { name, bio, birthDate, genre } = req.body; // get from request body

    if (!name || !birthDate || !genre) { // validate required attributes
        res.status(400).send('Missing required author atribute(s)')
        return 
    }

    const newAuthorID = authors.length + 1
    const newAuthor = { // new author obj
        id: newAuthorID,
        name,
        birthDate,
        bio,
        genre,

    }

    authors.push(newAuthor);
    res.status(201).send(newAuthor);

});

// List all authors (GET) 
router.get('/', (req, res) => { //  '/authors' is implied bc of router, only need what comes after
    res.status(200).send(authors)
})


// Update specific author's bio (PUT)
router.put('/:id', (req, res) => { 

    // get the author to change
    const authorId = parseInt(req.params.id) // number of author id from the url
    const theAuthor = authors.find((author) => author.id === authorId) // access the author obj

    if (!theAuthor) { // validate existence
        res.status(404).end()
        return
    }

    // overwrite the bio
    const {bio} = req.body
    theAuthor.bio = bio
    res.status(200).send(theAuthor);

    /* 
    router.put('/:id/bio') bc put overwrites the entire object
    router.patch('/:id', (req, res) => {
    } )
    */
    
})


// List all books by given author (GET) (GET /authors/:id/books)
router.get('/:id/books', (req, res) => {
    
    // get the number of author id from the url
    const authorId = parseInt(req.params.id)

    // access the author obj
    const author = authors.find((author) => author.id === authorId) 

    if (!author) {
        return res.status(404).send('Author not found')
    }

    const authorsBooks = books.filter((book) => book.primaryAuthID === authorId);
    res.status(200).send(authorsBooks) // or res.json(authorsBooks)

    /* 
    Alternative solution: have author ID in the query 
    router.get('/:id/books', (req, res) => {})
    */

})



module.exports = router


// http://localhost:3001/authors/authors
// the port was changed in bin/www