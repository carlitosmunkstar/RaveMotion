const { Event } = require("../../db");

const deleteEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByPk(id);
    const auxData = { ...deletedEvent.dataValues };
    await deletedEvent.destroy();
    res.status(200).json({ Deleted: auxData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = deleteEvents;
