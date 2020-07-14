//Dependecias
const express = require("express");
const mongo = require('mongodb')
const MongoClient = require("mongodb").MongoClient
const RandExp = require('randexp')
const nodemailer = require('nodemailer')
const bodyParser = require("body-parser")
const cors = require('cors')
const datos = require('./personal.json')
const jwt = require('jwt-simple')
//global scopes
const app = express();
const port = 1024;
app.use(cors())
const url = 'mongodb://localhost:27017/'
// const url2 = 'mongodb://localhost:27017/comidasReto'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//functions


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
            html: `<p>Si quieres acceder a la app con una cuenta por favor<a href='http://localhost:3000/checkEmail?tok=${token}'>Confirmar Email</a></p>`  
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

let checkUser = async ({user, pass}) => {
    let client,result,ret;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.findOne({"user" : user, "pass" : pass})
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
        return ret
    }
}

let registerUser = async ({name,lastName,birth,email,password},token) => {
    let client, result;
    let ret = false;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.insertOne({ "user": name,"lastName":lastName, "pass": password,"birth": birth, "email": email, "tok": token })
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

let reEnviar = async (email, tok) => {
    let client, result;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.updateOne({"email":email},{$set:{"tok":tok}})
        return true
    } catch(err){
        throw err
    } finally{
        client.close()
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
    let ret = {valid: false};
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.findOne({ "tok": token})
        if(result !== null){
            ret = {
                valid:true,
                user:{
                    user: result.user,
                    pass: result.pass
                }
            }
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

let searchUniqueRestaurant = async (index) => {
    let client, result;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('comidasReto')
        let resto = dbo.collection('restaurantes')
        result = await resto.findOne({"index": index})
        if(result !== null){
            return result
        }else{
            return false
        }
    }catch(err){
        throw err
    } finally{
        client.close()
    }
}
let searchRestaurants = async () => {
    let client, result;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('comidasReto')
        let resto = dbo.collection('restaurantes')
        result = await resto.find({}).toArray()
        return result
    }catch(err){
        throw err
    } finally{
        client.close()
    }
}

let crearAuth = ({user,pass}) => {
    let payload = {
        user,
        pass
    }
    let secret = generarConfirmTok()
    let tok = jwt.encode(payload,secret)
    let ret = {
        tok,
        secret
    }
    return ret
}


let anotarLog = async ({user,pass},{tok,secret}) => {
    let client,result;
    if(user !== undefined && pass !== undefined){
        try{
            console.log('entre')
            client = await MongoClient.connect(url,{useUnifiedTopology: true})
             let dbo = client.db('usuariosReto')
             let us = dbo.collection('users')
              result = await us.updateOne({user: user,pass: pass}, {$set:{auth: tok,secret: secret}})
              console.log('Esta logeado ' + result)
              let use = {
                  token: tok,
                  sec: secret,
                  valid: true
              }
              return use
        }catch(err){
            throw err
        } finally{
            client.close()
        }
    } else{
        return false
    }
}

let searchToken = async ({token, secret}) => {
    let client,result,ret;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('usuariosReto')
        let users = dbo.collection('users')
        result = await users.findOne({"auth" : token, "secret" : secret})
        if(result !== null){
            ret = {
                name: result.user,
                surname: result.lastName,
                age: result.age,
                email: result.email,
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
        return ret
    }
}

let logOutUser = async ({token, secret}) => {
    let client,result;
    if(token !== undefined && secret !== undefined){
        try{
            client = await MongoClient.connect(url,{useUnifiedTopology: true})
             let dbo = client.db('usuariosReto')
             let us = dbo.collection('users')
              result = await us.updateOne({auth: token,secret: secret}, {$unset:{auth: '',secret: ''}})
              console.log('Esta deslogeado ')
              
              return true
        }catch(err){
            throw err
        } finally{
            client.close()
        }
    } else{
        return false
    }
}
// let insertRestaurant = async ({id_local,nombre_local,calle,desc_epigrafe,desc_barrio_local,terraza, Estado_higuienico_sanitario},index) => {
//     let client, result;
//     try{
//         client = await MongoClient.connect(url2, { useUnifiedTopology: true })
//         let dbo = client.db('comidasReto')
//         let resto = dbo.collection('restaurantes')
//         result = await resto.insertOne({index:index,id_local: id_local, nombre: nombre_local, direccion: calle, tipo_local: desc_epigrafe, barrio: desc_barrio_local, terraza: terraza, higuiene: Estado_higuienico_sanitario })
//         // console.log(result.ops[0])
//     }catch(err){
//         throw err
//     }
// }


// let mapRestaurants = async () => {
//     datos.datos.map( (ele,i) => i < 100 ? insertRestaurant(ele,i) : i)
// }
// mapRestaurants()



//logica
app.post('/login', (req,res) => {
    const user = {
        user: req.body.name,
        pass: req.body.pass
    }
    checkUser(user).then(result => {
        if(result.valid){
            let auth = crearAuth(user)
            anotarLog(user,auth).then(data => {
                if(data.valid){
                    res.send({tok:data.token,sec: data.sec, valid: data.valid})
                }else {
                    res.send({valid: false})
                }
            })
        }else {
            res.send({valid: false})
        }
    })
})

app.post('/findUser',(req,res) => {
    searchToken(req.body.token)
    .then(search => {
        if(search.valid)
            res.send({name:search.name,surname:search.surname,valid: true})
        else
            res.send({valid: false})
    })
})

app.post('/logoutUser',(req,res) => {
    logOutUser(req.body.token)
    .then(search => {
        if(search)
            res.send({deslogeado:true})
        else
            res.send({deslogeado: false})
    })
})

app.post('/resend', (req,res) => {
    const email = req.body.email
    let token = generarConfirmTok()
    reEnviar(email,token).then(ans => {
        if(ans){
            sendMail(email,token)
            res.send({emailSent: true})
        }
    })
})

app.post('/signUp', (req,res) => {
    const user = {
        name: req.body.name,
        lastName: req.body.surname,
        birth: req.body.birth,
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
        if(data.valid){
            destruirTok(emailKey)
            let auth = crearAuth(data.user)
            anotarLog(data.user,auth).then(datos => {
                console.log(datos)
                if(datos.valid){
                    res.send({tok:datos.token,sec: datos.sec, valid: datos.valid})
                }else{
                    res.send({valid:false})
                }
            })
        } else{
            res.send({valid:false})
        }
    })
})

app.get('/restaurant/:index', (req,res) => {
    let index = Number(req.params.index)
    searchUniqueRestaurant(index).then(
        data => {
            if(!data){
                res.send({valid:false})
            }else{
                res.send({valid: true, restaurant: data})
            }
        }
    )
})

app.get('/foodList', (req,res) => {
    searchRestaurants()
    .then(result => res.send(result))
    
})

//Listen
app.listen(port,() => console.log(`servidor conectado por ${port}`))