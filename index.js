const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 8080
const io = require('socket.io')(server)



app.use(express.json());
app.use(express.static('views'))
app.use(express.urlencoded({ extended: true }));



//HandleBars
const hbs = handlebars.engine({
  extname: '.hbs',
  layoutsDir: __dirname + "/views",

})
app.engine("hbs", hbs);

// configuraciones
app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/form", (req, res) => {
  res.render("main", {layout:"form"});  
});

// Ruta para levantar el chat.
app.get("/chat", (req, res) => {
  res.render("main", {layout:"chat"});  
});

// Chat Server. Se conecta con 'chat' y recibe los mensajes y los emitirá a todos los clientes conectados
io.on('connection', socket => {
  socket.on('chat', message => {
    console.log('From client: ', message)
    io.emit('chat', message)
  })
})
app.get("/hbs", (req, res) => {
  res.render("main", {layout:"productos"});  
});


server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
