let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayed = false;
}

function addBookToLibrary() {
    const elements = document.getElementById('new-book').elements;

    let title = elements["book-title"].value;
    let author = elements.author.value;
    let pages = elements.pages.value;
    let read = elements.read.value;

    const book = new Book(title, author, pages, read);
    for (let prop in book) {
        if (book[prop] === '' || prop === 'pages' && isNaN(book[prop])) {
            return;
        }
    }

    myLibrary.push(book);
    toggleAddBook(false);
    render();
}

const showFormButton = document.getElementById('add');
showFormButton.addEventListener('click', () => {
    let formOpen = document.getElementById('input-pop-up').style.display === 'none';
    formOpen ? toggleAddBook() : toggleAddBook(false);
});

function toggleAddBook(show = true) {
    let form = document.getElementById('input-pop-up');
    show ? form.style.display = 'flex' : form.style.display = 'none';
}

const submitButton = document.getElementById('add-button');
submitButton.addEventListener('click', addBookToLibrary);

function render() {
    const tableBody = document.getElementById('table-body');
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        if (book.displayed) {
            continue;
        }

        const tableRow = document.createElement('tr');

        for (let prop in book) {
            if (prop === 'displayed' || prop === 'read') {
                continue;
            }

            const item = document.createElement('td');
            item.innerHTML = book[prop];
            tableRow.appendChild(item);
        }

        const readBook = document.createElement('td');
        const readButton = document.createElement('button');
        readButton.classList.add('read-buttons');
        book.read === 'yes' ? readButton.classList.add('read-true') : readButton.classList.add('read-false');

        readButton.addEventListener('click', () => {
            book.read === 'yes' ? book.read = 'no' : book.read = 'yes';

            readButton.classList.toggle('read-true');
            readButton.classList.toggle('read-false');
        });
        readBook.appendChild(readButton);
        tableRow.appendChild(readBook);

        const deleteBook = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', () => {
            tableBody.removeChild(tableRow);
            myLibrary.splice(i, 1);
        });

        deleteBook.appendChild(deleteButton);
        tableRow.appendChild(deleteBook);

        tableBody.appendChild(tableRow);
        book.displayed = true;
    }
}
    
