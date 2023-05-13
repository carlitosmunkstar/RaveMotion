const { Event } = require('../../db.js');
const { Op } = require('sequelize');
const moment = require('moment');

const getEventByDate = async (req, res) => {
  try {
    const {startDate,endDate} = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'Debe proporcionar las fechas en la consulta.' });
      return;}
    
      const eventByDate = await Event.findAll({where: {
        [Op.and]: [
          { date: { [Op.gte]: moment(startDate, 'YYYY-MM-DD').toDate() } },
          { date: { [Op.lte]: moment(endDate, 'YYYY-MM-DD').toDate() } }
        ]
      }});
      
    if (!eventByDate ) {
      res.status(404).json({ error: 'No se encontró ningún evento entre esas fechas proporcionadas.' });
      return;}
    res.status(200).json(eventByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getEventByDate;

