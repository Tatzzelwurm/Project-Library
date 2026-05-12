const myLibrary = [];

function Book(Title, Author, Pages, Status, CoverUrl) {
    this.id = crypto.randomUUID()
    this.title = Title
    this.author = Author
    this.pages = Pages
    this.status = Status
    this.coverUrl = CoverUrl || "images/default-book-cover.avif";
    this.info = function () {
        console.log(`${this.title} by ${this.author},${this.pages} pages,${this.status}!`)
    }
    this.changeStatus = function () {
        if (this.status === "Unread") this.status = "Read"
        else {
            this.status = "Unread"
        }
    }
}

addBookToLibrary("1984", "George Orwell", 352, "Read")
addBookToLibrary("Evgeniy Onegin", "Alexander Pushkin", 257, "Read")
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 128, "Unread")

const main = document.querySelector(".main")
const cards = document.querySelectorAll(".card")

const ids = document.querySelectorAll(".book-id")
const titles = document.querySelectorAll(".title")
const authors = document.querySelectorAll(".author")
const pages = document.querySelectorAll(".pages")
const statuses = document.querySelectorAll(".status")

myLibrary.forEach((book, index) => {
    ids[index].textContent = `ID: ${book.id}`
    titles[index].textContent = `${book.title}`
    authors[index].textContent = `Author: ${book.author}`
    pages[index].textContent = `Pages: ${book.pages}`
    statuses[index].textContent = `Status: ${book.status}`
});

cards.forEach((card) => {
    const prefixedId = card.querySelector(".book-id").textContent
    const bookStatus = card.querySelector(".status")
    const bookId = prefixedId.slice(4)
    card.setAttribute("data-id", bookId)
    const removeBookBtn = card.querySelector(".delete-book-btn")
    const changeStatusBtn = card.querySelector(".change-status-btn")
    removeBookBtn.addEventListener("click", () => confirmBookDeletion(bookId),
        changeStatusBtn.addEventListener("click", () => changeBookStatus(bookStatus, prefixedId))
    )
}
)

function confirmBookDeletion(bookId) {
    const isConfirm = confirm("Are you sure you want to delete this book?")
    if (isConfirm) removeBookFromLibrary(bookId)
}

function addBookToLibrary(title, author, pages, selectedStatus, coverUrl) {
    const newBook = new Book(title, author, pages, selectedStatus, coverUrl)
    myLibrary.push(newBook)

}

function createBookCard() {
    const card = document.createElement("div")
    card.classList.add("card")
    const bookCover = document.createElement("img")
    bookCover.classList.add("book-img")
    const bookInfo = document.createElement("div")
    bookInfo.classList.add("book-info")
    const bookId = document.createElement("p")
    bookId.classList.add("book-id")
    const bookTitle = document.createElement("p")
    bookTitle.classList.add("title")
    const bookAuthor = document.createElement("p")
    bookAuthor.classList.add("author")
    const bookPages = document.createElement("p")
    bookPages.classList.add("pages")
    const bookStatus = document.createElement("p")
    bookStatus.classList.add("status")
    const bookAction = document.createElement("div")
    bookAction.classList.add("book-action")
    bookAction.innerHTML = `<svg class="change-status-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Change status</title><path d="M23.5,17L18.5,22L15,18.5L16.5,17L18.5,19L22,15.5L23.5,17M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.75,12.65 22.44,13.26 22.08,13.85C21.5,13.5 20.86,13.25 20.18,13.12L20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12C4.83,15.36 8.24,17.5 12,17.5L13.21,17.43C13.07,17.93 13,18.46 13,19V19.46L12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5Z" /></svg>
<svg class="delete-book-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete book</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`
    card.append(bookCover, bookInfo, bookAction)
    bookInfo.append(bookId, bookTitle, bookAuthor, bookPages, bookStatus)
    main.appendChild(card)

    addBookInfo(card, bookId, bookTitle, bookAuthor, bookPages, bookStatus, bookCover)

    const removeBookBtn = card.querySelector(".delete-book-btn")
    const changeStatusBtn = card.querySelector(".change-status-btn")
    removeBookBtn.addEventListener("click", () => confirmBookDeletion(card.dataset.id))
    changeStatusBtn.addEventListener("click", () => changeBookStatus(bookStatus, bookId.textContent))
}

function addBookInfo(card, bookId, bookTitle, bookAuthor, bookPages, bookStatus, bookCover) {
    const lastBook = myLibrary[myLibrary.length - 1]
    bookId.textContent = `ID: ${lastBook.id}`
    bookTitle.textContent = lastBook.title
    bookAuthor.textContent = `Author: ${lastBook.author}`
    bookPages.textContent = `Pages: ${lastBook.pages}`
    bookStatus.textContent = `Status: ${lastBook.status}`
    bookCover.src = lastBook.coverUrl
    card.setAttribute("data-id", lastBook.id)
}


const addBookBtn = document.querySelector(".add-book-btn")
const addBookDialog = document.getElementById("add-book-dialog")
const addBookDialogBtn = document.querySelector(".add-book-dialog-btn")
const closeDialogBtn = document.querySelector(".close-dialog-btn")


addBookBtn.addEventListener("click", () => addBookDialog.showModal())
closeDialogBtn.addEventListener("click", () => {
    addBookDialog.close()
    resetForm()
})


const coverPreview = document.getElementById('coverPreview');
const fileInput = document.getElementById('book-cover');

coverPreview.addEventListener("click", () => fileInput.click())

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        coverPreview.style.backgroundImage = `url(${url})`;
        coverPreview.classList.add('has-image');
        // URL.revokeObjectURL(url) - освободишь при закрытии диалога
    }
});

const titleInput = document.getElementById("title")
const authorInput = document.getElementById("author")
const pagesInput = document.getElementById("pages")
const statusRadios = document.getElementsByName("status");

function getSelectedStatus() {
    for (const radio of statusRadios) {
        if (radio.checked) {
            const value = radio.id
            return value[0].toUpperCase() + value.slice(1).toLowerCase();
        }
    }
}

addBookDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (titleInput.value === "" || authorInput.value === "" || pagesInput.value === "") {
        validationInput()
        return
    }
    const selectedStatus = getSelectedStatus();
    const coverFile = document.getElementById("book-cover").files[0];
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;


    if (coverFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const coverUrl = e.target.result;
            console.log(titleInput.value)
            addBookToLibrary(title, author, pages, selectedStatus, coverUrl);
            createBookCard();
        };
        reader.readAsDataURL(coverFile);
    } else {
        addBookToLibrary(title, author, pages, selectedStatus, null);
        createBookCard();
    }
    addBookDialog.close();
    resetForm();
})

function resetForm() {
    titleInput.value = ""
    authorInput.value = ""
    pagesInput.value = ""
    fileInput.value = ""
    coverPreview.style.backgroundImage = "none";
    coverPreview.classList.remove("has-image");
    statusRadios[1].checked = true
    titleInput.classList.remove("invalid-input")
    authorInput.classList.remove("invalid-input")
    pagesInput.classList.remove("invalid-input")
}

function validationInput() {
    inputFields.forEach((field) => {
        if (field.value == "") field.classList.add("invalid-input")
    })
}

const inputFields = [titleInput, authorInput, pagesInput]

inputFields.forEach((field) => {
    field.addEventListener("click", () => field.classList.remove("invalid-input"));
});



function removeBookFromLibrary(bookId) {
    const cardToRemove = document.querySelector(`.card[data-id="${bookId}"]`);
    if (cardToRemove) cardToRemove.remove();
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) myLibrary.splice(index, 1);

}

function changeBookStatus(bookStatus, prefixedId) {
    const bookId = prefixedId.slice(4)
    if (bookStatus.textContent === "Status: Unread") bookStatus.textContent = "Status: Read";
    else { bookStatus.textContent = "Status: Unread" }
    const index = myLibrary.findIndex(book => book.id === bookId);
    myLibrary[index].changeStatus()
}


const searchField = document.getElementById("searchBook")
const searchBtn = document.getElementById("searchBtn")

function searchBook() {
    const matchedTitle = [...document.querySelectorAll(".title")].find(el => el.textContent === searchField.value);
    const targetCard = matchedTitle.closest(".card")
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
        if (card !== targetCard) card.remove()
    })
}

searchBtn.addEventListener("click", () => searchBook())
searchField.addEventListener('search', () => searchBook());

searchField.addEventListener("focus", () => searchBtn.style.backgroundColor = "rgb(252, 228, 194)")
searchField.addEventListener("focusout", () => searchBtn.style.backgroundColor = "")