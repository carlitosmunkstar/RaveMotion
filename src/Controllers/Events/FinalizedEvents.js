const {Event} = require('../../db.js');
const { updateCurrentStatus } = require ("./UpdateBdd.js")
const finalizedEvents = async (req, res) => {

  try {
    await updateCurrentStatus();
    const finishedEvents = await Event.findAll({
      where: {
        current: false,
      }
    });
    res.status(200).json(finishedEvents);
  } catch (error) {
    console.error(error); 
    res.status(500).json({error: error.message});
  }
};

module.exports = finalizedEvents;