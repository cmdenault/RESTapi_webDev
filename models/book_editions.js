const books = [
  {
    id: 1,
    title: 'A Lily Rose', 
    subtitle: 'A Novel',
    origPubDate: '02/17/2003', 
    tags:['novel', 'romance'],
    primaryAuthID:1,
  },

  {
    id: 2,
    title: 'Vallies in the Hills', 
    subtitle: 'An experiment Novel',
    origPubDate: '02/22/1998', 
    tags:['horror'],
    primaryAuthID: 2,
  },
  
]
const bookEditions = [
  {
    id: 1, // the book ID
    pubDate: '04/20/2012',
    editionNum: 2,
  },

  {
    id: 2, // the book ID
    pubDate: '02/17/2004',
    editionNum: 2,
  },

]

// export book and editions arrays
module.exports = {
    books,
    bookEditions,
  };
