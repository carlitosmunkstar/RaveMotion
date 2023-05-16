const bcrypt = require('bcryptjs');
const {User} = require('../../db'); 

// Método de registro
const singUp3 = async (req, res) => {
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
    res.status(201).json({ message: 'Usuario creado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al crear el usuario.' });
  }
}  


module.exports = singUp3

