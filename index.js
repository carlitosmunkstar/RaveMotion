const server = require("./src/app.js");
const { sequelize } = require("./src/db.js");
const APP_PORT = process.env.APP_PORT || 3001;

sequelize.sync({alter: true}).then(() => {
  server.listen(APP_PORT, () => {
    console.log(`Listen at ${APP_PORT}`);
  });
});
