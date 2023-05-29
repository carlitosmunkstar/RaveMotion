/* eslint new-cap: ["error", { "newIsCap": false }]*/
const { DataTypes } = require("sequelize");

const moment = require("moment");

module.exports = (sequelize) => {
    sequelize.define("User", {
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
        email: {
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
                        throw new Error(
                            "La contraseña debe tener al menos 8 caracteres"
                        );
                    }
                    if (!/\d/.test(value)) {
                        throw new Error(
                            "La contraseña debe contener al menos un número"
                        );
                    }
                },
            },
        },
        documentType: {
            /* eslint-disable-next-line*/
            type: DataTypes.ENUM("DNI", "Pasaporte", "Cedula"),
            allowNull: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 10],
            },
        },
        birthDay: {
            type: DataTypes.DATE,
            allowNull: true,
         
        },
        address: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        accessType: {
            /* eslint-disable-next-line*/
            type: DataTypes.ENUM("user", "producer", "rrpp", "admin"),
            allowNull: false,
            defaultValue: "user",
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });
};
