const { User } = require("../../db.js");

const updateUserByEmail = async (req, res) => {
  //const { mail } = req.params;
  const updatedUserData = req.body;
  console.log(updatedUserData);
  try {
    const user = await User.findOne({ where: { mail: updatedUserData.mail } });

    if (user) {
      await User.update(updatedUserData, {
        where: { mail: updatedUserData.mail },
      });
      const updatedUser = await User.findOne({ where: { mail: updatedUserData.mail } });
      res.status(200).json(updatedUser);
    } else {
      
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateUserByEmail;
