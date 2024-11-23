const fs = require('fs');
const { getExtensionByMimeType } = require('../utils/MimeTypeMaps');
const {getImagePath} = require('../utils/PathHandler');

const saveByBase64 = (filename, base64String, mimeType) => {

    let extension = getExtensionByMimeType(mimeType);
    filename = `${filename}.${extension}`;

    fs.writeFileSync(getImagePath(filename), atob(base64String), {
        encoding: "binary",
      });
    }

const saveByUrl = () => {}

module.exports = {
    saveByBase64,
    saveByUrl
}