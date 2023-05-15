const {User} = require('../../db'); 
const { Op } = require('sequelize');

// Método de registro
const singUp3 = async (req, res) => {
  const {
    mail,
    birthDay,
    address,
    accessType,
    status
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { mail: { [Op.iLike]: mail } } });
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await User.update({
      birthDay,
      address,
      accessType,
      status
    }, { where: { mail: { [Op.iLike]: mail } } });

    res.status(201).json({ message: 'Usuario creado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al crear el usuario.' });
  }
}


module.exports = singUp3

