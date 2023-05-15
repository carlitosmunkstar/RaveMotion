const { User } = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const confirmResetPassword = async (req, res) => {
    try {
        const { resetPasswordToken } = req.params;
        const { newPassword } = req.body;

        // Desencripta el token y extrae el ID del usuario y la marca de tiempo
        const { userId, timestamp } = jwt.verify(
            resetPasswordToken,
            process.env.JWT_SECRET
        );

        // Comprueba si el token ha expirado (1 hora)
        if (Date.now() > timestamp + 3600000) {
            return res.status(400).json({
                error: "El token de restablecimiento de contraseña ha expirado.",
            });
        }

        // Encuentra al usuario por ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res
                .status(400)
                .json({ error: "No existe un usuario con ese ID." });
        }

        // Encripta la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualiza la contraseña del usuario
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            error: "Contraseña actualizada exitosamente.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Hubo un error al intentar restablecer la contraseña.",
        });
    }
};
module.exports = confirmResetPassword;
