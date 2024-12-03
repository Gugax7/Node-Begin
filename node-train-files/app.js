const express = require("express")
const app = express()

app.get("/", function(req,ans){
    ans.sendFile(__dirname + "/html/index.html")
})

app.get("/about", function(req,ans){
    ans.sendFile(__dirname + "/html/about.html")
})

app.get("/second_page", function(req,ans){
    ans.send("thats second page!")
})

app.get("/ola/:cargo/:empresa/:nome", function(req,ans){
    ans.send("<h1>Ola " + req.params.nome + "</h1>" + "<h2>seu cargo e:" + req.params.cargo + "</h2>" + "<h3>e vc trabalha na empresa: " + req.params.empresa + "</h3>")
})



app.listen(8081, function(){
    console.log("Server is Running on http://localhost:8081")
})