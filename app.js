const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const app =express()

/*Cambios OGMD 26/08/2022*/
/////////////////
////////////////
//////////////
//*-*-*-*-*-*
/**-***-*** */
const {Server }= require('socket.io')
const http = require('http')
const server = http.createServer(app);
const port = process.env.PORT || 5001
const io = new Server(server);
//Terminan los cambios



//motor de plantillas
app.set('view engine', 'ejs')

// carpeta public para archivos estaticos
app.use(express.static('public'))

// proceso de datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//variables de entorno
dotenv.config({path: './env/.env'})

//cookies
app.use(cookieParser())

//llamada al router
app.use('/', require('./routes/router'))

//Cambios OGMD 26/08/2022
/////////////////
////////////////
//////////////
//*-*-*-*-*-*
/**-***-*** */
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected')
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
})

server.listen(port, ()=>{
    console.log(`SERVER UP running in http://localhost:${port}`)
})

//Terminan los cambios