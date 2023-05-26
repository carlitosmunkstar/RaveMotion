const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const { Op } = require("sequelize");

const Logingoogle = async (req, res) => {
    const { name, lastname, email } = req.body;
    try {
        // Buscar usuario
        const user = await User.findOne({
            where: { email: { [Op.iLike]: email } },
        });
        if (!user) {
            return res
                .status(400)
                .json({ error: "Las credenciales no son válidas." });
        }

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
