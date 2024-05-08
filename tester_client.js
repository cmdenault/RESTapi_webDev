
// ----------------------------- Test Book Stuff -----------------------------
function postBook() {
    const aBook = { 
        title: 'A Lily Rose', 
        subtitle: 'A Novel',
        origPubDate: '02/17/2020', 
        tags:['novel', 'romance'],
        primaryAuthID:1,
    }

    fetch('http://localhost:3001/books', {
        method:'POST', 
        body: JSON.stringify(aBook), 
        headers: {'Content-Type': 'application/json'}
    })
}

function postBook2() { // have author inserted first before running
    const aBook = { 
        title: 'Vallies in the Hills', 
        subtitle: 'An experiment Novel',
        origPubDate: '02/22/2019', 
        tags:['horror'],
        primaryAuthID:1,
    }

    fetch('http://localhost:3001/books', {
        method:'POST', 
        body: JSON.stringify(aBook), 
        headers: {'Content-Type': 'application/json'}
    })
}

// List all books that match given list of tags (GET /books?tags=tag1,tag2)
async function getWithTags(tags) {

    // the base URL
    const baseUrl = 'http://localhost:3001/books/tags' //tags=novel,romance

    // query string with tags = ['something', 'another']
    const queryString = tags ? `?tags=${tags.join(',')}` : '';

    const passMe = baseUrl + queryString
    // fetch(passMe, {
    //     method: 'GET',
    //     headers: {'Content-Type': 'application/json'} 
    // })
    
    try {
        const response = await fetch(passMe, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (!response.ok) {
          throw new Error(`Error fetching books: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log('Fetched books:', data);
    } catch (error) {
        console.error('Error:', error);
    }


}



// Get details of specific book (GET)
function listBooksbyId(idNum) { // by ID number
    fetch(`http://localhost:3001/books/${idNum}`, {
        method:'GET',
        headers: {'Content-Type': 'application/json'}
    })
}


// Update any aspect of a book by ID num
function updateBook(id, updateData) {
    const url = `http://localhost:3001/books/${id}`; // Replace with your actual server URL

    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData), // Send update data in JSON format
    });
}


// Delete a book (also its editions)
function deleteABook(idNum) {
    fetch(`http://localhost:3001/books/${idNum}`, {
        method:'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
}





// Add an Editon
function addEdition(idNum, aEdit) {
    fetch(`http://localhost:3001/books/${idNum}/editions`, {
        method:'POST',
        body: JSON.stringify(aEdit), 
        headers: {'Content-Type': 'application/json'}
    })


}

// ------------ Get editions of a certain book
function listBooksEditionsbyId(idNum) { // by ID number
    fetch(`http://localhost:3001/books/${idNum}/editions`, {
        method:'GET',
        headers: {'Content-Type': 'application/json'}
    })
}

// ------------- Delete an Edition
function deleteEdition(idNum, editionNum) {
    fetch(`http://localhost:3001/books/${idNum}/editions/${editionNum}`, {
        method:'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
}




// ----------------------------- Test Author Stuff ----------------------------- 
function postAuthor() {
    const newAuthor = { // new author obj
        name: 'Reed Granger',
        birthDate: '01/28/2005',
        bio: 'A strikingly poignant writer',
        genre: 'Memoir',

    }

    fetch('http://localhost:3001/authors', {
        method:'POST', 
        body: JSON.stringify(newAuthor), 
        headers: {'Content-Type': 'application/json'}
    })

}

function updateBio(idNum) {
    const newBio = {
        bio: 'An established upender of expectation',
    }

    fetch(`http://localhost:3001/authors/${idNum}`, {
        method:'PUT', 
        body: JSON.stringify(newBio), 
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json()) // Process the response (optional)
    .catch(error => console.error(error))
}

// List all books by a certain author
function listBooksbyAuthor(idNum) { // by ID number
    fetch(`http://localhost:3001/authors/${idNum}/books`, {
        method:'GET',
    })
}


//---- Run as necessary

postBook();
//postAuthor();
//updateBio(1);
//listBooksbyAuthor(1);

//-- Get books with tags
//const desiredTags = ['novel', 'romance']
//getWithTags(desiredTags)

//postBook2()

//-- Get books at a certain ID
//listBooksbyId(1)

//-- altering any detail in a book
// newStuff = {
//     title: 'A Lily Rosen'
// }
// updateBook(1, newStuff)


//deleteABook(2)

//-- Add an editon
// const edition1 = {
//     pubDate: '02/17/2020',
//     editionNum: 2,
// }
// addEdition(1, edition1)

// const edition2 = {
//     pubDate: '04/20/2000',
//     editionNum: 2,
// }
// addEdition(2, edition2)


//-- Get certain editions
//listBooksEditionsbyId(1)


//-- Delete Editions
//deleteEdition(1, 2)

// run in /server1 terminal: node tester_client.js