const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  port:8000,
  facebook:{
    appId:'643212349805713',
    appSecret:'ccee06980e479746f0f8c92b1efd5f3a',
  }
};