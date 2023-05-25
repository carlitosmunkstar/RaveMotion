const server = require("./src/app")
const { sequelize } = require("./src/db.js");
const PORT = process.env.PORT;

sequelize.sync({force: false}).then(() => {
  server.listen(PORT, () => {
    console.log(`Listen at ${PORT}`);
  });
});