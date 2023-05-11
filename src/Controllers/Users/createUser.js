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
      adress,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !mail ||
      !password ||
      !documentType ||
      !document ||
      !birthDay ||
      !adress.street ||
      !adress.number ||
      !adress.city
    ) {
      res.status(200).json("Faltan datos");
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
          adress: adress,
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

