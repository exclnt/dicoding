const tamu = prompt('Siapakah Anda?');
alert('Selamat datang ' + tamu + '!');

let message = 'Halo, user!';
alert(message);  // menampilkan pop up isi message

let pesanInput = prompt('Masukkan pesan sesukamu...'); // memunculkan pop up ynag berisi form input text field
console.log(typeof pesanInput); // bertype string / objec

// mengubah type data ke number atau integer
Number()
parseInt()

let name = prompt('Silakan masukkan nama Anda!', 'John Doe'); // jika tidak ada nama dimasukan nilai default nya John Doe


const data = document.getElementById("pesan")
// membuat elemt p 
const newElement = document.createElement('p');
// menulis atau mengisikan kedalam var newElemnt
// newElement.innerText = 'Selamat datang ke HTML kosong ini :)';
newElement.innerHTML = '<b>Selamat datang</b> ke HTML kosong ini :)';
data.in


const newImg = document.createElement('img');

newImg.setAttribute('src', 'https://picsum.photos/200/300');