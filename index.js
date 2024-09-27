const express= require("express");
const app= express();
const server= require("http").createServer(app);
const io= require("socket.io")(server,
 {cors: {origin:"*"},
connectionStateRecovery: {}});

app.set("view engine", "ejs");

app.get("/", (req,res)=>{

res.render("home");
});

server.listen(3000,()=>{
console.log("running on port 3000");
});

let users=0;

io.on("connection", (socket)=>{
	
console.log("user connected: " + socket.id);

++users;
io.emit("user count", users);
console.log(users);

socket.on("message", (data)=>{
//console.log(data);
//send message to everyone but ourselves 
socket.broadcast.emit("message", data);
});
//handle a disconnect 
socket.on("disconnect", ()=>{
	console.log("disconnected");
--users;
io.emit("user count", users);
console.log(users);
socket.disconnect();

});



});