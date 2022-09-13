let categoryArr = ['fiction', 'nonfiction', 'graphic-books-manga', 'young-adult', 'business', 'crime',
'science', 'sports', 'travel']
nyTimesCategory = ['hardcover-fiction', 'hardcover-nonfiction', 'graphic-books-and-manga', 'young-adult',
'business-books', 'crime-and-punishment', 'science', 'sports', 'travel']

function googleBooksApi(isbn, bookName) {
    let requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + bookName + 'isbn:' + isbn
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data)
    })
} 

function nyTimesApi(categorySelections) {
    let randomCategory = getRandomCategory(categorySelections)
    console.log(categorySelections[randomCategory])
    let requestUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/' + categorySelections[randomCategory] + '.json?api-key=8DYkNsuedhfrGlFCoGJ82DgppVWLNTXD'
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data)
        let x = getRandomBook(data)
        let isbn = data.results.books[x].primary_isbn13
        let bookName = data.results.books[x].title
        console.log(x)
        console.log(isbn)
        console.log(bookName)
        googleBooksApi(isbn, bookName)
    })
}

function getRandomBook(data) {
    return Math.floor(Math.random() * data.results.books.length)
 }

 function getRandomCategory(categorySelections) {
    return Math.floor(Math.random() * categorySelections.length)
 }

 function checkboxes() {
    let categorySelections = []
    for(let i = 0; i < categoryArr.length; i++) {
        // if(document.getElementById(categoryArr[i]).checked)
        let x = document.getElementById(categoryArr[i]).checked
        if(x) {
            categorySelections.push(nyTimesCategory[i])
        }
    }
    console.log(categorySelections)
    nyTimesApi(categorySelections)
 }

document.getElementById('submit').addEventListener('click', checkboxes)

// nyTimesApi()