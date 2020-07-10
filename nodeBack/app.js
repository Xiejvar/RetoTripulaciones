//Dependecias
const express = require("express");
const mongo = require('mongodb')
const MongoClient = require("mongodb").MongoClient
const RandExp = require('randexp')
const nodemailer = require('nodemailer')
const bodyParser = require("body-parser")
const cors = require('cors')


//global scopes
const app = express();
const port = 1024;
app.use(cors())
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
let generarConfirmTok = () => {
    return new RandExp(/[a-zA-Z0-9!@#$%^&*]{256}/).gen()
    
}

let sendMail = ( email,token) => {
    let ret;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dr.manzanas1@gmail.com',
          pass: 'Geralt123'
        }
    })
    let mailOptions;

    if(!token){
        mailOptions = {
            from: 'dr.manzanas1@gmail.com',
            to: email,
            subject: 'Emaail de confirmacion a la app',
            html: `<a href='http://localhost:3000/login'>inicia sesion</a>`
        };
    } else {
        token = encodeURIComponent(token)
        mailOptions = {
            from: 'dr.manzanas1@gmail.com',
            to: email,
            subject: 'Confirma tu correo para acceder a la App EatSafe',
            html: `<p>Si quieres acceder a la app con una cuenta por favor<a href='https://localhost:3000/checkEmail?tok=${token}'>Confirmar Email</a></p>`  
        };
    }  

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          ret =  false
        } else {
          console.log('Email sent: ' + info.response);
          ret =  true
        }
    });    
    return ret
}

let checkUser = async ({name, password}) => {
    let client,result,ret;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.findOne({"user" : name, "pass" : password})
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

let registerUser = async ({name,lastName,age,email,password},token) => {
    let client, result;
    let ret = false;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.insertOne({ "user": name,"lastName":lastName, "pass": password,"age": age, "email": email, "tok": token })
        if(result.insertedCount > 0){
            ret = true
        } 

    }catch(err){
        throw err
    } finally{
        client.close()
        return ret
    }
}

let findUser = async ({name, lastName}) => {
    let client, result;
    let ret = false;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.findOne({ "user": name, "lastName": lastName })
        if(result === null){
            ret = true
        } 
    }catch(err){
        throw err
    } finally{
        client.close()
        return ret
    }
}

let confirmarToken = async (token) => {
    let client, result;
    let ret = false;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.findOne({ "tok": token})
        if(result !== null){
            ret = true
        } 
    }catch(err){
        throw err
    } finally{
        client.close()
        return ret
    }
}

let destruirTok = async (key) => {

    let client, result;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.updateOne({"tok":key},{$unset:{"tok":''}})
    } catch(err){
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


app.post('/signUp', (req,res) => {
    const user = {
        name: req.body.name,
        lastName: req.body.surname,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    }
    findUser(user)
    .then(result => {
        if(result){
            let token = generarConfirmTok()
            registerUser(user,token).then( ans => {
                if(ans){
                    sendMail(user.email,token)
                    res.send({emailSent: true})
                    
                }
            })
        }else {
            res.send({emailSent: false})
        }
    })
    
})

app.get('/registrado', (req,res) => {
    res.send(`<h2>Se te ha enviado un mail de confirmacion por favor confirma tu cuenta</h2>`)
})

app.get('/checkEmail', (req,res) => {
    let emailKey = req.query.tok
    confirmarToken(emailKey).then((data) => {
        if(data){
            destruirTok(emailKey)
            res.send({valid: true})
        } else{
            res.send({valid:false})
        }
    })
})

//Listen
app.listen(port,() => console.log(`servidor conectado por ${port}`))