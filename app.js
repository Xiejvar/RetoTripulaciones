//Dependecias
const express = require("express");
const mongo = require('mongodb')
const MongoClient = require("mongodb").MongoClient
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');




//global scopes
const app = express();
const port = 1024;
app.use(express.static("public"))
const url = 'mongodb://localhost:27017/usuarios'
const url2 = 'mongodb://localhost:27017/'
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


const scrapData = async() =>{
    try {
        let browser = await puppeteer.launch({headless: false})
        let page = await browser.newPage()
        await page.goto('https://www.eltenedor.es/search/?cityId=328022')
        setTimeout(async()=>{
            let body = await page.evaluate(()=>{
                let cuerpo = document.querySelector('body').innerHTML
                console.log(cuerpo)
                return cuerpo;
            })
            console.log(body)
            //let $ = cheerio.load(body)
            //console.log($('body').html())
        },10000)
        
    }
    catch(err){
        throw err
    }
}

scrapData()

//logica
app.get('/', (req,res)=>{
    res.sendFile(__dirname + 'index.html')
})


//Listen
app.listen(port,() => console.log(`servidor conectado por ${port}`))