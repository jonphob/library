let form = document.querySelector(".addNewBook");
let emptyLibraryDiv = document.querySelector(".libraryEmpty");
let main = document.querySelector(".main");
// let library = JSON.parse(localStorage.getItem("library"));
// if (library == null) {
//   library = [];
// }
let library = [];
console.log(library);

const getBookFromInput = (e) => {
  e.preventDefault();
  let id = guid();
  let title = form.title.value;
  let author = form.author.value;
  let category = form.category.value;
  let pages = form.pages.value;
  let isRead = form.read.value;
  const book = new Book(id, title, author, category, pages, isRead);
  library.push(book);
  console.log(library);
  addToPage(library);
  form.reset();
  // localStorage.setItem("library", JSON.stringify(book));
};

form.addEventListener("submit", getBookFromInput);

function Book(id, title, author, category, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.category = category;
  this.pages = pages;
  this.read = isRead;
}

//Generates Random ID
let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + "-" + s4() + "-" + s4() + "-" + s4();
};

const addToPage = (library) => {
  if (library.length === 0) {
    emptyLibraryDiv.style.display = "block";
  } else {
    main.innerHTML = null;
    let html = null;
    emptyLibraryDiv.style.display = "none";
    library.forEach((book) => {
      html = `<div class="card">`;
      html += `<p class="title">${book.title}</p>`;
      html += `<p class="author">${book.author}</p>`;
      html += `<p class="pages">No. of Pages ${book.pages}</p>`;
      console.log(book.read);
      if (book.read === "true") {
        console.log("book read");
        html += `<button class="readBtn">Read<i class="readIcon true fa-solid fa-check"></i></button>`;
      } else {
        console.log("book NOT read");
        html += `<button class="readBtn">Read<i class="readIcon false fa-solid fa-xmark"></i></button>`;
      }
      html += `</div>`;
      main.innerHTML += html;
    });
  }
};

addToPage(library);
