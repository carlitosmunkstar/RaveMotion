

const Logingoogle=  async (req, res) => {
  const { name, lastname, mail } = req.body;

  try {
    // Buscar usuario
    const user = await User.findOne({
        where: { mail: { [Op.iLike]: mail } },
    });
    if (!user) {
        return res
            .status(400)
            .json({ error: "Las credenciales no son válidas." });
    }

const token = jwt.sign(
  {
      id: user.id,
      email: user.mail,
      accessType: user.accessType,
      firstName: user.firstName,
  },
  process.env.JWT_SECRET,
  { expiresIn: "30d" }
);
// Enviar respuesta
res.status(200).json({
  user: {
      id: user.id,
      email: user.mail,
      accessType: user.accessType,
      firstName: user.firstName,
  },
  jwt:token,
});}
catch (error) {
res.status(500).json({ error: error.message });
}
};

module.exports = Logingoogle;