const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Tickets', {
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
        model: 'Events', 
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    maxQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    accessType: {
      type: DataTypes.ENUM('general', 'vip', 'early_bird', 'backstage'),
      allowNull: false,
    },
    sells: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },{
    timestamps: false,
  });
}
