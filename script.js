const form = document.querySelector(".addNewBook");
const emptyLibraryDiv = document.querySelector(".libraryEmpty");
const main = document.querySelector(".main");
const readBtn = document.querySelector(".readBtn");
const deleteBookBtn = document.querySelector(".deleteBook");
const deleteLibraryBtn = document.querySelector(".deleteLibraryBtn");
const cancelDelete = document.querySelector(".cancelDelete");
const confirmDelete = document.querySelector(".confirmDelete");

const emptyLibraryElement =
  "<div class='libraryEmpty'>" +
  "<p>Add a book to start your library</p>" +
  "</div>";

//populate array with local storage if exists
let library = JSON.parse(localStorage.getItem("library")) || [];
console.log(library);

form.addEventListener("submit", getBookFromInput);

document.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-bookID")) {
    toggleRead(e);
  }

  if (e.target.hasAttribute("data-delete")) {
    let id = e.target.getAttribute("data-delete");
    deleteBook(id);
  }

  if (e.target.classList.contains("deleteLibraryBtn")) {
    confirmLibraryDelete.showModal();
    document.body.style.overflow = "hidden";
    confirmLibraryDelete.addEventListener("close", (event) => {
      document.body.style.overflow = "";
    });
  }

  if (e.target.classList.contains("confirmDelete")) {
    deleteLibrary();
  }

  if (e.target.classList.contains("cancelDelete")) {
    confirmLibraryDelete.close();
  }
});

//Generates Random ID for each book added
function guid() {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + "-" + s4() + "-" + s4() + "-" + s4();
}

function refreshPage(library) {
  if (library.length === 0) {
    main.innerHTML = emptyLibraryElement;
  } else {
    emptyLibraryDiv.style.display = "none";
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
      html += `<div data-delete="${book.id}" class="badge deleteBook"><i class="fa-solid fa-xmark fa-xs"></i></div>`;
      html += `<p class="id">${book.id}</p>`;
      html += `<p class="title">${book.title}</p>`;
      html += `<p class="author">${book.author}</p>`;
      html += `<p class="pages">Pages ${book.pages}</p>`;

      if (book.read === "true") {
        html += `<button data-bookID="${book.id}"class="readBtn">Read<i class="readIcon true fa-solid fa-check fa-xs"></i></button>`;
      } else {
        html += `<button data-bookID="${book.id}"class="readBtn">Read<i class="readIcon false fa-solid fa-xmark"></i></button>`;
      }
      html += `</div>`;

      main.innerHTML += html;
    });
  }
}

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

function getBookFromInput(e) {
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
}

function Book(id, title, author, category, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.category = category;
  this.pages = pages;
  this.read = isRead;
}

function toggleRead(e) {
  let id = e.target.getAttribute("data-bookID");
  library = getDataFromLocalStorage();
  localStorage.clear();
  let refreshedLibrary = [];
  library.forEach((book) => {
    if (book.id === id) {
      book.read === "true" ? (book.read = "false") : (book.read = "true");
      refreshedLibrary.push(book);
    } else {
      refreshedLibrary.push(book);
    }
  });
  localStorage.setItem("library", JSON.stringify(refreshedLibrary));
  refreshPage(refreshedLibrary);
}

function deleteBook(bookID) {
  console.log("delete clicked", bookID);
  library = getDataFromLocalStorage();
  localStorage.clear();
  let refreshedLibrary = library.filter((value, index, array) => {
    return value.id !== bookID;
  });
  console.log(refreshedLibrary, refreshedLibrary.length);
  localStorage.setItem("library", JSON.stringify(refreshedLibrary));
  refreshPage(refreshedLibrary);
}

function deleteLibrary() {
  localStorage.clear();
  library = [];
  refreshPage(library);
  localStorage.setItem("library", JSON.stringify(library));
  confirmLibraryDelete.close();
}

refreshPage(library);
