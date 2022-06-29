require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const app = express()


// App Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API' })
}
)

// Register User
app.post('/auth/register', async(req,res) => {

    const {name, email, password, confirmpassword} = req.body

    if(!name){
        return res.status(422).json({ msg: 'O nome é obrigatório'})
    }

})

// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8gwza.mongodb.net/?retryWrites=true&w=majority`,
).then(() => {
    app.listen(3000)
    console.log('Data Base connected')
}
).catch((err) => console.log(err))






