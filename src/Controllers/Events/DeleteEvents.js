const { Event } = require("../../db");

const deleteEvents = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Event.findByPk(id);
        if (!deleted) {
            return res.status(400).json("Evento no encontrado");
        }
        deleted.status = false;
        await deleted.save();
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = deleteEvents;
