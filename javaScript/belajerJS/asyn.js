// // // // belajar promise
// // // /**
// // //  * @TODO
// // //  * Ubahlah fungsi asynchronous callback-based getProvinces menjadi Promise-based.
// // //  *
// // //  * Catatan:
// // //  * - Anda boleh menggunakan util.promisify untuk mengubah fungsi callback-based menjadi Promise-based.
// // //  * - Jika nama fungsinya berubah, sesuaikan nilai yang diekspor tanpa mengubah nama properti di akhir berkas ini.
// // //  */

// // // // memangl fungsi promsify dari modul util
// // // const { promisify } = require('util');

// // // // membuat fungsi getProvince
// // // function getProvinces(countryId, callback) {
// // //     // funsi set timeing
// // //     setTimeout(() => {
// // //         // jika counterid == id
// // //         if (countryId === 'id') {
// // //             callback(null, [
// // //                 { id: 'id-jk', name: 'Jakarta' },
// // //                 { id: 'id-bt', name: 'Banten' },
// // //                 { id: 'id-jr', name: 'Jawa Barat' },
// // //             ]);
// // //         return;
// // //         }
// // //     callback(new Error('Country not found'), null);
// // //     }, 1000);
// // // }
// // // // mengubah fungsi calbaxk menjadi promis
// // // const getProvincesPromise = promisify(getProvinces);

// // // getProvincesPromise('id')
// // //     .then((provinces) => console.log(provinces))
// // //     .catch((error) => console.log(error.message))
// // function watchMovie() {
// // withDrawMoney(10)
// //     .then((money) => buyCinemaTicket(money))
// //     .then((ticket) => goInsideCinema(ticket))
// //     .then((result) => console.log(result))
// //     .catch((error) => console.log(error.message));
// // }

// // // promis statsic method
// // const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
// // const promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 2000));
// // const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 3000));

// // Promise.all([promise1, promise2, promise3]).then((values) => console.log(values)); // [1, 2, 3] setelah 3 detik

// async function watchMovie() {
//     try {
//         const money = await withDrawMoney(10);
//         const ticket = await buyCinemaTicket(money);
//         const result = await goInsideCinema(ticket);

//         console.log(result);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// watchMovie();

import _ from 'lodash';
 
const myArray = [1, 2, 3, 4];
const sum = _.sum(myArray);
 
console.log(sum);
 
/* output
10
*/
