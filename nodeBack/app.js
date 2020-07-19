//Dependecias
const express = require("express");
const mongo = require('mongodb')
const MongoClient = require("mongodb").MongoClient
const RandExp = require('randexp')
const nodemailer = require('nodemailer')
const bodyParser = require("body-parser")
const cors = require('cors')
const datos = require('./restaurantes.json')
const jwt = require('jwt-simple');
//global scopes
const app = express();
const port = 1024;
app.use(cors())
const url = 'mongodb://localhost:27017/'
const url2 = 'mongodb://localhost:27017/comidasReto'
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
        result = await users.findOne({"email" : user, "pass" : pass})
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
        result = await resto.findOne({"id_local": index})
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

let searchRestaurantsTerraza = async () => {
    let client, result;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('comidasReto')
        let resto = dbo.collection('restaurantes')
        result = await resto.find({'terraza':1, 'riesgo_covid': "bajo"}).toArray()
        return result
    }catch(err){
        throw err
    } finally{
        client.close()
    }
}

let searchRestaurantsSeguro = async () => {
    let client, result;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('comidasReto')
        let resto = dbo.collection('restaurantes')
        result = await resto.find({'riesgo_covid':"bajo", 'valoracion_global': { $gte: 4 }}).toArray()
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

let anotarLogFacebook  = async ({user,email, auth}) => {
    let client,result;
    console.log(user,email)
    if(user !== undefined && email !== undefined){
        try{
            console.log('entre')
            client = await MongoClient.connect(url,{useUnifiedTopology: true})
             let dbo = client.db('usuariosReto')
             let us = dbo.collection('users')
              result = await us.insertOne({"email": email, "user": user, auth: auth.tok, secret: auth.secret})
              console.log('Esta logeado ' + result)
              let use = {
                  token: auth.tok,
                  sec: auth.secret,
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

let anotarLog = async ({user,pass},{tok,secret}) => {
    let client,result;
    if(user !== undefined && pass !== undefined){
        try{
            console.log('entre')
            client = await MongoClient.connect(url,{useUnifiedTopology: true})
             let dbo = client.db('usuariosReto')
             let us = dbo.collection('users')
              result = await us.updateOne({"email": user,pass: pass}, {$set:{auth: tok,secret: secret}})
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

let getNearRestaurants = async (lat,lon) => {
    let client,result,ret;
    try{
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        let dbo = client.db('comidasReto')
        let restaurant = dbo.collection('restaurantes')
        result = await restaurant.find().toArray()
        if(result !== null){
         let near = result.filter( e => {
             let dist = parseFloat(haversineDistance([lat,lon],[e.long,e.lat]).toFixed(3))
             if(0 < dist && dist < 1.5){
                return e
             }
            })
        let nearer = near.sort((a,b) => (a-b))
        let hundred = nearer.filter((e,i) => { if(i < 100) return e } )
        ret = {
            valid: true,
            restaurants: hundred
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

const haversineDistance = ([lat1, lon1], [lat2, lon2], isMiles = false) => {
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);

    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

    if (isMiles) {
      finalDistance /= 1.60934;
    }

    return finalDistance;
};

let findSecretToken = async ({name,lastName,birth,email,password,token}) => {
    let client,result;
    let ret = false;
    
    if(token.token !== undefined && token.secret !== undefined){
        try{
            client = await MongoClient.connect(url,{useUnifiedTopology: true})
             let dbo = client.db('usuariosReto')
             let us = dbo.collection('users')
              result = await us.findOne({auth: token.token,secret: token.secret})
              if(result !== null){
                  console.log(result, lastName)
                if(name == ''){
                    name = result.user
                }
                if(lastName == ''){
                    lastName = result.lastName
                }
                if(birth == ''){
                    birth = result.birth
                }
                if(email == ''){
                    email = result.email
                }
                if(password == ''){
                    password = result.pass
                }

                update = await us.updateOne({user: result.user,auth: token.token}, {$set:{user:name,lastName: lastName,birth: birth, email:email,pass: password}})
                if(update.result.nModified > 0){
                    ret = true
                }
            }else{
                ret = false
            }

        }catch(err){
            throw err
        } finally{
            client.close()
            return ret
        }
    } else{
        return ret
    }
}

let eliminateUser = async ({token, secret}) => {
    let client,result;
    if(token !== undefined && secret !== undefined){
        try{
            client = await MongoClient.connect(url,{useUnifiedTopology: true})
             let dbo = client.db('usuariosReto')
             let us = dbo.collection('users')
              result = await us.remove({auth: token,secret: secret})
              console.log('Esta Borrado ')
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


// let dataRestaurantes = datos.datos.map(e => {
//     e.valoracion_global = parseFloat(e.valoracion_global)
//     return e
// })


// ------ INSERTAMOS TODOS LOS DATOS DEL JSON CON ESTA FUNCION -----
// let insertRestaurant = async () => {
//     let client, result;
//     try{
//         client = await MongoClient.connect(url2, { useUnifiedTopology: true })
//         let dbo = client.db('comidasReto')
//         let resto = dbo.collection('restaurantes')
//         result = await resto.insertMany(dataRestaurantes)
//         console.log('Base de datos ha sido actualizada')
//     }catch(err){
//         throw err
//     }
// }






//logica
app.post('/login', (req,res) => {
    let user;
    if(req.body.auth !== undefined){
        user =  {
            user: req.body.name,
            email: req.body.email,
            auth: {tok: req.body.auth,
            secret: req.body.secret}
        }
        console.log(req.body)
        anotarLogFacebook(user).then(data => {
            if(data.valid){
                res.send({tok:data.token,sec: data.sec, valid: data.valid})
            }else {
                res.send({valid: false})
            }
        })
    }else{
        user = {
            user: req.body.name,
            pass: req.body.pass,
    
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
    }
    
    
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

app.get('/cercaDeMi/:lat/:lon', (req,res) => {
    let lat = req.params.lat
    let lon = req.params.lon
    getNearRestaurants(lat,lon).then( data => {
        if(data.valid){
            res.send({nearRestaurants:data.restaurants})
        }
    })
    
})

app.get('/restaurant/:index', (req,res) => {
    let id = Number(req.params.index)
    searchUniqueRestaurant(id).then(
        data => {
            if(!data){
                res.send({valid:false})
            }else{
                res.send({valid: true, restaurant: data})
            }
        }
    )
})

app.get('/foodListTerraza', (req,res) => {
    searchRestaurantsTerraza()
    .then(result => res.send(result))
    
})

app.get('/foodListSeguro', (req,res) => {
    searchRestaurantsSeguro()
    .then(result => res.send(result))
    
})

app.post('/informPersonal',(req,res) => {
    const user = {
        name: req.body.name,
        lastName: req.body.surname,
        birth: req.body.birth,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token
    }
    findSecretToken(user).then(dat => {
        console.log(dat)
        if(dat){
            res.send({valid: true})
        }else if(!dat){
            res.send({valid:false})
        }
    })
})

app.post('/eliminate', (req,res)=> {
    const token = req.body.toke

    eliminateUser(token).then(data => data ? res.send({elimin: true}) : res.send({elimin: false}))
})

//Listen
app.listen(port,() => console.log(`servidor conectado por ${port}`))