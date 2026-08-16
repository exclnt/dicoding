const { EventEmitter } = require('events'); //megambil evenEmiter dari event
 
const myEventEmitter = new EventEmitter(); //membuat constuctur eventemiter
 
const makeCoffee = (name) => {  //membuat kopi 
    console.log(`Kopi ${name} telah dibuat!`);
};
 
const makeBill = (price) => { 
    console.log(`Bill sebesar ${price} telah dibuat!`);
}
 
const onCoffeeOrderedListener = ({ name, price }) => {
    makeCoffee(name);
    makeBill(price);
}
 
myEventEmitter.on('coffee-order', onCoffeeOrderedListener);
 
myEventEmitter.emit('coffee-order', { name: 'Tubruk', price: 15000 });
 