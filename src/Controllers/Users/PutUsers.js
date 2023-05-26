const { User } = require("../../db.js");

const updateUserByEmail = async (req, res) => {
    //const { email } = req.params;
    const updatedUserData = req.body;
    console.log(updatedUserData);
    try {
        const user = await User.findOne({
            where: { email: updatedUserData.email },
        });

        if (user) {
            await User.update(updatedUserData, {
                where: { email: updatedUserData.email },
            });
            const updatedUser = await User.findOne({
                where: { email: updatedUserData.email },
            });
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = updateUserByEmail;
