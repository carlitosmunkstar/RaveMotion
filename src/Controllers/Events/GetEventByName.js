const { Event, Ticket } = require('../../db.js');
const {Op}=require('sequelize');

const getEventByName = async (req, res) => {
  try {
    const eventName = req.query.name;
    
    if (!eventName) {
      res.status(400).json({ error: 'Debe proporcionar el nombre del evento en la consulta.' });
      return;}
    
      
        const event = await Event.findAll({
          where: {
            [Op.and]: [
              {
                [Op.or]:[
                  { name: {[Op.iLike]: `%${eventName.toLowerCase()}%`} },
                  {description: { [Op.iLike]: `%${eventName.toLowerCase()}%` }}
               ],
              },
              { status: true },
            ],
          },
        });

    if (!event) {
      res.status(404).json({ error: 'No se encontró ningún evento con el nombre proporcionado.' });
      return;}
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getEventByName;


//* que busque en la descropcion