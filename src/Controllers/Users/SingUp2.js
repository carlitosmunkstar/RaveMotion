const {User} = require('../../db'); 
const { Op } = require('sequelize');

// Método de registro
const singUp2 = async (req, res) => {
  const {
    mail,
    firstName,
    lastName,
    documentType,
    document
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { mail: { [Op.iLike]: mail } } });
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await User.update({
      firstName,
      lastName,
      documentType,
      document
    }, { where: { mail: { [Op.iLike]: mail } } });

    res.status(201).json({ message: 'DNI y Nombre registrado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al registrar el DNI y el Nombre del usuario.' });
  }
}


module.exports = singUp2
