const {User} = require('../../db'); 
const { Op } = require('sequelize');

// Verifiacion del email en la bdd
const singUp1 = async (req, res) => {
  const {
    mail,
  } = req.body;
  try {
    const existingUser = await User.findOne({ where: { mail: { [Op.iLike]: mail } } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico  ya está registrado.' });
    }

    // Enviar respuesta
    res.status(201).json({ message: 'Mail registrado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al registrar el mail.' });
  }
}  


module.exports = singUp1
