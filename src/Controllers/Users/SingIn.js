const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../../db');
const {Op} = require('sequelize');

// Comprueba mail y password del user.
// Emite los datos necesarios del user tanto en un objeto user como en un JSW

const singIn = async (req, res) => {
  const {mail, password} = req.body;

  try {
    // Buscar usuario
    const user = await User.findOne({
      where: {mail: {[Op.iLike]: mail}},
    });
    if (!user) {
      return res
          .status(400)
          .json({error: 'Las credenciales no son válidas.'});
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
          .status(400)
          .json({error: 'Las credenciales no son válidas.'});
    }

    // Crear token
    const token = jwt.sign(
        {
          id: user.id,
          email: user.mail,
          accessType: user.accessType,
          firstName: user.firstName,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'},
    );
      // Enviar respuesta
    res.status(200).json({
      user: {
        id: user.id,
        email: user.mail,
        accessType: user.accessType,
        firstName: user.firstName,
      },
      jwt: token,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = singIn;
