const {Server: HTTPServer} = require('http')
const express = require('express');
const fs = require('fs')
const handlebars = require('express-handlebars')
const app = express()
const port = 8080;
const productsRouter = require('./products')
const {Server: SocketServer} = require('socket.io');
const httpServer = HTTPServer(app);
const { render } = require('express/lib/response');
const io = new SocketServer(httpServer)
const moment = require ("moment");



app.use(express.json());
app.use(express.static('views'))
app.use(express.urlencoded({ extended: true }));

const Mensajes = [];

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

app.get("/chat", (req, res) => {
  res.render("main", {layout:"chat"});  
});
app.get("/hbs", (req, res) => {
  res.render("main", {layout:"productos"});  
});
// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });

httpServer.listen(8080,()=>{
  console.log(`Server http conectado`)
})


// NO LO PUDE HACER ANDAR.
io.on('chat', (socket)=>{
  socket.emit('entrada', 'te has conectado ')

  socket.on('chat_back', (data)=>{
  renderChat(data)
  socket.emit('message_client', data)  
  })
})
let date = moment().format("DD/MM/YYYY hh:mm:ss")


const msn = [];
io.on("dataMsn",(data)=>{
    data.date = date;
    msn.push(data) 
    ChatData.save(data);     
})
io.sockets.emit("chat_back", msn)

// const renderChat = (data)=>{
//   let html = data
//   .map((x)=>{
//     if (userChat ==x.nameUser){
//       return `<div class="containerChat darker">
//         <b class="userName-left">${x.nameUser}</b>
//         <div clas='container'>
//         <p><span style='color:#81b29a'>${x.msnUser}</span></p>
//         <span class="time-right"><span style='color:#a47148'>${x.date}</span></span>
//         </div>
//         `;
//       }else{
//         return `
//           <div class="containerChat">
//             <b class="userName-right">${x.nameUser}</b>
//             <div class='container'>
//             <p><span style='color:#81b29a'>${x.msnUser}</span></p>
//             <span class="time-left"><span style='color:#a47148'>${x.date}</span></span>
//             </div>
//           </div>  
//         `;
//       }    
//     })
//   .join("");
//   document.querySelector("#chatBox").innerHTML = html;
// }

