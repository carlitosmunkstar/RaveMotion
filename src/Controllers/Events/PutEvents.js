const {Event, Ticket}=require('../../db.js')

const putEvents= async(req,res)=>{
  try {
    const eventId = req.params.id;
    const updatedData = req.body;


    if (!eventId) {
      res.status(400).json({ error: 'Debe proporcionar el ID del evento en el parámetro.' });
      return;
    }

    const event = await Event.findByPk(eventId);

    if (!event) {
      res.status(404).json({ error: 'No se encontró ningún evento con el ID proporcionado.' });
      return;
    }

    await event.update(updatedData);

    res.status(200).json({ message: 'Evento actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports=putEvents;