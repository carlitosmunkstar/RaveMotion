const { DataTypes } = require("sequelize");
const cloudinary = require("cloudinary").v2;
const moment=require('moment')
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

module.exports = (sequelize) => {
  sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
          futureDate(value) {
            let currentDate = moment().format('YYYY-MM-DD');
            if (!moment(value, 'DD-MM-YYYY').isAfter(currentDate, 'YYYY-MM-DD')) {
              throw new Error('La fecha debe ser futura');
            }
          },
        },
      },
      hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      producer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 20],
        },
      },
      status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    },
    {
      hooks: {
        //! antes de crear el Evento en la bdd, se sube la imagen a cloudinary y en imagen, se guarda un string con la url
        async beforeCreate(event) {
          try {
            const result = await cloudinary.uploader.upload(event.image);
            event.image = result.secure_url;
          } catch (error) {
            throw new Error("Error al cargar la imagen en Cloudinary");
          }
        },
      },
    }
  );
};
