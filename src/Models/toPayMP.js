const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ToPayMP",
        {
            id:{
                type:DataTypes.STRING,
                primaryKey:true
            },
            tickets:{
                type:DataTypes.JSON,
                allowNull:false
            },
            send:{
                type:DataTypes.BOOLEAN,
                defaultValue:false
            }
        }
    )}