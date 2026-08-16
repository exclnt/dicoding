const Hapi = require('@hapi/hapi') //mengambil hapi
const routes = require('./route') //mengambil router dari route

const init = async ()=>{ //membuat server hapi
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    })

   server.route(routes) 

    await server.start()
    console.log(`server berjalan pada ${server.info.uri}`);
}
init()



