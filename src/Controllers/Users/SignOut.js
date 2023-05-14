const signOut = (req, res) => {
    try {
        // Elimina la cookie
        res.clearCookie("jwt", { httpOnly: true, sameSite: "strict" });

        // Enviar respuesta
        res.status(200).json({ message: "Sesión cerrada con éxito." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = signOut;
