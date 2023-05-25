const server = require("./src/app")
const { sequelize } = require("./src/db.js");
const PORT = process.env.APP_PORT;

sequelize.sync({force: false}).then(() => {
  server.listen(PORT, () => {
  });
});