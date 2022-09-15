var categoryArr = ['fiction', 'nonfiction', 'graphic-books-manga', 'young-adult', 'business', 'crime',
'science', 'sports', 'travel']
var nyTimesCategory = ['hardcover-fiction', 'hardcover-nonfiction', 'graphic-books-and-manga', 'young-adult',
'business-books', 'crime-and-punishment', 'science', 'sports', 'travel']
var categoryLabels = ['Fiction', 'Nonfiction', 'Graphic Books/Manga', 'Young Adult', 'Business', 'Crime', 'Science',
'Sports', 'Travel']
var mainElement = document.querySelector('main')

function introPage() {
    // let mainElement = document.querySelector('main')
    let bigHeader = document.createElement('h1')
    bigHeader.innerHTML = 'Pick me a book to read'
    bigHeader.setAttribute('class', 'bigHeader')
    mainElement.appendChild(bigHeader)
    let introText = document.createElement('p')
    introText.setAttribute('id', 'intro-text')
    introText.innerHTML = 'Select a genre (or genres) and we will select a book for you from the current NY Times Bestseller Lists'
    mainElement.appendChild(introText)
    let startBtn = document.createElement('button')
    startBtn.setAttribute('id', 'start-button')
    startBtn.setAttribute('class', 'button')
    startBtn.innerHTML = 'Get Started'
    mainElement.appendChild(startBtn)
    document.getElementById('start-button').addEventListener('click', function() {
        removeIntro()
        launchPage()
    })
}

function removeIntro() {
    document.getElementById('intro-text').remove()
    document.getElementById('start-button').remove()
}

function launchPage() {
    // let bigHeader = document.createElement('h1')
    // bigHeader.innerHTML = 'Pick me a book to read'
    // bigHeader.setAttribute('class', 'bigHeader')
    // removeIntro()
    let genreHeader = document.createElement('h2')
    genreHeader.setAttribute('class', 'header')
    genreHeader.innerHTML = 'Choose a Genre'
    // let mainElement = document.querySelector('main')
    // mainElement.appendChild(bigHeader)
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
        let label = document.createElement('label')
        genre.setAttribute('class', 'subGenres-item')
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
    submitBtn.setAttribute('class', 'button')
    mainElement.appendChild(submitBtn)
    document.getElementById('submit').addEventListener('click', checkboxes)
}

function hideGenres() {
    document.querySelector('.container-subGenres').remove()
    document.getElementById('submit').remove()
}

function googleBooksApi(bookData) {
    let requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + bookData.title + 'isbn:' + bookData.primary_isbn13
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        // let googleData = data.items[0]
        // console.log(googleData)
        console.log(bookData)
        displayInfo(bookData)
    })
} 

function displayInfo(bookData) {
    // let bookInfoList = document.createElement('ul')
    // mainElement.appendChild(bookInfoList)
    // let infoArr = [bookData.author, bookData.description]
    // for(let i = 0; i < infoArr.length; i++) {
    //     let bookInfo = document.createElement('li')
    //     bookInfo.innerHTML = 
    // }
    let author = document.createElement('p')
    author.innerHTML = bookData.author
    author.setAttribute('id', 'author')
    let coverArt = document.createElement('img')
    coverArt.setAttribute('src', bookData.book_image)
    coverArt.setAttribute('id', 'cover-art')
    let description = document.createElement('p')
    description.innerHTML = bookData.description
    description.setAttribute('id', 'description')
    let backBnt = document.createElement('button')
    backBnt.setAttribute('class', 'button')
    backBnt.setAttribute('id', 'back-button')
    backBnt.innerHTML = 'Pick a new Genre'
    mainElement.appendChild(author)
    mainElement.appendChild(coverArt)
    mainElement.appendChild(description)
    mainElement.appendChild(backBnt)
    backBnt.addEventListener('click', goBack)
}

function goBack() {
    document.getElementById('author').remove()
    document.getElementById('cover-art').remove()
    document.getElementById('description').remove()
    document.getElementById('back-button').remove()
    document.querySelector('.header').remove()
    launchPage()
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
        // console.log(data)
        let x = getRandomBook(data)
        let isbn = data.results.books[x].primary_isbn13
        let bookName = data.results.books[x].title
        let bookData = data.results.books[x]
        document.querySelector('.header').innerHTML = bookName
        console.log(x)
        console.log(isbn)
        console.log(bookName)
        googleBooksApi(bookData)
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
    if(categorySelections.length > 0) {
        hideGenres()
        nyTimesApi(categorySelections)
    }else {
        alert('Please select at least one genre.')
    }
 }

// function showBookData(googleData, nytData)

introPage()
// document.getElementById('submit').addEventListener('click', checkboxes)
// document.getElementById('start-button').addEventListener('click', launchPage)

// nyTimesApi()