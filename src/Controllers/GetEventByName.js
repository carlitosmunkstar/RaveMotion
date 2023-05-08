const { Event, Ticket } = require('../db.js');

const getEventByName = async (req, res) => {
  try {
    const eventName = req.query.name;
    
    if (!eventName) {
      res.status(400).json({ error: 'Debe proporcionar el nombre del evento en la consulta.' });
      return;}
    
      const event = await Event.findOne({ where: { name: eventName } });
      
    if (!event) {
      res.status(404).json({ error: 'No se encontró ningún evento con el nombre proporcionado.' });
      return;}
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getEventByName;
