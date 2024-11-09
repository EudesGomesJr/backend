const fs = require('fs');
const img = require("./img");
let url = 'https://picsum.photos/200/300';
const path = require("path");

async function execute() {
    let response = await fetch(url)
    let mimeType = response.headers.get('content-type')
    let buffer = await response.arrayBuffer();
    buffer = Buffer.from(buffer,'binary');
    fs.writeFileSync('teste.jpg',buffer, {
        encoding: 'binary'
    });
}

execute();