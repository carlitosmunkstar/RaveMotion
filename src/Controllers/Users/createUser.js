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
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !mail ||
      !password ||
      !documentType ||
      !document ||
      !birthDay
    ) {
      res.status(200).json({ message: "faltan datos" });
    } else {
      let [user, create] = await User.findOrCreate({
        where: { mail: mail, document: document },
        defaults: {
          firstName: firstName,
          lastName: lastName,
          mail: mail,
          password: password,
          documentType: documentType,
          document: document,
          birthDay: birthDay,
        },
      });
      if (!create) {
        res.status(200).json({ message: "ese usuario ya se encuentra creado" });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};
module.exports = postUser

