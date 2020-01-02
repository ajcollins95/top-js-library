function init() {
    let myLibrary = localStorage.getItem("myLibrary")
    // first time loaded!
    if(!myLibrary) {
        console.log('First Time!')
        let myLibrary = []
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))

        let a = new Book('East of Eden', 'John Steinbeck', 394, 'y')
        let b = new Book('Surprised by Joy', 'C.S. Lewis', 182, 'n')
        let c = new Book('Man\'s Search for Meaning', 'Viktor Frankl', 246, 'y')

        addBookToLibrary(a)
        addBookToLibrary(b)
        addBookToLibrary(c)
        
    }
}

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages 
    this.read = read
    //this.index = 0

    this.info = function() {
        let readText = (read == 'y') ? 'already read' : 'not read yet'
        return (title + ' by ' + author + ', ' + pages + ' pages, ' + readText)
    }
 // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
}

function addBookToLibrary(book) {
    //adds a book to the library
    let storedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    console.log(storedLibrary)
    alert('I stopped')
    book.index = storedLibrary.length
    storedLibrary.push(book);
    console.log(book.index)
    localStorage.setItem("myLibrary",JSON.stringify(storedLibrary))
}

function makefarmRow(book) {
    //make new row about a book
    var row = document.createElement('tr')

    Object.keys(book).forEach(function (key) {
        //don't add anything for the info function
        if (key != 'info') {
            //console.log(key)
            var col = document.createElement('td')
            col.textContent = book[key]
            row.appendChild(col)
        }
    })
    return row;
}

function makeBookRow(book) {
    //make new row
    var row = document.createElement('tr')
    let validKeys = ['title','author','pages','read']

    validKeys.forEach(function (key) {
        //console.log(key)
        var col = document.createElement('td')
        col.textContent = book[key]
        row.appendChild(col)
        
    })
    return row;
}
/*

document.getElementById('submit').addEventListener('click', submission)

function submission() {
    //Adds book on submission
    var formElement = document.getElementById("myForm");
    let data = new FormData(formElement);
    let book = new Book(data.get('title'), 
                        data.get('author'), 
                        data.get('pages'), 
                        data.get('read'))
    addBookToLibrary(book)
    console.log(myLibrary)
    alert(book.title)
}
*/

function render() {
    let parent = document.getElementById('table')
    let storedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    //var newBook = document.getElementById('btn')
    //newBook.addEventListener('click', newBookClick)
    storedLibrary.forEach(function (book) {
        parent.appendChild(makeBookRow(book))

    })
    
};


init()

//console.log(myLibrary[0]['title'])

render()
setup()
//document.getElementById('submit').addEventListener('click', submission)

function setup() {
    let form = document.getElementsByTagName('form')[0]
    let inputs = document.getElementsByTagName('inputs')[0]
    console.log(inputs)

}
/*
function submission() {
    //Adds book on submission
    var formElement = document.getElementById("myForm");
    let data = new FormData(formElement);
    let book = new Book(data.get('title'), 
                        data.get('author'), 
                        data.get('pages'), 
                        data.get('read'))
    addBookToLibrary(book)
    console.log(myLibrary)
    alert(book.title)
}
*/