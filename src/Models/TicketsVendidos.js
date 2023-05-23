const {DataTypes}=require('sequelize');

module.exports=(sequelize)=>{
  sequelize.define('TicketsSold', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tickets',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    qrImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {isEmail: true},
    },
    validate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
