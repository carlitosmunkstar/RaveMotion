const { Event } = require('../../db.js');

const getEventByProducer = async (req, res) => {
  try {
    const producer = req.query.producer;
    
    if (!producer) {
      res.status(400).json({ error: 'Debe proporcionar el nombre del productor en la consulta.' });
      return;}

      let eventByProducer={}
    
      if(producer==='All'){
        eventByProducer=await Event.findAll();
      }else{
        eventByProducer = await Event.findAll({where: {producer: producer}});
      }
      
    if (!eventByProducer ) {
      res.status(404).json({ error: 'No se encontró ningún productor con el nombre proporcionado.' });
      return;}
    res.status(200).json(eventByProducer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getEventByProducer;

