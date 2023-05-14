const fs = require("fs");

// Видалення файлу з тимчасової директорії
const deleteTempFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = deleteTempFile;
