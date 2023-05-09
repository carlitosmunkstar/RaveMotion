const {DataTypes}=require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define("TicketsVendidos",{
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "Users",
              key: "id",
            },
        },
        accessType: {
            type: DataTypes.ENUM("general", "vip", "early_bird", "backstage"),
            allowNull: false,
        },
        //! aca falta el campo para guardar el qr
    })
}