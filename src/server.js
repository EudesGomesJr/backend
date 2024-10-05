const express = require("express");
const app = express();
const fs = require('fs'); // fs = File System

app.get('/post/:slug', (request,response) => {
    //console.log(request.params.slug);
    let slug = request.params.slug;
    response.json({
        title: slug
    });
})

app.get('/contato',(request, response)=> {
    let content = fs.readFileSync(__dirname + '/view/contato.html');
    response.end(content); // .end já identifica que se trata de um conteúdo HTML
})

app.listen(3000); // Número da porta = 3000