const { User } = require("../../db");

// Verifiacion del email en la bdd
const singUp1 = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({
            where: { email: email },
        });
        if (existingUser) {
            return res.status(400).json({
                error: "El correo electrónico ya se encuentra registrado.",
            });
        }

        // Enviar respuesta
        res.status(201).json({ message: "Mail disponible." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al verificar el mail." });
    }
};

module.exports = singUp1;
