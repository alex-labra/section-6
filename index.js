// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
  
  // UI Constructor
  function UI() {}
  
  // Add Book To List
  UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // Create table row element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
  
    list.appendChild(row);
  }
  
  // show alert
  UI.prototype.showAlert = function(message, className){
    //create div
    const div = document.createElement('div');

    //we add the classes
    div.className = `alert ${className}`;

    //add the text
    div.appendChild(document.createTextNode(message));

    //get parent
    const container = document.querySelector('.container');
    
    //get form
    const form = document.querySelector('#book-form');
    
    //insert alert
    container.insertBefore(div, form);

    //timeout for alert 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);

  }

  //Delete the book
  UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  // Clear Fields
  UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  
  // Event Listeners
  document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
  
    // Instantiate book
    const book = new Book(title, author, isbn);
  
    // Instantiate UI
    const ui = new UI();

    //validation
    if(title === '' || author === '' || isbn === ''){
      //alert
      ui.showAlert('Please fill in all the fields!', 'error');
    }else{
      // Add book to list
      ui.addBookToList(book);

      ui.showAlert('Book Added!', 'success');
    
      // Clear fields
      ui.clearFields();
    } 
  
    e.preventDefault();
  });


  //Event listener to delete
  document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiate UI
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

    //remove book
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
  });