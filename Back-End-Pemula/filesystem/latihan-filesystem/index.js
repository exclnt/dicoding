// TODO: tampilkan teks pada notes.txt pada console.
const fs = require('fs');

const data = (error,data)=>{
    if(error){
    fs.readFileSync("notes.txt","utf-8")
    return
}}
console.log(data)