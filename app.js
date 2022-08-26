const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app =express()

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

/*app.get('/', (req, res)=>{
    res.render('index')
})*/

app.listen(5000, ()=>{
    console.log('SERVER UP running in http://localhost:5000')
})