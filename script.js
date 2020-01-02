function init() {
    //initializes library data
    let myLibrary = localStorage.getItem("myLibrary")
    document.getElementsByTagName('form')[0].addEventListener('submit', onSubmit)

    // first time loaded!
    if(!myLibrary) {
        console.log('First Time!')
        let myLibrary = []
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))

        let a = new Book('East of Eden', 'John Steinbeck', 394, 'on')
        let b = new Book('Surprised by Joy', 'C.S. Lewis', 182, 'off')
        let c = new Book('Man\'s Search for Meaning', 'Viktor Frankl', 246, 'on')

        addBookToLibrary(a)
        addBookToLibrary(b)
        addBookToLibrary(c)
        
    }
}

function Book(title, author, pages, read) {
    //Book object prototype
    this.title = title
    this.author = author
    this.pages = pages 
    this.read = read == 'on' ? 'Yes' : 'No'
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
    book.index = storedLibrary.length
    storedLibrary.push(book);
    console.log(book.index)
    localStorage.setItem("myLibrary",JSON.stringify(storedLibrary))
}

function makeBookRow(book) {
    //make new row of book data
    var row = document.createElement('tr')
    let validKeys = ['title','author','pages','read']

    validKeys.forEach(function (key) {
        var col = document.createElement('td')
        col.textContent = book[key]
        row.appendChild(col)
        
    })
    return row;
}

function render() {
    //renders data to html for display
    let parent = document.getElementById('table')
    let storedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    //var newBook = document.getElementById('btn')
    //newBook.addEventListener('click', newBookClick)
    storedLibrary.forEach(function (book) {
        parent.appendChild(makeBookRow(book))

    })
    
};

function validSubmission(inputs) {
    return 1
}

function onSubmit() {
    
    let form = document.getElementsByTagName('form')[0]
    let inputs = document.getElementsByTagName('input')
    //console.log(window.location.href)
    console.log(inputs)
    if (validSubmission(inputs)) {
        let title = inputs[0]['value'], author = inputs[1]['value'],
            pages = inputs[2]['value'], read = inputs[3]['value'];
            addBookToLibrary(new Book(title, author, pages, read))
    }
    console.log('setting up...')
    

}


init()
render()



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