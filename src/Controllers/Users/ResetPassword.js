const { User } = require("../db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/emailService");

const sendRecoveryCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Falta el correo electrónico" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const code = crypto.randomBytes(4).toString("hex");
    const token = jwt.sign({ code, email }, "your-secret-key");

    await sendEmail(user.email, "Código de recuperación de contraseña", `Tu código de recuperación es: ${code}\nPor favor, ingrésalo en la página de recuperación.`);

    res.status(200).json({ message: "Correo electrónico enviado", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, code, newPassword } = req.body;

    if (!token || !code || !newPassword) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, "your-secret-key");
    } catch (error) {
      return res.status(403).json({ message: "Token inválido" });
    }

    if (decoded.code !== code) {
      return res.status(403).json({ message: "Código incorrecto" });
    }

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.update({ password: newPassword });

    res.status(200).json({ message: "Contraseña actualizada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendRecoveryCode,
  resetPassword,
};

