const { DataTypes } = require("sequelize");
const cloudinary = require("cloudinary").v2;
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      producer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 150], // Define un mínimo de 1 y un máximo de 150 caracteres
        },
      },
    },
    {
      timestamps: false,
      hooks: {
        //! antes de crear el Evento en la bdd, se sube la imagen a cloudinary y en imagen, se guarda un string con la url
        async beforeCreate(event) {
          try {
            const result = await cloudinary.uploader.upload(event.imagen);
            event.imagen = result.secure_url;
          } catch (error) {
            throw new Error("Error al cargar la imagen en Cloudinary");
          }
        },
      },
    }
  );
};
