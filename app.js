require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User')


const app = express()

// Config Json response

app.use(express.json())

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
    if(!email){
        return res.status(422).json({ msg: 'O Email é obrigatório'})
    }
    if(!password){
        return res.status(422).json({ msg: 'A senha é obrigatória'})
    }
    if(password!=confirmpassword){
        return res.status(422).json({ msg: 'As senhas informadas não conferem'})
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if(userExists){
        return res.status(422).json({ msg: 'O email já está cadastrado'})
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        name,
        email,
        password,
    })

    try{
        await user.save()

        res.status(201).json({msg: 'Usuário criado com sucesso!'})
    } catch(error) {

        console.log(error)

        res.status(500).json({msg: error})
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






