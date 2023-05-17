const { User } = require("../../db");
const sendEmail = require("../../Services/emailService");
const jwt = require("jsonwebtoken");

const resetPassword = async (req, res) => {
    try {
        const { mail } = req.body;

        // Encuentra al usuario por correo electrónico
        const user = await User.findOne({ where: { mail } });
        if (!user) {
            return res.status(400).json({
                error: "No existe un usuario con ese correo electrónico.",
            });
        }

        // Genera un token de restablecimiento de contraseña
        const resetPasswordToken = jwt.sign(
            { userId: user.id, resetPassword: true },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // 1 hora de duración
        );

        // Envía un correo electrónico al usuario con el token
        const subject = "Restablecimiento de contraseña";
        const message = `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:5173/changepassword/2`;
        await sendEmail(user.mail, subject, message);

        res.status(200).json({resetPasswordToken});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Hubo un error al intentar restablecer la contraseña.",
        });
    }
};

module.exports = resetPassword;
