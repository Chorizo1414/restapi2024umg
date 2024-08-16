

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
}); 

let router = require('./app/routers/router.js');
let employee = require('./app/routers/employee.router.js');

let room = require('./app/routers/room.router.js');

let reservation = require('./app/routers/reservation.router.js');

let book = require('./app/routers/book.router.js');

let prestamo = require('./app/routers/prestamo.router.js');


const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());


app.use('/', router);
app.use('/', employee);

app.use('/', room);
app.use('/', reservation);

app.use('/', book);
app.use('/', prestamo);

app.get("/",(req,res) => {
  
  res.json({mesage:"Bienvenido Estudiantes de UMG"});
})

// Create a Server
const server = app.listen(8000, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})