const bcrypt = require("bcryptjs");
const { User } = require("../../db");
const { Op } = require("sequelize");

// Método de registro
const singUp1 = async (req, res) => {
    const { mail, password } = req.body;

    try {
        const existingUser = await User.findOne({
            where: { mail: { [Op.iLike]: mail } },
        });
        if (existingUser) {
            return res.status(400).json({
                error: "El correo electrónico ya se encuentra registrado.",
            });
        }
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create({
            mail,
            password: hashedPassword,
        });

        // Enviar respuesta
        res.status(201).json({ message: "Mail registrado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Hubo un error al registrar el mail.",
        });
    }
};

module.exports = singUp1;
