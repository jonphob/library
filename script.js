const form = document.querySelector(".addNewBook");
const emptyLibraryDiv = document.querySelector(".libraryEmpty");
const main = document.querySelector(".main");
const readBtn = document.querySelector(".readBtn");
let library = [];
library = JSON.parse(localStorage.getItem("library")) || [];

//Generates Random ID
const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + "-" + s4() + "-" + s4() + "-" + s4();
};

const refreshPage = (library) => {
  if (library.length === 0) {
    emptyLibraryDiv.style.display = "block";
  } else {
    main.innerHTML = null;
    let html = null;
    emptyLibraryDiv.style.display = "none";

    library.forEach((book) => {
      title = book.title;
      let index = library.findIndex((book, index) => {
        if (book.title === title) {
          return true;
        }
      });

      html = `<div class="card data-book=${index}">`;
      html += `<p class="id">${book.id}</p>`;
      html += `<p class="title">${book.title}</p>`;
      html += `<p class="author">${book.author}</p>`;
      html += `<p class="pages">No. of Pages ${book.pages}</p>`;

      if (book.read === "true") {
        html += `<button class="readBtn">Read<i class="readIcon true fa-solid fa-check"></i></button>`;
      } else {
        html += `<button class="readBtn">Read<i class="readIcon false fa-solid fa-xmark"></i></button>`;
      }
      html += `</div>`;

      main.innerHTML += html;
    });
  }
};

const saveDataToLocalStorage = (book) => {
  var bookArray = [];
  bookArray = JSON.parse(localStorage.getItem("library")) || [];
  bookArray.push(book);
  localStorage.setItem("library", JSON.stringify(bookArray));
};

const getDataFromLocalStorage = () => {
  library = JSON.parse(localStorage.getItem("library"));
  return library;
};

const getBookFromInput = (e) => {
  e.preventDefault();
  let id = guid();
  let title = form.title.value;
  let author = form.author.value;
  let category = form.category.value;
  let pages = form.pages.value;
  let isRead = form.read.value;
  const book = new Book(id, title, author, category, pages, isRead);
  saveDataToLocalStorage(book);
  form.reset();
  library = getDataFromLocalStorage();
  refreshPage(library);
};

form.addEventListener("submit", getBookFromInput);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("readBtn")) {
    console.log("Button Clicked");
  } else {
    console.log("Button not clicked");
  }
});

function Book(id, title, author, category, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.category = category;
  this.pages = pages;
  this.read = isRead;
}

refreshPage(library);
