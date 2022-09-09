function getApi() {
    let requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=dragon+subject:fantasy'
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data)
    })
}

function getApi2() {
    let requestUrl = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=8DYkNsuedhfrGlFCoGJ82DgppVWLNTXD'
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data)
    })
}

getApi()
getApi2()