const {Event} = require('../../db');

const getEventRating = async (req, res) => {
  const {id} = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({error: 'Event not found'});
    }
    res.status(200).json({averageRating: event.averageRating, critics:event.critics});
  } catch (error) {
    console.error("Caught an error:", error);
    res.status(500).json({error: error.message});
  }
}

module.exports = getEventRating;
