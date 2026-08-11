const bookShelf = []    //membuat array bookselft
const RENDER_EVENT = 'render-books' ////membuat nama costum event
const daftar = []

document.addEventListener('DOMContentLoaded',()=>{  //saat terjadi event setelh content loading
    const submitForm = document.getElementById('inputBook') //buat variable submitForm isi dengan elemnt id
    const srcButton = document.getElementById('searchSubmit')
    submitForm.addEventListener('submit',(event)=>{ //saat terjadi event submit pada varibel submitForm
        event.preventDefault()  //cegah refrest halamant 
        addBook() //jalankan fungsi addBook
    })
    srcButton.addEventListener('click',(event)=>{
        const srcBox = document.getElementById('searchBookTitle').value
        daftar.splice(0,daftar.length)
        console.log(srcBox)
        event.preventDefault()
    
        const dataDisplay = cariData(bookShelf,srcBox)
        console.log(dataDisplay)
        document.dispatchEvent(new Event(RENDER_EVENT))
    })
    
})


function addBook() {    //saat dijalankan
    const id = generateId() //isi id dengan hasil fungsi generate id
    const inputTitle = document.getElementById('inputBookTitle').value  //isi inputTitle dengan value element id 
    const inputAuthor = document.getElementById('inputBookAuthor').value
    const inputBookYear = document.getElementById('inputBookYear').value
    let isComplate = document.getElementById('inputBookIsComplete').checked
    const books = generateBooks( //jalankan generate books dengan parameter mengirimkan 
        id,
        inputTitle,
        inputAuthor,
        inputBookYear,
        isComplate,
    )
    bookShelf.push(books)
    
    document.dispatchEvent(new Event(RENDER_EVENT)) //buat event dengan nama variabel RENDER_EVENT lalu jalankan event
    saveData()
}

function generateId() { //fugsi buat id
    return +new Date()  //kembalikan tangal dengan format numerik 
}

function generateBooks(id,book,author,year,isComplate) {
    return {
        id,
        book,
        author,
        year,
        isComplate
    }   //kembalikan objek 
}

document.addEventListener(RENDER_EVENT,()=>{ // saat terjadi event
    const unComplateBooks = document.getElementById('incompleteBookshelfList')  //dapatkan elemnt id 
    unComplateBooks.innerHTML = ''  //ubah value isi dengan '

    const complateBooks = document.getElementById('completeBookshelfList')
    complateBooks.innerHTML = ''

    if(daftar.length > 0) {
        for(const book of daftar) {  //untuk setiap book dari bookselft
            const bookElemnt = makeBooks(book)
            if(!book.isComplate)
                unComplateBooks.append(bookElemnt)
            else
                complateBooks.append(bookElemnt)
        }
    }else{
        for(const book of bookShelf) {  //untuk setiap book dari bookselft
            const bookElemnt = makeBooks(book)
            if(!book.isComplate)
                unComplateBooks.append(bookElemnt)
            else
                complateBooks.append(bookElemnt)
        }
    }

})

function makeBooks(books) {
    //articleCtn.innerText = 
    const titleCtn = document.createElement('h3')
    titleCtn.innerText = books.book
    // console.log(books.book)
    
    const authorCtn = document.createElement('p')
    authorCtn.innerText = books.author
    // console.log(books.author)
    
    const yearCtn = document.createElement('p')
    yearCtn.innerText = books.year
   //console.log(books.year)

    const actionCtn = document.createElement('div')
    actionCtn.classList.add('action')

    
    const articleCtn = document.createElement('article')
    articleCtn.classList.add('book_item')
    articleCtn.append(titleCtn,authorCtn,yearCtn)
    
    // console.log(books.isComplate)
    // console.log('------')
    if(books.isComplate) {
        const redButton = document.createElement('button')
        redButton.classList.add('red')
        redButton.innerText = 'Hapus buku'
        redButton.addEventListener('click',()=>{
            removeTaskFromCompleted(books.id)
        })

        const greenButton = document.createElement('button')
        greenButton.classList.add('green')
        greenButton.innerText = 'Belum selesai di Baca'
        greenButton.addEventListener('click',()=>{
            undoTaskFromCompleted(books.id)
        })
        
        
        actionCtn.append(greenButton,redButton)
        articleCtn.append(actionCtn)
    } else {
        const redButton = document.createElement('button')
        redButton.classList.add('red')
        redButton.innerText = 'Hapus buku'
        redButton.addEventListener('click',()=>{
            removeTaskFromCompleted(books.id)
        })
        
        const greenButton = document.createElement('button')
        greenButton.classList.add('green')
        greenButton.innerText = 'Selesai dibaca'
        greenButton.addEventListener('click', function () {
            addTaskToCompleted(books.id);
        });

        actionCtn.append(greenButton,redButton)
        articleCtn.append(actionCtn)

    }
    return articleCtn
}

function addTaskToCompleted(bookId) {
    const bookTarget = findBook(bookId);
    // console.log('jalan')
    if (bookTarget == null) return;
    bookTarget.isComplate = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBook(bookId) {
    // console.log('berhasil')
    for (const book of bookShelf) {
        if (book.id === bookId) {
            return book;
        }
    }
    return null;
}

function removeTaskFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    bookShelf.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBookIndex(bookId) {
    for (const index in bookShelf) {
        if (bookShelf[index].id === bookId) {
            return index;
        }
    }

    return -1;
}

function undoTaskFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplate = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookShelf);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'BOOKSHELF';

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            bookShelf.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener('DOMContentLoaded', function () {
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function cariData(books, targetBook) {
    for(data of books) {
        if(data.book.includes(targetBook)){
            daftar.push(data)
        }
    }
    if(daftar === false){
        console.log('data tidak ditemukan')
        return
    }
    return daftar
}