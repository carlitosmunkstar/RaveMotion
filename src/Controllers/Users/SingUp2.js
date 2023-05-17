const { User } = require("../../db");

// Verifiacion del documento en la bdd
const singUp2 = async (req, res) => {
    const { documentType, document } = req.body;
    try {
        const existingDocument = await User.findOne({
            where: { document: document, documentType: documentType },
        });
        if (existingDocument) {
            return res
                .status(400)
                .json({ error: "El documento ya está registrado." });
        }

        res.status(201).json({ message: "El documento esta disponible.s" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Hubo un error al registrar el documento.",
        });
    }
};

module.exports = singUp2;
