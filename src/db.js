require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];
//* esta funcion carga automaticamente los modelos al array modelDefiners
//* todos los archivos en Models tiene que empezar con mayuscula
//* hace un require a todos los archivos adentro de la carpeta Models
//* este fragmento de codigo lo saque de db.js que nos dieron en el pi
fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/Models", file)));
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


const { Event, User, Ticket, TicketsSold } = sequelize.models;

//! aca abajo se definen las relaciones
//? un usuario puede tener ciertos tickets
//? pero ciertos tickets solo pueden pertenecer a un solo usuario

//todo Relación uno a varios entre Tickes y TicketsSold
Ticket.hasMany(TicketsSold)
TicketsSold.belongsTo(Ticket, {
  foreignKey:"ticketId",
})

//todo Relación uno a varios entre User(comprador) y TicketsSold
User.hasMany(TicketsSold);
TicketsSold.belongsTo(User, {
  foreignKey: "userId",
});

//todo Relación uno a varios entre Event y Tickets
Event.hasMany(Ticket, {
  foreignKey: "eventId",
  onDelete: "CASCADE", //? cuando se elimina un evento se eliminan todos los tickes asociados
});
Ticket.belongsTo(Event, {
  foreignKey: "eventId",
});

//todo Relación uno a varios entre User(productora) y Event
User.hasMany(Event);
Event.belongsTo(User, {
  foreignKey: "userId",
})

//todo Relación varios a varios entre Tickets y User(comprador) a travez de la tabla ticketsSold
// Ticket.belongsToMany(User, { through: TicketsSold });
// User.belongsToMany(Ticket, { through: TicketsSold });



module.exports = {
  sequelize,
  ...sequelize.models,
};
