const { DataTypes } = require("sequelize");

const moment = require("moment");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 25],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 25], 
        },
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validations(value) {
            if (value.length < 8) {
              throw new Error("La contraseña debe tener al menos 8 caracteres");
            }
            if (!/\d/.test(value)) {
              throw new Error("La contraseña debe contener al menos un número");
            }
            if (/[^a-zA-Z0-9]/.test(value)) {
              throw new Error(
                "La contraseña no puede contener caracteres especiales"
              );
            }
          },
        },
      },
      documentType: {
        type: DataTypes.ENUM("DNI", "Pasaporte", "Cedula"),
        allowNull: false,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 10],
        },
      },
      birthDay: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          //* value tiene que tener el siguiente formato: isOver18('2000-08-05')
          //* es un string 'YYYY-MM-DD'
          isOver18(value) {
            const age = moment().diff(moment(value), "years");
            if (age < 18) {
              throw new Error("Debes tener al menos 18 años para registrarte");
            }
          },
        },
      },
      adress:{
        type: DataTypes.JSON,
        allowNull: false
      },
      accessType: {
        type: DataTypes.ENUM("user", "productor", "rrpp", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }
  );
};
