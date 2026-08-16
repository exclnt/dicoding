// TODO 1
const { EventEmitter } = require('events');
 
const birthdayEventListener = ({name}) => {
    console.log(`Happy birthday ${name}!`);
  }
  const hello = (hey)=>{
    console.log(hey)
  } 

  // TODO 2
  const myEventEmitter = new EventEmitter();//
   
// const mix = ({name,hey})=>{
//   hello(hey);
//   birthdayEventListener(name);
// }

  // TODO 3
  myEventEmitter.on('birthday',birthdayEventListener)
   
  // TODO 4
  myEventEmitter.emit('birthday', { name: 'Tubruk', hey: "hello" });