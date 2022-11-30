// grab all elements
const form = document.querySelector('[data-form]');
const lists = document.querySelector('[data-lists]');
const bookTitle = document.querySelector('[title]');
const bookAuthor = document.querySelector('[author]');
const contactForm = document.querySelector('.contact-form');
const timeDate = document.querySelector('.date');
const showlist = document.querySelector('#lists-item');
const addList = document.querySelector('#lists-item-add');
const contact = document.querySelector('#lists-item-conatct');
const allAwesome = document.querySelector('.title');

/* eslint max-classes-per-file: ["error", 3] */

// local Storage
class Storage {
  static addTodStorage(todoArr) {
    const storage = localStorage.setItem('todo', JSON.stringify(todoArr));
    return storage;
  }

  static getStorage() {
    const storage = localStorage.getItem('todo') === null
      ? [] : JSON.parse(localStorage.getItem('todo'));
    return storage;
  }
}

// empty array
let todoArr = Storage.getStorage();

// make object instance
class Todo {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

// display the todo in the DOM;
class UI {
  static displayData() {
    const displayData = todoArr.map((item) => `
            <div class="todo">
            <div>
            <span>"${item.title}" by</span>
            <span> ${item.author}</span>
            </div>
            <button class="remove" data-id = ${item.id}>Remove</button>
            </div>
            `);
    lists.innerHTML = (displayData).join(' ');
  }

  static displayNothing() {
    const displayData = '<h3 class="display-nothing">You have no book to show</h2>';
    lists.innerHTML = displayData;
  }

  static colorChanger() {
    const todos = document.querySelectorAll('.todo');
    let count = 1;
    todos.forEach((item) => {
      if (count % 2 !== 0) {
        item.classList.add('active');
      } else if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
      count += 1;
    });
  }

  static clearInput() {
    bookTitle.value = '';
    bookAuthor.value = '';
  }

  static removeTodo() {
    lists.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
      }
      const btnId = e.target.dataset.id;
      // remove from array.
      UI.removeArrayTodo(btnId);
    });
  }

  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
    Storage.addTodStorage(todoArr);
    if (todoArr.length === 0) {
      UI.displayNothing();
    }
    UI.colorChanger();
  }
}

// form part
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = Math.random() * 1000000;
  const todo = new Todo(id, bookTitle.value, bookAuthor.value);
  todoArr = [...todoArr, todo];
  UI.displayData();
  UI.colorChanger();
  UI.clearInput();
  // add to storage
  Storage.addTodStorage(todoArr);
/*   if (lists.classList.contains('hide')) {
    lists.classList.remove('hide');
  } */
});

// once the browser is loaded
window.addEventListener('DOMContentLoaded', () => {
  if (todoArr.length === 0) {
    UI.displayNothing();
  } else {
    UI.displayData();
  }
  UI.colorChanger();
  // remove from the dom
  UI.removeTodo();
});

// Add time and date

const dtformat = new Intl.DateTimeFormat('default', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

const date = new Date();

timeDate.innerHTML = `${dtformat.format(date)}`;

// Add functionality to nav bar

showlist.addEventListener('click', () => {
  if (lists.classList.contains('hide')) {
    lists.classList.remove('hide');
    allAwesome.classList.remove('hide');
  }

  if (form.classList.contains('show')) {
    form.classList.remove('show');
  }

  if (contactForm.classList.contains('show')) {
    contactForm.classList.remove('show');
  }
});

addList.addEventListener('click', () => {
  if (!form.classList.contains('show')) {
    form.classList.add('show');
  }

  if (!lists.classList.contains('hide')) {
    lists.classList.add('hide');
    allAwesome.classList.add('hide');
  }

  if (contactForm.classList.contains('show')) {
    contactForm.classList.remove('show');
  }
});

contact.addEventListener('click', () => {
  if (!contactForm.classList.contains('show')) {
    contactForm.classList.add('show');
  }

  if (!lists.classList.contains('hide')) {
    lists.classList.add('hide');
    allAwesome.classList.add('hide');
  }

  if (form.classList.contains('show')) {
    form.classList.remove('show');
  }
});