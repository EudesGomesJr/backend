const fs = require("fs");
const { getExtensionByMimeType } = require("../utils/MimeTypeMaps");
const { getImagePath } = require("../utils/PathHandler");

const saveByBase64 = (filename, base64String, mimeType) => {
  let extension = getExtensionByMimeType(mimeType);
  filename = `${filename}.${extension}`;

  fs.writeFileSync(getImagePath(filename), atob(base64String), {
    encoding: "binary",
  });

  return filename;
};

const saveByUrl = async (filename, url) => {
  let response = await fetch(url);

  let mimeType = response.headers.get("content-type");
  let extension = getExtensionByMimeType(mimeType);
  if (!extension) {
    throw new Error("Tipo de arquivo da url inválido");
  }
  filename = `${filename}.${extension}`;

  let buffer = await response.arrayBuffer();
  buffer = Buffer.from(buffer, "binary");

  fs.writeFileSync(getImagePath(filename), buffer, {
    encoding: "binary",
  });

  return filename;
};

module.exports = {
  saveByBase64,
  saveByUrl,
};
