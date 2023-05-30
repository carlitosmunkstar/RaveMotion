const {Event} = require('../../db.js');
const {Op} = require('sequelize');
const moment = require('moment');

const updateCurrentStatus = async () => {

  const currentDate = moment().format('YYYY-MM-DD');
  
  const events = await Event.findAll({
    where: {
      date: {
        [Op.lt]: currentDate,
      }
    }
  });

  events.forEach(async (event) => {
    event.current = false;
    await event.save();
  });
};

module.exports = {updateCurrentStatus};
