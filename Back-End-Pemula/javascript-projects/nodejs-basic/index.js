// const message = (name) => {
//     console.log(`Hello ${name}`)
//  }
  
//  message('JavaScript')

//  const server = new Server({
//     host: process.env.NODE_ENV !== 'production' ? 'localhost' : 'dicoding.com',
// });

const memoryInformation = process.memoryUsage();
 
console.log(memoryInformation);