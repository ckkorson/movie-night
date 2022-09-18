// array to hold ny times bestseller list names
var nyTimesCategory = ['hardcover-fiction', 'hardcover-nonfiction', 'graphic-books-and-manga', 'young-adult',
'business-books', 'crime-and-punishment', 'science', 'sports', 'travel']
// array to hold genre names that coorespond to bestseller list names
var categoryLabels = ['Fiction', 'Nonfiction', 'Graphic Books/Manga', 'Young Adult', 'Business', 'Crime', 'Science',
'Sports', 'Travel']
// global variable for the main element
var mainElement = document.querySelector('main')
// create bookHistory array from local storage if it already exists
// otherwise create empty array
if (JSON.parse(localStorage.getItem('bookHistory')) != null) {
    var bookHistory = JSON.parse(localStorage.getItem('bookHistory'))
}else {
    var bookHistory = []
}
// function to for the intro screen
// creates headers, text, and button
function introPage() {
    let bigHeader = document.createElement('h1')
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'center')
    bigHeader.innerHTML = 'New York Times Book Picker'
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
    buttonDiv.appendChild(startBtn)
    mainElement.appendChild(buttonDiv)
    if(bookHistory.length > 0) {
        addHistory()
    }
    document.getElementById('start-button').addEventListener('click', function() {
        removeIntro()
        genrePicker()
    })
}
// function to add any recent searches to the bottom of the page
function addHistory() {
    let histContainer = document.createElement('div')
    histContainer.setAttribute('class', 'history-container')
    mainElement.appendChild(histContainer)
    let histHeader = document.createElement('h3')
    histHeader.setAttribute('id', 'history-header')
    histHeader.innerHTML = 'Recent Suggestions:'
    histContainer.appendChild(histHeader)
    for(let i = 0; i < bookHistory.length; i++) {
        let histItem = document.createElement('p')
        histItem.setAttribute('class', 'history-item')
        histItem.setAttribute('id', 'item-' + i)
        histItem.innerHTML = bookHistory[i].title
        histContainer.appendChild(histItem)
        let bookData = bookHistory[i]
        if(document.querySelector('.button').innerHTML == 'Get Started') {
            histItem.addEventListener('click', function() {
                removeIntro()
                displayHistoryInfo(bookData)
            })
        } else {
            histItem.addEventListener('click', function() {
                document.getElementById('cover-art').remove()
                document.getElementById('description').remove()
                document.getElementById('back-button').remove()
                document.querySelector('.header').remove()
                document.getElementById('preview-link').remove()
                if(bookHistory.length > 0) {
                    document.querySelector('.history-container').remove()
                }
                displayHistoryInfo(bookData)
            })
        }
    }
}
// function to display info from recent search in the same format as new books
function displayHistoryInfo(bookData) {
    let genreHeader = document.createElement('h2')
    genreHeader.setAttribute('class', 'header')
    genreHeader.innerHTML = '"' + bookData.title + '"' + '    By: ' + bookData.author
    mainElement.appendChild(genreHeader)
    displayBasicInfo(bookData)
}
// remove elements from the intro screen
function removeIntro() {
    document.getElementById('intro-text').remove()
    document.getElementById('start-button').remove()
    if(bookHistory.length > 0) {
        document.querySelector('.history-container').remove()
    }
}
// function to display the different genres with selectable checkboxes
function genrePicker() {
    let genreHeader = document.createElement('h2')
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'center')
    genreHeader.setAttribute('class', 'header')
    genreHeader.innerHTML = 'Choose a Genre'
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
    buttonDiv.appendChild(submitBtn)
    mainElement.appendChild(buttonDiv)
    document.getElementById('submit').addEventListener('click', checkboxes)
}
// remove genre checkboxes elements
function hideGenres() {
    document.querySelector('.container-subGenres').remove()
    document.getElementById('submit').remove()
}
// pull from google books api based on random book selected from nyt api
function googleBooksApi(bookData) {
    let requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + bookData.title + 'isbn:' + bookData.primary_isbn10
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(bookData)
        console.log(data)
        if(data.totalItems > 0) {
            let googleData = data.items[0]
            console.log(googleData)
            displayDetailedInfo(bookData, googleData)
        }else {
            displayBasicInfo(bookData)
        }
    })
} 
// display book data for books that were sucessfully found using google books api
function displayDetailedInfo(bookData, googleData) {
    let center = document.createElement('div')
    center.setAttribute('class', 'center')
    let coverArt = document.createElement('img')
    coverArt.setAttribute('src', bookData.book_image)
    coverArt.setAttribute('id', 'cover-art')
    let description = document.createElement('p')
    if(googleData.volumeInfo.description != undefined) {
        description.innerHTML = googleData.volumeInfo.description
    }else {
        description.innerHTML = bookData.description
    }
    description.setAttribute('id', 'description')
    let previewLink = document.createElement('a')
    previewLink.setAttribute('id', 'preview-link')
    previewLink.setAttribute('href', googleData.volumeInfo.previewLink)
    previewLink.setAttribute('target', 'blank')
    previewLink.innerHTML = 'Link book preview'
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute("class", "center")
    let backBnt = document.createElement('button')
    backBnt.setAttribute('class', 'button')
    backBnt.setAttribute('id', 'back-button')
    backBnt.innerHTML = 'Pick a new Genre'
    buttonDiv.appendChild(backBnt)
    center.appendChild(coverArt)
    mainElement.appendChild(center)
    mainElement.appendChild(description)
    mainElement.appendChild(previewLink)
    mainElement.appendChild(buttonDiv)
    backBnt.addEventListener('click', goBack)
    addHistory()
    detailedStorage(bookData, googleData)
}
// store book data in local storage for books that were sucessfully found using google books api
function detailedStorage(bookData, googleData) {
    console.log(bookHistory)
    let searchHistory = {}
    searchHistory.title = bookData.title
    searchHistory.author = bookData.author
    searchHistory.book_image = bookData.book_image
    searchHistory.description = googleData.volumeInfo.description
    searchHistory.amazon_product_url = googleData.volumeInfo.previewLink
    bookHistory.unshift(searchHistory)
    console.log(bookHistory)
    if (bookHistory.length > 3) {
        bookHistory.pop()
    }
    window.localStorage.setItem('bookHistory', JSON.stringify(bookHistory))
}
// display book data for books that were not found using google books api 
function displayBasicInfo(bookData) {
    let center = document.createElement('div')
    center.setAttribute('class', 'center')
    let coverArt = document.createElement('img')
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'center')
    coverArt.setAttribute('src', bookData.book_image)
    coverArt.setAttribute('id', 'cover-art')
    let description = document.createElement('p')
    description.innerHTML = bookData.description
    description.setAttribute('id', 'description')
    let previewLink = document.createElement('a')
    previewLink.setAttribute('id', 'preview-link')
    previewLink.setAttribute('href', bookData.amazon_product_url)
    previewLink.setAttribute('target', 'blank')
    previewLink.innerHTML = 'Link book preview'
    let backBnt = document.createElement('button')
    backBnt.setAttribute('class', 'button')
    backBnt.setAttribute('id', 'back-button')
    backBnt.innerHTML = 'Pick a new Genre'
    center.appendChild(coverArt)
    mainElement.appendChild(center)
    mainElement.appendChild(description)
    mainElement.appendChild(previewLink)
    buttonDiv.appendChild(backBnt)
    mainElement.appendChild(buttonDiv)
    backBnt.addEventListener('click', goBack)
    addHistory()
    basicStorage(bookData)
}
// store book data in local storage for books that were not found using google books api
function basicStorage(bookData) {
    console.log(bookHistory)
    let searchHistory = {}
    searchHistory.title = bookData.title
    searchHistory.author = bookData.author
    searchHistory.book_image = bookData.book_image
    searchHistory.description = bookData.description
    searchHistory.amazon_product_url = bookData.amazon_product_url
    bookHistory.unshift(searchHistory)
    console.log(bookHistory)
    if (bookHistory.length > 3) {
        bookHistory.pop()
    }
    window.localStorage.setItem('bookHistory', JSON.stringify(bookHistory))
}
// go back to genre selection from book display screen
function goBack() {
    document.getElementById('cover-art').remove()
    document.getElementById('description').remove()
    document.getElementById('back-button').remove()
    document.querySelector('.header').remove()
    document.getElementById('preview-link').remove()
    if(bookHistory.length > 0) {
        document.querySelector('.history-container').remove()
    }
    genrePicker()
}
// pull random book from nyt bestseller list api based on user selected genre(s)
function nyTimesApi(categorySelections) {
    let randomCategory = getRandomCategory(categorySelections)
    console.log(categorySelections[randomCategory])
    let requestUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/' + categorySelections[randomCategory] + '.json?api-key=8DYkNsuedhfrGlFCoGJ82DgppVWLNTXD'
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        let x = getRandomBook(data)
        let bookData = data.results.books[x]
        document.querySelector('.header').innerHTML = '"' + bookData.title + '"' + '    By: ' + bookData.author
        googleBooksApi(bookData)
    })
}
// get a random position in bestseller list to select a random book
function getRandomBook(data) {
    return Math.floor(Math.random() * data.results.books.length)
 }
// get a random position in nyTimesCategory array to select random category from user selection
 function getRandomCategory(nyTimesCategory) {
    return Math.floor(Math.random() * nyTimesCategory.length)
 }
// check for selected checkboxes to create array of select genres
 function checkboxes() {
    let categorySelections = []
    for(let i = 0; i < nyTimesCategory.length; i++) {
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
        noCategory()
    }
 }
// display error message if the user does not select a genre
function noCategory() {
    hideGenres()
    document.querySelector('.header').remove()
    let errorMessage = document.createElement('p')
    errorMessage.setAttribute('id', 'error-message')
    errorMessage.innerHTML = 'Please select at least one genre.'
    let errorBtn = document.createElement('button')
    errorBtn.setAttribute('class', 'button')
    errorBtn.setAttribute('id', 'error-button')
    errorBtn.innerHTML = 'Try Again'
    mainElement.appendChild(errorMessage)
    mainElement.appendChild(errorBtn)
    errorBtn.addEventListener('click', hideError) 
}
// hide no selection error message
function hideError() {
    document.getElementById('error-message').remove()
    document.getElementById('error-button').remove()
    genrePicker()
}
// run introPage function when user launches the page
introPage()