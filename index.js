const server = require("./src/app")
const { sequelize } = require("./src/db.js");
const PORT = process.env.APP_PORT || 3001;

sequelize.sync({force: false}).then(() => {
  server.listen(PORT, () => {
    console.log(`Listen at ${APP_PORT}`);
  });
});