const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

//rutas para las vistas
router.get('/', (req, res)=>{
    res.render('index')
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})
router.get('/dashboard', (req, res)=>{
    res.render('dashboard')
})

//metodos del controller
router.post('/register',authController.register )
router.post('/login',authController.login )


module.exports = router