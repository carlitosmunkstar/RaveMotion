require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE
  } = process.env;

  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
    logging: false,
    native: false, 
  });

  const basename = path.basename(__filename);
  
  const modelDefiners=[];
  //* esta funcion carga automaticamente los modelos al array modelDefiners
  //* todos los archivos en Models tiene que empezar con mayuscula
  //* hace un require a todos los archivos adentro de la carpeta Models
  //* este fragmento de codigo lo saque de db.js que nos dieron en el pi
  fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });

  modelDefiners.forEach(model => model(sequelize));

  const {Events, Users}=sequelize.models;

  //! aca abajo se definen las relaciones

  module.exports={
    sequelize,
    ...sequelize.models
  }