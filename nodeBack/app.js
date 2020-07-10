//Dependecias
const express = require("express");
const mongo = require('mongodb')
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")
const cors = require('cors')


//global scopes
const app = express();
const port = 1024;
app.use(cors())
app.use(express.static("public"))
const url = 'mongodb://localhost:27017/usuariosReto'
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
    let baseDatos = db.db('usuariosReto')
    baseDatos.createCollection('users',(err,res)=>{
        if (err) throw err
        console.log('coleccion creada')
        db.close()
    })
})

let checkUser = async ({name, password}) => {
    let client,result,ret;
    console.log(name,password)
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.findOne({"user" : name, "pass" : password})
        console.log(result)
        if(result !== null){
            ret = {
                valid: true
            }
        } else{
            ret = {
                valid: false
            }
        }

    }catch(err){
        throw err
    } finally{
        client.close()
    }
}

//logica
app.get('/', (req,res)=>{
    console.log("Bienvenido")
    res.send({"name": "Uli"})
})

app.post('/login', (req,res) => {
    const user = {
        name: req.body.user_name,
        password: req.body.password
    }
    checkUser(user).then(result => {
        res.send(result)
    })
})

//Listen
app.listen(port,() => console.log(`servidor conectado por ${port}`))