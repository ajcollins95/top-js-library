function init() {
    //initializes library data
    let library = localStorage.getItem("myLibrary")

    // first time loaded!
    if(!library) {
        console.log('First Time!')
    
        let a = new Book('East of Eden', 'John Steinbeck', 394, 'Yes')
        let b = new Book('Surprised by Joy', 'C.S. Lewis', 182, 'No')
        let c = new Book('Man\'s Search for Meaning', 'Viktor Frankl', 246, 'Yes')

        addBookToLibrary(a)
        addBookToLibrary(b)
        addBookToLibrary(c)

    }
    else {
        loadStoredLibrary()
    }
}

function Book(title, author, pages, read) {
    //Book object prototype
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = (read == 'Yes') ? 'Yes' : 'No',

    this.info = function() {
        let readText = (read == 'Yes') ? 'already read' : 'not read yet'
        return (title + ' by ' + author + ', ' + pages + ' pages, ' + readText)
    }

    this.toggle = function() {
        this.read = (this.read == 'Yes') ? 'No' : 'Yes'
    }

}

function loadStoredLibrary() {
    //Gets JSON data and creates a new library with active objects
    let storedLibrary = JSON.parse(localStorage.getItem("myLibrary"))
    storedLibrary.forEach(function (bookData) {
        let book = new Book(bookData['title'], bookData['author'], 
                            bookData['pages'], bookData['read'])
        addBookToLibrary(book)
    })
    console.log('reloaded page')
}

function storeLibrary() {
    //saves library
    localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
}


function addBookToLibrary(book) {
    //adds a book to the library
    book.index = myLibrary.length
    console.log(book.info())
    myLibrary.push(book);
    console.log(myLibrary[myLibrary.length-1].index)
    storeLibrary() 
}

function addListener(book, btn) {
    let type = btn.classList[0]
    btn.classList.add(book.index)
    if (type == 'del') {
        //delete button
        btn.addEventListener('click', deleteBook)
    }
    else {
        //toggle button
        btn.addEventListener('click', toggleBookStatus)
    }
}

function toggleBookStatus(e) {
    //deletes book from DOM and library
    let index = e.target.classList[1]
    let row = e.target.parentNode.parentNode
    myLibrary[index].toggle()
    row.cells[3].innerText = myLibrary[index].read
    storeLibrary() 
}

function deleteBook(e) {
    //deletes book from DOM and library
    let index = e.target.classList[1]
    let row = e.target.parentNode.parentNode
    let confirmation = prompt("Click to confirm book removal")
    if (confirmation != null) {
        removeFromLibrary(index)
        row.remove()
    }
}

function removeFromLibrary(index) {
    //deletes book from library
    if (index > -1) {
        myLibrary.splice(index, 1);
      }
    storeLibrary() 
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
    console.log('rendering...')
    let parent = document.getElementById('table')
    myLibrary.forEach(function (book) {
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
            pages = inputs[2]['value'];
        let read = (inputs[3].checked) ? 'Yes' : 'No'
            addBookToLibrary(new Book(title, author, pages, read))
    }
    console.log('setting up...')
}

let myLibrary = []

init()
document.getElementsByTagName('form')[0].addEventListener('submit', onSubmit)
render()
