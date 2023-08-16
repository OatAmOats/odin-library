//object stuff?
function Book(title, author, pages, read) { //the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return(`${title} by ${author}, ${pages} pages, read: ${read}`);
    }
}

class Library {
    constructor(){
        this.books = [];
    }

    addBook(newBook){
        if(!this.isInLibrary(newBook)){
            this.books.push(newBook);
        }
    }

    removeBook(title){
        this.books = this.books.filter((book) => book.title != title);
    }

    isInLibrary(newBook){
        return this.books.some((book) => book.title === newBook.title);
    }
}

const library = new Library();

//all the stuff on the page
const lib = document.querySelector('.lib'); //book display
const newBook = document.querySelector('.addbut');
const dia = document.querySelector('.dia');
const done = document.querySelector('.donezo');

newBook.addEventListener('click', function() {
    dia.showModal();
});

function displaylib(book){
    const newCard = document.createElement('div');
    newCard.classList.add('card')
    const titleDiv = document.createElement('div');
    const auDiv = document.createElement('div');
    const paDiv = document.createElement('div');
    const bookti = document.createTextNode(`"${book.title}"`);
    const bookau = document.createTextNode(`by ${book.author}`);
    const bookpa = document.createTextNode(`${book.pages} pages`);
    // read/not read button
    const rea = document.createElement('button');
    let butText = document.createTextNode(`${book.read}`);
    if(book.read == 'Read'){
        rea.classList.add('read');
    }
    else{
        rea.classList.add('notRead');
    }

    rea.addEventListener('click', function(){
        rea.classList.toggle('read');
        if(butText.textContent == 'Read'){
            butText.textContent = 'Not Read';
        }
        else{
            butText.textContent = 'Read';
        }
        rea.classList.toggle('notRead');
    })
    //remove button
    const rem = document.createElement('button');
    const remtext = document.createTextNode('Remove');
    rem.appendChild(remtext);
    rem.addEventListener('click', function(){
        library.removeBook(book.title);
        lib.removeChild(newCard);
    })

    rea.appendChild(butText)
    titleDiv.appendChild(bookti);
    auDiv.appendChild(bookau);
    paDiv.appendChild(bookpa);
    newCard.appendChild(titleDiv);
    newCard.appendChild(auDiv);
    newCard.appendChild(paDiv);
    newCard.appendChild(rea);
    newCard.appendChild(rem);
    lib.appendChild(newCard);
    
}
done.addEventListener('click', (event) =>{
    event.preventDefault();
    ti = document.getElementById('title').value
    au = document.getElementById('author').value;
    pa = document.getElementById('pages').value;
    re = document.getElementsByName('read');
    for(var radio of re){
        if(radio.checked){
            readStatus = radio.value;
        }
    }
    let book = new Book(ti, au, pa, readStatus);
    library.addBook(book);
    displaylib(book);
    dia.close()

})