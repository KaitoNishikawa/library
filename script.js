const openModalButton = document.querySelector('#new-book-button')
const modal = document.querySelector('#modal')
const overlay = document.getElementById('overlay')
const nameForm = document.getElementById('name')
const authorForm = document.getElementById('author')
const pagesForm = document.getElementById('pages')
const readForm = document.getElementById('have-read')
const contentBody = document.getElementById('content-grid-container')
const h1 = document.querySelector('h1')

var error = null;

openModalButton.addEventListener('click', ()=>{
    openModal(modal)
})

overlay.addEventListener('click', ()=>{
    closeModal(modal)
})

document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') {
        closeModal(modal)
    }
})

modal.addEventListener('submit', (e)=>{
    e.preventDefault()
    let canAdd = true;
    for(let i = 0; i < myLibrary.length; i++){
        if(title.value == myLibrary[i].title){
            canAdd = false            
            break
        }
    }

    if(canAdd){
        let book = new Book(title.value, author.value, pages.value, read.checked)
        myLibrary.push(book)
        addBookToLibrary(book)        
        closeModal(modal)
    }

    else{
        if(error != null) error.remove()
        error = document.createElement('div')
        error.className = 'error-message'
        error.textContent = 'This book already exists in your library'
        h1.after(error)
    }
})

function openModal(modal){
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    if(error != null) error.remove()
    modal.reset()
}

let myLibrary = []

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(book){
    var container = document.createElement('div')
    container.className = 'book-container'
    container.dataset.title = book.title

    var titleArea = document.createElement('div')
    titleArea.className = 'book-text'
    titleArea.textContent = '"' + book.title + '"'

    var authorArea = document.createElement('div')
    authorArea.className = 'book-text'
    authorArea.textContent = book.author

    var pagesArea = document.createElement('div')
    pagesArea.className = 'book-text'
    pagesArea.textContent = book.pages

    var readButton = document.createElement('button')
    readButton.className = 'read-indicator-button'
    if(book.read){
        readButton.textContent = 'Read'
        readButton.style.backgroundColor = '#a8ff9e'
    } 
    else{
        readButton.textContent = 'Not read'
        readButton.style.backgroundColor = '#f99c9c'
    } 
    readButton.addEventListener('click', ()=>{
        if(event.target.textContent == 'Read'){
            event.target.textContent = 'Not read'
            readButton.style.backgroundColor = '#f99c9c'
        } 
        else{
            event.target.textContent = 'Read'
            readButton.style.backgroundColor = '#a8ff9e'
        }

        for(let i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].title == event.target.parentNode.dataset.title){
                myLibrary[i].read = event.target.textContent == 'Read'
                break
            }
        }
    })

    var removeButton = document.createElement('div')
    removeButton.className = 'remove-button'
    removeButton.textContent = 'Remove'
    removeButton.addEventListener('click', ()=>{
        event.target.parentNode.remove()

        for(let i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].title == event.target.parentNode.dataset.title){
                myLibrary.splice(i, 1)
                break
            }
        }
    })

    container.appendChild(titleArea)
    container.appendChild(authorArea)
    container.appendChild(pagesArea)
    container.appendChild(readButton)
    container.appendChild(removeButton)
    contentBody.appendChild(container)
}