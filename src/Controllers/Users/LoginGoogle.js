const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');

const Logingoogle = async (req, res) => {
    const { name, lastname, email } = req.body;

    const hashedLastname = await bcrypt.hash(lastname, 10);
    try {
        // Buscar usuario o crearlo si no existe
        const [user, created] = await User.findOrCreate({
            where: { email: { [Op.iLike]: email } },
            defaults: { // este objeto proporciona los valores predeterminados para la creación
                firstName: name,
                lastName: lastname,
                email: email,
                password: hashedLastname
            }
        });

        const tokenGoogle = jwt.sign(
            {
                id: user.id,
                email: user.email,
                accessType: user.accessType,
                firstName: user.firstName,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );
        // Enviar respuesta
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                accessType: user.accessType,
                firstName: user.firstName,
            },
            jwt: tokenGoogle,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = Logingoogle;
