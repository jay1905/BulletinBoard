const express = require('express')
const app = express()
const port = 3000
const pg = require('pg');
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://jaime:null@127.0.0.1:5432/postgres'
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));//declaring my paths for css
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// let users =[]
// let messages=[]
const pool = new Pool({
  connectionString: connectionString,
})
// const getUsers=()=>{
//   pool.query(`SELECT * FROM users`, (err, res) => {
//     if (err) {
//         throw err
//           }
//      users=res.rows
//    })
//    return users
// }
// const getMessages=()=>{
//   pool.query(`SELECT * FROM messages`, (err, res) => {
//     if (err) {
//         throw err
//           }
//       messages=res.rows
//    })
//    return messages
// }
// getUsers()
// getMessages()
app.get('/', (req, response) => {


    pool.query(`SELECT * FROM users`, (err, res) => {
      if (err) {
          throw err
            }
       let users=res.rows
       pool.query(`SELECT * FROM messages`, (err, res) => {
         if (err) {
             throw err
               }
           let messages=res.rows

           response.render('index',{users,messages})
        })
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
