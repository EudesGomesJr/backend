const path = require("path");
const fs = require("fs");

const getBasePath = (folders = "") => {
  return path.resolve(folders);
};

// A função abaixo não será exportada para previnir que eventual alteração
// do diretório STATIC cause dúvida sobre a função getStaticPath
const getStaticPath = (path = "") => {
  return getBasePath(`${process.env.STATIC_DIR}/${path}`);
};

const getImagePath = (path = "") => {
  return getStaticPath(`images/${path}`);
};

const pathExists = (path = "") => {
  return fs.existsSync(path);
};

const imageExists = (path = "") => {
  path = getImagePath(path);
  return pathExists(`${path}`);
};

const makeDirIfNotExists = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

const rmImageIfExists = (filename) => {
  if (imageExists(filename)) {
    fs.unlinkSync(getImagePath(filename));
  }
};

module.exports = {
  getBasePath,
  getImagePath,
  pathExists,
  imageExists,
  makeDirIfNotExists,
  rmImageIfExists,
};
