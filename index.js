const express = require("express");
var http = require("http");
// const  = require("cors");
//const Socket  = require("socket.io");
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

var io = require("socket.io")(server);

 // middle ware
 app.use(express.json);
 //app.use(cors());
var clients = {};

 io.on("connection",(socket) => {
     console.log("connected");
     console.log(socket.id, 'Has joined!!!');
     socket.on("sigin" , (id) => {
         console.log(id);
         clients[id] = socket;
         console.log(clients);
     });
     socket.on("message", (msg)=>{
       console.log(msg);
       let targetId = msg.targetId;
      
      if(clients[targetId])  clients[targetId].emit("message",msg);
     });
 });
app.route("/check").get((req,res) =>{
return res.json("This app is working well");
});
 server.listen(port, "0.0.0.0",() =>{
console.log("server started");
 });