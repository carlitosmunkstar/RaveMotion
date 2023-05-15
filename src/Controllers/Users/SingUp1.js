<<<<<<< HEAD:src/Controllers/Users/SingUp1.js
const bcrypt = require('bcryptjs');
const {User} = require('../../db'); 
const { Op } = require('sequelize');

// Método de registro
const singUp1 = async (req, res) => {
  const {
    mail,
    password,
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { mail: { [Op.iLike]: mail } } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico y el número de documento ya están registrados.' });
    }
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      mail,
      password: hashedPassword,
    });

    // Enviar respuesta
    res.status(201).json({ message: 'Mail registrado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al registrar el mail.' });
  }
}  


module.exports = singUp1
=======
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const { Op } = require("sequelize");

// Método de registro
const singUp = async (req, res) => {
    const {
        firstName,
        lastName,
        mail,
        password,
        documentType,
        document,
        birthDay,
        address,
    } = req.body;

    try {
        if (
            !firstName ||
            !lastName ||
            !mail ||
            !password ||
            !documentType ||
            !document ||
            !birthDay ||
            !address
        ) {
            return res.status(400).json({ error: "Faltan datos." });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        let [newUser, created] = await User.findOrCreate({
            where: {
                [Op.or]: [
                    { mail: mail },
                    { document: document, documentType: documentType },
                ],
            },
            defaults: {
                firstName,
                lastName,
                mail,
                password: hashedPassword,
                documentType,
                document,
                birthDay,
                address,
            },
        });
        if (!created) {
            res.status(400).json({
                error: "El mail o el documento ingresado ya se encuentra registrado.",
            });
        } else {
            res.status(201).json(newUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = singUp;
>>>>>>> 1c765c490c92ccf9a148f5f1a31a6938cd7556bc:src/Controllers/Users/SingUp.js
