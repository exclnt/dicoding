const http = require('http')

const requestListener = (request,response)=>{
    response.setHeader('Content-Type','application/json')
    response.setHeader('X-Power-By','NodeJS')

    const {method,url} = request

    if(url === '/'){
        if(method === 'GET'){
            response.statusCode = 200;
            response.end('<h1>ini adalah hompage</h1>')
        }else{
            response.statusCode = 400;
            response.end(`<h1>halamant tidak dapat di akses dengan ${method}</h1>`)
        }
    }else if(url === '/about'){
        if(method === 'GET'){
            response.statusCode = 200;
            response.end('<h1>ini adalah about</h1>')
        }else if(method ==='POST'){
            let body = []

            request.on('data',(chunk)=>{
                body.push(chunk)
            })
            request.on('end',()=>{
                body.Buffer.concat(body).toString()
                const {name} = JSON.parse(body)
                response.statusCode = 200
                response.end(`<h1>halo, ${name} ini dalah halamant about</h1>`)
            })
        }else{
            response.statusCode = 400;
            response.end(`<h1>halamant tidak dapat di akses dengan ${method}</h1>`)
        }
    }else{
        response.statusCode = 404;
        response.end(`<h1>halamant tidak dapat di akses dengan ${method}</h1>`)
    }

}
    // response code
    // mengubah nilai pesan status code
    // response.statusMessage = "sever is not ready";

    const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

