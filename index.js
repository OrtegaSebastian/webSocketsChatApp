const {Server: HTTPServer} = require('http')
const express = require('express');
const fs = require('fs')
const handlebars = require('express-handlebars')
const app = express()
const port = 8080;
const productsRouter = require('./products')
const {Server: SocketServer} = require('socket.io')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.set("views", __dirname + "/views");
// app.set("view engine", "hbs");

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
  res.render("main", { layout: "form" });  
});
app.use('/', productsRouter);

const httpServer = HTTPServer(app);

const io = new SocketServer(httpServer);

app.use(express.static('views'))


httpServer.listen(8080,()=>{
  console.log(`Server http conectado`)
})
