const bcrypt = require("bcryptjs");
const { User } = require("../../db");
const sendEmail = require("../../Services/emailService");
// Método de registro
const singUp3 = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        documentType,
        document,
        birthDay,
        address,
        accessType,
        status,
    } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            documentType,
            document,
            birthDay,
            address,
            accessType,
            status,
        });
        const subject = "Registro exitoso";
        const message = `Te has registrado exitosamente a Rave Motion, Bienvenido`;
        await sendEmail(newUser.email, subject, message);
        // Enviar respuesta
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al crear el usuario." });
    }
};

module.exports = singUp3;
