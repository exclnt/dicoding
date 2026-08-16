const fs = require('fs');
 
// versi asycronous
const fileReadCallback = (error, data) => {
    if(error) {
        console.log('Gagal membaca berkas');
        return;
    }
    console.log(data);
};
 
fs.readFile('todo.txt', 'UTF-8', fileReadCallback);

// versi syncronous

const data = fs.readFileSync('todo.txt', 'UTF-8');
console.log(data);