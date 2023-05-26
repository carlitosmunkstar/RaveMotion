const {Op} = require('sequelize');
const {Event} = require('../../db.js');
const moment = require('moment');

const finalizedEvents = async (req, res) => {
  try {
    const currentDate = moment().format('YYYY-MM-DD');
    const finishedEvents = await Event.findAll({
      where: {
        current: false,
        date: {
          [Op.lt]: currentDate
        }
      }
    });
    res.status(200).json(finishedEvents);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = finalizedEvents;
