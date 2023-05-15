const {User} = require('../../db'); 

// Verifiacion del documento en la bdd
const singUp2 = async (req, res) => {
  const {
    documentType,
    document
  } = req.body;
try{
    const existingDocument = await User.findOne({ where: { documentType, document } });
    if (existingDocument) {
      return res.status(400).json({ error: 'El documento ya está registrado.' });
    }

    res.status(201).json({ message: 'DNI y Nombre registrado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al registrar el DNI y el Nombre del usuario.' });
  }
}

module.exports = singUp2;

