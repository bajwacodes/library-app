//Array to store all the books
const myLibrary = [];

// Book constructor 
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        if(read === true){
            return this.title + " by " + this.author + ", " + this.pages + " pages" + ", already read";
        } else{
            return this.title + " by " + this.author + ", " + this.pages + " pages" + ", not read yet";
        }
    }
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
};


function addBooktoLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


function displayBook(arrayOfBooks){
    const container = document.querySelector('.container');
    container.innerHTML = "";

    arrayOfBooks.forEach((book, index) => {
        const NewBook = document.createElement('div');
        NewBook.innerHTML = `
            <h1>${book.title}</h1>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>${book.read ? "Already read" : "Not read yet"}</p>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove Book";
        removeBtn.setAttribute('data-index', index);

        removeBtn.addEventListener('click', () => {
                arrayOfBooks.splice(index, 1);
                displayBook(arrayOfBooks);
        })

        NewBook.appendChild(removeBtn);

        const changeReadStatus = document.createElement('button');
        changeReadStatus.textContent = `${book.read ? "Mark as Unread" : "Mark as Read"}`;

        changeReadStatus.addEventListener('click', () => {

            book.toggleReadStatus();

            displayBook(arrayOfBooks);
        })

        NewBook.appendChild(changeReadStatus);

        // const showForm = document.createElement('button');
        // showForm.textContent = "Add more books";

        // showForm.addEventListener('click', () => {
        //     NewBook.style.display = 'none';
        // })

        // NewBook.appendChild(showForm);

        container.appendChild(NewBook);
    });
}

const showForm = document.getElementById('newBook');
const form = document.getElementById('form');

showForm.addEventListener('click', () => {
    form.style.display = 'block';
})


const submitBook = document.getElementById('submitBook');

submitBook.addEventListener('click', (event) => {
    event.preventDefault();

    if(!form.checkValidity()){
        alert('Please fill in all required fields.');
        return;
    }

    const bookTitle = document.getElementById('book-title').value;
    const bookAuthor = document.getElementById('book-author').value;
    const bookPages = document.getElementById('pages').value;
    const readStatus = document.querySelector('input[name="read-status"]:checked').value === "true";

    addBooktoLibrary(bookTitle, bookAuthor, bookPages, readStatus);

    document.getElementById('form').reset(); // Clear all input fields
})

const showBooks = document.getElementById('showBooks');

showBooks.addEventListener('click', () => {
    displayBook(myLibrary);
})
