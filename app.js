//Dependecias
const express = require("express");
const mongo = require('mongodb')
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")


//global scopes
const app = express();
const port = 1024;
app.use(express.static("public"))
const url = 'mongodb://localhost:27017/usuarios'
const url2 = 'mongodb://localhost:27017/'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//functions
MongoClient.connect(url,{ useUnifiedTopology: true }, (err,db) => {
    if (err) throw err
    console.log('Base de datos creada')
    db.close()
})

MongoClient.connect(url2,{ useUnifiedTopology: true }, (err,db)=>{
    if (err) throw err
    let baseDatos = db.db('usuarios')
    baseDatos.createCollection('users',(err,res)=>{
        if (err) throw err
        console.log('coleccion creada')
        db.close()
    })
})

//logica
app.get('/', (req,res)=>{
    res.sendFile(__dirname + 'index.html')
})

app.post('/login', (req,res) => {
    const user = {
        name: req.body.user_name,
        password: req.body.password
    }
    console.log(user)
})


//Listen
app.listen(port,() => console.log(`servidor conectado por ${port}`))