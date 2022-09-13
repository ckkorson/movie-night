function getApi(isbn, bookName) {
    let requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + bookName + 'isbn:' + isbn
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data)
    })
}

function getApi2() {
    let listName = 'education'
    let requestUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/' + listName + '.json?api-key=8DYkNsuedhfrGlFCoGJ82DgppVWLNTXD'
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data)
        let x = getRandom(data)
        let isbn = data.results.books[x].primary_isbn13
        let bookName = data.results.books[x].title
        console.log(x)
        console.log(isbn)
        console.log(bookName)
        getApi(isbn, bookName)
    })
}

function getRandom(data) {
    return Math.floor(Math.random() * data.results.books.length)
 }

getApi2()