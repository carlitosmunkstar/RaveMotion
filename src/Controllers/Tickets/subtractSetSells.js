const {Ticket} = require('../../db.js')

const subStrackSells= async(req,res)=>{
  try {
    const ticketId = req.params.ticketId;
    const {reservation} = req.body;

    if (!ticketId) {
      res.status(400).json({ error: 'Debe proporcionar el ID de los tickets en el parámetro.' });
      return;
    }

    const TandaTicket = await Ticket.findByPk(ticketId);

    if(TandaTicket.reservation - reservation >=0){
    TandaTicket.reservation -= reservation} 
    else{TandaTicket.reservation = 0}

    await TandaTicket.save();
    if (!TandaTicket) {
      res.status(404).json({ error: 'No se encontraron tickets con el ID proporcionado.' });
      return;
    }

    res.status(200).json({ TandaTicket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = subStrackSells;