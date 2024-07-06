const form = document.getElementById('book-form');
const booksList = document.getElementById('books-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const preco = document.getElementById('preco').value;

  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, autor, preco })
  });

  const book = await response.json();
  displayBook(book);
  form.reset();
});

async function loadBooks() {
  const response = await fetch('/api/books');
  const books = await response.json();
  books.forEach(displayBook);
}

function displayBook(book) {
  const bookItem = document.createElement('div');
  bookItem.textContent = `${book.titulo} by ${book.autor} - $${book.preco}`;
  booksList.appendChild(bookItem);
}

loadBooks();
