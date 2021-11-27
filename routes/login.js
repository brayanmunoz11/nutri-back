//Framework de nodejs
const express = require('express')
//Definicion del router
const router = express.Router()


//conexion a la BD
const pool = require('../src/database');

//encriptacion del password
const bcrypt = require('bcrypt')

//Metudo Get del login
router.get('/login', async (req, res) => {

  //Respuesta a la peticion
  res.status(200).json({
    gawr: 'gura'
  })
})

//Metudo post para logear al usuario
router.post('/login', async (req, res) => {

  //Parámetros del login con el correo y el password.
  const { correo, password } = req.body

  //Se realiza la petición para seleccionar todos campos del usuario a la BD
  //Se guarda los datos en la constante user
  const user = await pool.query('SELECT * FROM heroku_b3e0382f6ba83ba.usuarios WHERE correo = ?', [correo]);

  //Se guarda el passord encriptado de la base de datos en la variable passwordHash 

  //Aqui agregue let por que salia una incidencia en sonarqube
  let passwordHash = user[0] ? user[0].usuario_contrasenia : false

  //Se compara el passwordHash con el el password  del parámetro del login
  const passwordCorrect = user[0] === undefined
    ? false
    : await bcrypt.compare(password, passwordHash)

  //Si el usuario o password son incorrectos se notificará el error
  if (!(user && passwordCorrect)) {
    //Respuesta a la peticion
    return res.status(401).json({
      error: 'invalid user or password'
    })
  }

  //En caso de que los datos sean correctos se devolverán todos los datos del usuario
  res.status(200).json({
    //Se envia los datos del usuario validado al Frontend
    user: user[0]
  })
})


//Se exporta el modulo para poder ser usado
module.exports = router
