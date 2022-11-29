/* Initialize a book object with necessary keys */

const bookArray = [];

/* Initialize necessary variables */

const bookList = document.querySelector('.book-list');
const titleValue = document.querySelector('.form-book-title');
const authorValue = document.querySelector('.form-author-name');
const form = document.querySelector('form');

/* Declare a function to add books in HTML */

function addBooks(index) {
  const article = document.createElement('article');
  article.classList.add('books');
  const id = `article${bookArray[index].bookID}`;
  article.setAttribute('id', id);
  article.innerHTML = `  
  <h4 class="book-name">${bookArray[index].bookTitle}</h4>
  <p class="author-name">${bookArray[index].authorName}</p>
  <button class="remove-button" id="${bookArray[index].bookID}" onclick="removeButtons(id)">Remove</button>
  <hr>`;
  bookList.appendChild(article);
}

/* eslint-disable no-unused-vars */

function removeButtons(id) {
  const articleID = `#article${id}`;
  const removeArticle = document.querySelector(articleID);
  bookList.removeChild(removeArticle);
  storedDataArray = storedDataArray.filter((item) => item.bookID != id)
  dataStore();
  if (storedDataArray.length === 0) {
    window.localStorage.removeItem('name');
  }
}

let i = 0;

/* Declare a function to create bookObject and push it to bookArray */

function add(bookID, bookTitle, authorName) {
  const bookObject = {
    bookID: null,
    bookTitle: '',
    authorName: '',
  };
  bookObject.bookID = bookID;
  bookObject.bookTitle = bookTitle;
  bookObject.authorName = authorName;
  bookArray.push(bookObject);
  addBooks(i);
  i += 1;
}

/* Using local storage */

let storedDataArray = [];
let b_id = 0;

function dataStore() {
  localStorage.setItem('name', JSON.stringify(storedDataArray));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const storedData = {
    bookID: null,
    title: '',
    author: '',
  };
  storedData.bookID = b_id;
  storedData.title = titleValue.value;
  storedData.author = authorValue.value;
  storedDataArray.push(storedData);
  dataStore();
  add(storedData.bookID, storedData.title, storedData.author);
  titleValue.value = null;
  authorValue.value = null;
  b_id += 1;
});

if (JSON.parse(localStorage.getItem('name') !== null)) {
  storedDataArray = JSON.parse(localStorage.getItem('name'));
  b_id = storedDataArray[storedDataArray.length - 1].bookID + 1;
  console.log(b_id);
  if (storedDataArray !== null) {
    for (let x = 0; x < storedDataArray.length; x += 1) {
      add(storedDataArray[x].bookID, storedDataArray[x].title, storedDataArray[x].author);
    }
  }
}
