const { User } = require("../../db");

const postUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mail,
      password,
      documentType,
      document,
      birthDay,
      userType,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !mail ||
      !password ||
      !documentType ||
      !document ||
      !birthDay ||
      !userType
    ) {
      res.status(200).json({ message: "faltan datos" });
    } else {
      let [user, create] = await User.findOrCreate({
        where: { mail: mail, document: document },
        default: {
          firstName: firstName,
          lastName: lastName,
          mail: mail,
          password: password,
          documentType: documentType,
          document: document,
          birthDay: birthDay,
          userType: userType,
        },
      });
      if (!create) {
        res.status(200).json({ message: "ese usuario ya se encuentra creado" });
      } else {
        res.status(200).json({ message: "el usuario se creo correctamente" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "algo salio mal" });
  }
};
module.exports = postUser

