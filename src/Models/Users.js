/* eslint new-cap: ["error", { "newIsCap": false }]*/
const {DataTypes} = require('sequelize');

const moment = require('moment');

module.exports = (sequelize) => {
  sequelize.define('User', {
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
      validate: {isEmail: true},
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validations(value) {
          if (value.length < 8) {
            throw new Error(
                'La contraseña debe tener al menos 8 caracteres',
            );
          }
          if (!/\d/.test(value)) {
            throw new Error(
                'La contraseña debe contener al menos un número',
            );
          }
        },
      },
    },
    documentType: {
      /* eslint-disable-next-line*/
      type: DataTypes.ENUM('DNI', 'Pasaporte', 'Cedula'),
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false,
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
          const age = moment().diff(moment(value), 'years');
          if (age < 18) {
            throw new Error(
                'Debes tener al menos 18 años para registrarte',
            );
          }
        },
      },
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        validation(value) {
          if (!value.city || !value.street || !value.number) {
            throw new Error('Faltan datos');
          }
        },
      },
    },
    accessType: {
      /* eslint-disable-next-line*/
      type: DataTypes.ENUM('user', 'producer', 'rrpp', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
