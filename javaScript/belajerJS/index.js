// ========================ekport imp[ort module
// import { coffeeStock as stock, isCoffeeMachineReady } from './state.js';

// const displayStock = stock => {
//     for (const type in stock) {
//         console.log(type);
//     }
// }

// displayStock(coffeeStock);
// cummonjs
// const {coffeeStock, isCoffeeMachineReady} = require('./state');
// console.log(stock,isCoffeeMachineReady);

// const makeCoffee = (type, miligrams) => {
//     if (coffeeStock[type] >= miligrams) {
//         console.log("Kopi berhasil dibuat!");
//     } else {
//         console.log("Biji kopi habis!");
//     }
// }

// makeCoffee("robusta", 80);

// console.log("Menyalakan mesin kopi");
// console.log("Menggiling biji kopi");
// console.log("Memanaskan air");
// console.log("Mencampurkan air dan kopi");
// console.log("Menuangkan kopi ke dalam gelas");
// console.log("Menuangkan susu ke dalam gelas");
// console.log("Kopi Anda sudah siap!");


// =============== penanganan error
// const json = '{ "name": "Yoda", "age": 20 }'; 
// const json = '{ bad json }';
// const json = '{ "age": 20 }';

// try {
//melakukan parsing atau konversi dari variabel json(string) menjadi sebuah object
    // const user = JSON.parse(json);

    // if (!user.name) {
        // throw new SyntaxError("'name' is required.");
    // }

    // errorCode()

    // console.log(user.name);
    // console.log(user.age);
// } catch (error) {
    // console.log(error)
    // console.log(`JSON Error: ${error.message}`);


    // if (error instanceof SyntaxError) {
        // console.log(`JSON Error: ${error.message}`);
    // } else if (error instanceof ReferenceError) {
        // console.log(error.message);
    // } else {
        // console.log(error.stack);
    // }


    // console.log(error.name);
    // console.log(error.message);
// }

// ================== asyncronus dan syncronus
// console.log('Selamat datang!');
// setimeout function
// setTimeout(() => {
    // console.log('Terima kasih sudah mampir, silakan datang kembali!');
// }, 3000)

// console.log('Ada yang bisa dibantu?')


// pola collback
// function getUsers(isOffline, callback) {
//     // simulate network delay
//     setTimeout(() => {
//     const users = ['John', 'Jack', 'Abigail'];

//     if (isOffline) {
//         callback(new Error('cannot retrieve users due offline'), null);
//         return;
//     }

//     callback(null, users);
//     }, 3000);
// }

// function usersCallback(error, users) {
//     if (error) {
//         console.log('process failed:', error.message);
//         return;
//     }
//     console.log('process success:', users);
// }

//   getUsers(false, usersCallback); // process success: ['John', 'Jack', 'Abigail']
//   getUsers(true, usersCallback); // process failed: cannot retrieve users due offline


// callback hell
// 
// promise
// function getUsers(isOffline) {
    // return a promise object
    // return new Promise((resolve, reject) => {

      // simulate network delay
        // setTimeout(() => {
            // membuat variabel user
            // const users = ['John', 'Jack', 'Abigail'];

            // jika offline true
            // if (isOffline) {
                // jalankan reject
                // reject(new Error('cannot retrieve users due offline'));
                // keluar fungsi
                // return;
            // }

        // jalankan resolve
        // resolve(users);
        // tunggu 3 detik
        // }, 3000);
    // });
// }

// menjalankan fungsi getUser
// getUsers(true)
    // aksi jika berhasil
    // .then(users => console.log(users))
    // aksi jika gagal
    // .catch(err => console.log(err.message));


// mengubah calback mengunakan prosify
// mengunakan modul bawaan dari js util

// mengambil promisify dari util
// import {promisify} from "util";
// // fungsi callback
// function getUsers(isOffline, callback) {
//   // simulate network delay
// setTimeout(() => {
//     const users = ['John', 'Jack', 'Abigail'];
//     if (isOffline) {
//         callback(new Error('cannot retrieve users due offline'), null);
//         return;
//     }

//     callback(null, users);
//     }, 3000);
// }

// // create a Promise version of getUsers
// const getUsersPromise = promisify(getUsers);

// getUsersPromise(false)
//   .then(users => console.log(users)) // ['John', 'Jack', 'Abigail']
//   .catch(err => console.log(err.message));
 
// getUsersPromise(true)
//   .then(users => console.log(users))
//   .catch(err => console.log(err.message)); // cannot retrieve users due offline


import _ from 'lodash';
 
const myArray = [1, 2, 3, 4];
const sum = _.sum(myArray);
 
console.log(sum);
 
/* output
10
*/