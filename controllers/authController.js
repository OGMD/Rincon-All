const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

//metodo de registro
exports.register = async (req, res)=>{

    try{
        const name = req.body.name
        const email = req.body.email
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)
        conexion.query('INSERT INTO users SET ?', {name:name, email:email, pass:passHash}, (error, results)=>{
        
        if(error){console.log(error)}
        res.redirect('/dashboard')    
        })
    }catch (error){
        console.log(error)
    }
}

exports.login = async (req, res)=>{
try {
   const email = req.body.email
   const pass = req.body.pass

   if(!email || !pass){
        res.render('login', {
           alert:true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese Correo y Contraseña",
            alertIcon: 'info',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        })
   }else{
    conexion.query('SELECT * FROM users WERE email = ?', [email], async (error, results)=>{
        if(results.lenght == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
            res.render('login', {
                alert:true,
                 alertTitle: "Error",
                 alertMessage: "Correo y/o Contraseña incorrecta",
                 alertIcon: 'error',
                 showConfirmButton: true,
                 timer: false,
                 ruta: 'login'
             })  
        }else{
            //validacion de inicio de sesion
            const id = results[0].id
            const token = jwt.sign({id:id}, process.env.JWT_SECRETO,{
               expiresIn: process.env.JWT_TIEMPO_EXPIRA 
            })
            console.loge("TOKEN: "+token+"USUARIO: "+user)

            const cookieOptions = {
                expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly:true
            }
            res.cookie('jwt', token, cookieOptions)
            res.render('login', {
                alert:true,
                 alertTitle: "Conexión Exitosa",
                 alertMessage: "LOGIN CORRECTO",
                 alertIcon: 'success',
                 showConfirmButton: false,
                 timer: 800,
                 ruta: ''
            })
        }
    })
   }
} catch (error) {
    console.log(error)
}
}