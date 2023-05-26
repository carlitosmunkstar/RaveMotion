/* eslint-disable max-len */


// const SingInSession=  async (req, res) => {
//     const token = req.cookies.jwt;

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Failed to authenticate token' });
//         }

//         // // Si quieres, puedes buscar al usuario en la base de datos aquí

//         res.status(200).json({ message: 'Token is valid', user: decoded });
//     });
// };
// module.exports = SingInSession


const jwt = require('jsonwebtoken');
const {User} = require('../../db');

const SingInSession = async (req, res) => {
  const {token} = req.body;
  try {
    // Verificar el token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decodedToken);

    try {
      // Obtener los datos del usuario a partir del token decodificado
      const user = await User.findOne({
        where: {mail: decodedToken.email},
      });

      if (!user) {
        return res.status(404).json({error: 'Usuario no encontrado.'});
      }

      // Aquí puedes realizar cualquier verificación adicional del usuario si es necesario

      // Si todo es exitoso, devuelve los datos del usuario
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        accessType: user.accessType,
      });
    } catch (dbError) {
      console.error('Error al buscar el usuario:', dbError);
      res.status(500).json({error: 'Error al buscar el usuario en la base de datos.'});
    }
<<<<<<< HEAD
  } catch (jwtError) {
    console.error('Error con el token:', jwtError);
=======

    // Aquí puedes realizar cualquier verificación adicional del usuario si es necesario

    // Si todo es exitoso, devuelve los datos del usuario
    res.status(200).json({
      id: user.id,
      email:user.mail,
      firstName: user.firstName,
      accessType: user.accessType,
    });
  } catch (error) {
>>>>>>> 02ddebca9c75d19172413e789cc5dd81fa4beb74
    res.status(401).json({error: 'Token inválido.'});
  }
};

module.exports = SingInSession;
