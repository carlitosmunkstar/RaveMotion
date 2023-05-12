const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../../db'); 
const { Op } = require('sequelize');

// Método de registro
const singUp = async (req, res) => {
  const {
    firstName,
    lastName,
    mail,
    password,
    documentType,
    document,
    birthDay,
    address,
    accessType,
    status
  } = req.body;

  try {
   // Verificar si el correo electrónico y el documento ya están registrados
    const existingUser = await User.findOne({ where: { mail: { [Op.iLike]: mail }, document } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico y el número de documento ya están registrados.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      firstName,
      lastName,
      mail,
      password: hashedPassword,
      documentType,
      document,
      birthDay,
      address,
      accessType,
      status
    });

    // Enviar respuesta
    res.status(201).json({ message: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al crear el usuario.' });
  }
}  


module.exports = singUp

