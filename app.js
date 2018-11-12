const express = require('express')
const app = express()
const port = 3000
const pg = require('pg');
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@127.0.0.1:5432/bulletinboard'
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const pool = new Pool({
  connectionString: connectionString,
})

app.get('/', (req, response) => {

       pool.query(`SELECT * FROM messages`, (err, res) => {
         if (err) {
             throw err
               }
           let messages=res.rows
           response.render('index',{messages})
        })

})
app.get('/add',(req, res) => res.render('addMsg'))
app.post('/addmessage', (req, response) =>{
  pool.query(`INSERT INTO  messages(userid,title,body) VALUES(1,'${req.body.msgTitle}','${req.body.msgBody}')`
              ,(err, res) => {
    if (err) {
        throw err
          }
            response.redirect('/')
   })

})

app.listen(port, () => console.log(`listening on port ${port}!`))
