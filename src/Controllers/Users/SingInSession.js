
const jwt = require('jsonwebtoken');

const SingInSession=  async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        // Si quieres, puedes buscar al usuario en la base de datos aquí

        res.status(200).json({ message: 'Token is valid', user: decoded });
    });
};
module.exports = SingInSession