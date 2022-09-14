let categoryArr = ['fiction', 'nonfiction', 'graphic-books-manga', 'young-adult', 'business', 'crime',
'science', 'sports', 'travel']
let nyTimesCategory = ['hardcover-fiction', 'hardcover-nonfiction', 'graphic-books-and-manga', 'young-adult',
'business-books', 'crime-and-punishment', 'science', 'sports', 'travel']
let categoryLabels = ['Fiction', 'Nonfiction', 'Graphic Books and Manga', 'Young Adult', 'Business', 'Crime', 'Science',
'Sports', 'Travel']
function launchPage() {
    let bigHeader = document.createElement('h1')
    bigHeader.innerHTML = 'Pick me a book to read'
    bigHeader.setAttribute('class', 'bigHeader')
    let genreHeader = document.createElement('h2')
    genreHeader.setAttribute('class', 'header')
    genreHeader.innerHTML = 'Choose a Genre'
    let mainElement = document.querySelector('main')
    mainElement.appendChild(bigHeader)
    mainElement.appendChild(genreHeader)
    let genreContainer = document.createElement('div')
    genreContainer.setAttribute('class', 'container-subGenres')
    mainElement.appendChild(genreContainer)
    let genreList1 = document.createElement('ul')
    let genreList2 = document.createElement('ul')
    let genreList3 = document.createElement('ul')
    genreList1.setAttribute('class', 'subGenres-col')
    genreList3.setAttribute('class', 'subGenres-col')
    genreList3.setAttribute('class', 'subGenres-col')
    genreContainer.appendChild(genreList1)
    genreContainer.appendChild(genreList2)
    genreContainer.appendChild(genreList3)
    for(let i = 0; i < categoryLabels.length; i++) {
        let genre = document.createElement('li')
        let checkbox = document.createElement('input')
        let label = document. createElement('label')
        label.setAttribute('for', nyTimesCategory[i])
        label.innerHTML = categoryLabels[i]
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('id', nyTimesCategory[i])
        // genre.innerHTML = categoryLabels[i]
        genre.appendChild(checkbox)
        genre.appendChild(label)
        if(i<3) {
            genreList1.appendChild(genre)
        }
        else if(i<6) {
            genreList2.appendChild(genre)
        }
        else {
            genreList3.appendChild(genre)
        }
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