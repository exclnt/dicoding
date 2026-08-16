// "trow" : Operator ini akan “melemparkan” eror pada program, sehingga eksekusi kode akan masuk pada blok catch
// "instaceof" ; operator yang digunakan untuk memeriksa apakah sebuah objek merupakan instance dari suatu kelas (constructor function) tertentu
// "JSON.parse" : mengubah tipedata string menjadi tipe data objest

// membuat class ValidationError yang merupakan kepanjangan dari class Error
class ValidationError extends Error {
    constructor(message) {
        // memanggil properti message dari class Error 
        super(message);
        this.name = "ValidationError";
    }
}

// const json = '{ "age": 30 }';

import _ from 'lodash';
try{


    const myArray = [1, 2, 3, 4];
    const sum = _.sum(myArray);
    
    console.log(sum);
    
    /* output
    10
    */


}catch(error){
    if (error instanceof SyntaxError) {
        console.log(`JSON Error: ${error.message}`);
    } else if (error instanceof ValidationError) {
        console.log(`Invalid data: ${error.message}`);
    } else if (error instanceof ReferenceError) {
        console.log(error.message);
    } else {
        console.log(error.stack);
    }
}