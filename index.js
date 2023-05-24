const server = require("./src/app.js");
const { sequelize } = require("./src/db.js");
const APP_PORT = process.env.APP_PORT || 3001;

sequelize.sync({force: false}).then(() => {
  server.listen(APP_PORT, () => {
    console.log(`Listen at ${APP_PORT}`);
  });
});
