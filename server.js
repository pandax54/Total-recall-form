const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.set('view engine', 'njk')

server.use(express.static('public'))

server.use(express.static('image'))

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
    //nao guarda uma versao, evitar erros nas atualizacoes 
    
  })

server.get("/", function(req, res) {
    return res.render("index")
})

server.get("/subscribe", function(req,res) {
    return res.render("form/subscribe")
})


server.listen(5000, function(){
    console.log("server is running")
})