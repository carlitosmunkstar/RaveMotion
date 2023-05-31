/* eslint-disable max-len */
const {Ticket} = require('../../db.js');

const setTicketsStock = async (req, res) => {
  try {
    const { aux } = req.body;
    
    for (const ticket of aux) { 
      const TandaTicket = await Ticket.findByPk(ticket.id);

      const maxQuantity = TandaTicket.dataValues.maxQuantity;
      const TotalTicketsreservation = TandaTicket.dataValues.sells + TandaTicket.dataValues.reservation + ticket.quantity;

      if (TotalTicketsreservation > maxQuantity) {
        res.status(400).json({error: `No hay Stock de tickets para la reserva de tickets: ${TandaTicket.name}.`});
        return;
      }
    }

    for (const ticket of aux) {
      const TandaTicket = await Ticket.findByPk(ticket.id);
      TandaTicket.reservation += ticket.quantity;
      await TandaTicket.save();
    }
    res.status(200).json("Reserva realizada");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = setTicketsStock;