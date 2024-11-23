const path = require('path');
const fs = require('fs');

const getBasePath = (folders = '') => {
    return path.resolve(folders);
}

//Esta função não será exportada para previnir a alteração do diretório STATIC
const getStaticPath = (path = '') => {
    return getBasePath(`${process.env.STATIC_DIR}/${path}`);
}

const getImagePath = (path = '') => {
    return getStaticPath(`images/${path}`);
}

const pathExists = (path = '') => {
    return fs.existsSync(path);
}

const imageExists = (path = '') => {
    path = getImagePath(path);
    return pathExists(`${path}`);
}

const makeDirIfNotExists = (path) => {
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive:true});
    }
}

module.exports = {
    getBasePath,
    getImagePath,
    pathExists,
    imageExists,
    makeDirIfNotExists
}