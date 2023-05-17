const jwt = require("jsonwebtoken");
const { User } = require("../../db");

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

const SingInSession = async (req, res) => {
    const { token } = req.body;

    try {
        // Verificar el token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Obtener los datos del usuario a partir del token decodificado
        const user = await User.findOne({
            where: { mail: decodedToken.email },
        });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        // Aquí puedes realizar cualquier verificación adicional del usuario si es necesario

        // Si todo es exitoso, devuelve los datos del usuario
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            accessType: user.accessType,
        });
    } catch (error) {
        res.status(401).json({ error: "Token inválido." });
    }
};

module.exports = SingInSession;
