const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Ticket", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "Events",
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
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      },
    },
    accessType: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 20],
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maxQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    sells: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate:{
        maxQuantity(value){
          if(value>this.getDataValue('maxQuantity')){
            throw new Error('La cantidad vendida no puede superar el máximo de tickets')
          }
        }
      }
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  { timestamps: false });
};
