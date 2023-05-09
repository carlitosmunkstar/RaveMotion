const { User } = require("../../db");

const singUp = async (req, res) => {
  const { mail, password } = req.body;
  const user = await User.findOne({
    where: { mail: mail, password: password },
  });
  try {
    if (user) {
      res.status(200).json({ message: `Bienvenido ${user.firstName}` });
    } else {
      res.status(403).json({
        message: `el usuario del email ${mail} no se encuentra registrado`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = singUp;
