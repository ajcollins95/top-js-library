let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages 
    this.read = read

    this.info = function() {
        let readText = (read == 'y') ? 'already read' : 'not read yet'
        return (title + ' by ' + author + ', ' + pages + ' pages, ' + readText)
    }
 // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
}

function addBookToLibrary(book) {
    //adds a book to the library
    myLibrary.push(book);
}

function makeDetailNode(book) {
    var newList = document.createElement('ul')

    var author = document.createElement('li')
    author.textContent = 'by ' + book.author
    newList.appendChild(author)

    var pages = document.createElement('li')
    pages.textContent = book.pages + ' pages'
    newList.appendChild(pages)

    var read = document.createElement('li')
    read.textContent = (book.read == 'y') ? 'already read' : 'not read yet'
    newList.appendChild(read)
    
    return newList

}

function newBookClick() {
    //makes form visible and hides new book button
    let form = document.getElementById('myForm')
    form.style.display = "block"
    document.getElementById('btn').style.display = "none"
}

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

var render = function (parent, library) {
    var newBook = document.getElementById('btn')
    newBook.addEventListener('click', newBookClick)
    library.forEach(function (book) {
        var li = document.createElement('li')
        li.textContent = book.title
        parent.appendChild(li)
        parent.appendChild(makeDetailNode(book))

    })
};

let a = new Book('East of Eden', 'John Steinbeck', 394, 'y')
let b = new Book('Surprised by Joy', 'C.S. Lewis', 182, 'n')
let c = new Book('Man\'s Search for Meaning', 'Viktor Frankl', 246, 'y')

addBookToLibrary(a)
addBookToLibrary(b)
addBookToLibrary(c)

console.log(myLibrary)


render(document.getElementById('list'), myLibrary)