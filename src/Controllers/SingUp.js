const { Users } = require("../db");

const singUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { mail: email, password: password },
  });
  try {
    if (user) {
      res.status(200).json({ message: `Bienvenido ${user.firstName}` });
    } else {
      res
        .status(403)
        .json({
          message: `el usuario del email ${email} no se encuentra registrado`,
        });
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
};
