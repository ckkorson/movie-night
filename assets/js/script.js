let categoryArr = ['fiction', 'nonfiction', 'graphic-books-manga', 'young-adult', 'business', 'crime',
'science', 'sports', 'travel']
let nyTimesCategory = ['hardcover-fiction', 'hardcover-nonfiction', 'graphic-books-and-manga', 'young-adult',
'business-books', 'crime-and-punishment', 'science', 'sports', 'travel']
let categoryLabels = ['Fiction', 'Nonfiction', 'Graphic Books and Manga', 'Young Adult', 'Business', 'Crime', 'Science',
'Sports', 'Travel']
function launchPage() {
    let genreHeader = document.createElement('h2')
    genreHeader.setAttribute('class', 'header')
    genreHeader.innerHTML = 'Choose a Genre'
    let mainElement = document.querySelector('main')
    mainElement.appendChild(genreHeader)
    for(let i = 0; i < categoryLabels.length; i++) {
        let genreList = document.createElement('ul')
        let genre = document.createElement('li')
        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('id', nyTimesCategory[i])
        genre.innerHTML = categoryLabels[i]
        mainElement.appendChild(genreList)
        genreList.appendChild(genre)
        genre.appendChild(checkbox)
    }
    let submitBtn = document.createElement('button')
    submitBtn.innerHTML = 'Submit'
    submitBtn.setAttribute('id', 'submit')
    mainElement.appendChild(submitBtn)
}


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

 function getRandomCategory(nyTimesCategory) {
    return Math.floor(Math.random() * nyTimesCategory.length)
 }

 function checkboxes() {
    let categorySelections = []
    for(let i = 0; i < nyTimesCategory.length; i++) {
        // if(document.getElementById(categoryArr[i]).checked)
        let x = document.getElementById(nyTimesCategory[i]).checked
        if(x) {
            categorySelections.push(nyTimesCategory[i])
        }
    }
    console.log(categorySelections)
    nyTimesApi(categorySelections)
 }
launchPage()
document.getElementById('submit').addEventListener('click', checkboxes)

// nyTimesApi()