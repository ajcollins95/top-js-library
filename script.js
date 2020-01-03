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

    this.info = function() {
        let readText = (read == 'y') ? 'already read' : 'not read yet'
        return (title + ' by ' + author + ', ' + pages + ' pages, ' + readText)
    }

    this.toggle = function() {
        this.read = this.read == 'Yes' ? 'No' : 'Yes' 
    }
 
 
}


function addBookToLibrary(book) {
    //adds a book to the library
    let storedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    book.index = storedLibrary.length
    storedLibrary.push(book);
    console.log(book.index)
    localStorage.setItem("myLibrary",JSON.stringify(storedLibrary))
}

function addListener(book, btn) {
    let type = btn.classList
    if (type == 'del') {
        //class is del

    }
    else {
        //class is tgl
        //console.log(book.prototype.info())
        
        //btn.addEventListener('click', book.toggle())

    }
}

function makeBookRow(book) {
    //make new row of book data
    var row = document.createElement('tr')
    let validKeys = ['title','author','pages','read','del','toggle']
    validKeys.forEach(function (key) {
        var col = document.createElement('td')
        if (key == 'del' || key == 'toggle') {
            //when the key is a button
            let btn = document.createElement('button')
            if (key == 'del') {
                btn.classList.add('del')
                btn.innerText = 'X'
            }
            else if (key == 'toggle') {
                btn.classList.add('tgl')
                btn.innerText = 'R'
            }
            addListener(book, btn)
            col.appendChild(btn)
        }
        else {
            //key is actually a key in book
            col.textContent = book[key]
        }
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
}

function validSubmission(inputs) {
    //parses data to see if submission is valid
    //I'll let future me tackle this guy
    return 1
}

function onSubmit() {
    //Adds book to library if Add Book is clicked
    let form = document.getElementsByTagName('form')[0]
    let inputs = document.getElementsByTagName('input')
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