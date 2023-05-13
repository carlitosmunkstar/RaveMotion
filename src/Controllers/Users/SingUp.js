const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../../db'); 
const { Op } = require('sequelize');

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
    address
  } = req.body;

  try {
   
    if (!firstName||!lastName||!mail||!password||!documentType||!document||!birthDay||!address) {
      return res.status(400).json({ message: 'Faltan datos.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    let [newUser, created] = await User.findOrCreate({
      where:{
        [Op.or]:[
          {mail:mail},
          {document:document, documentType:documentType}
        ]
      },
      defaults:{
        firstName,
        lastName,
        mail,
        password: hashedPassword,
        documentType,
        document,
        birthDay,
        address
      }
    });
    if(!created){
      res.status(400).json({error:'El mail o el documento ingresado ya se encuentra registrado.'})
    }else{
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:error.message});
  }
}  


module.exports = singUp

