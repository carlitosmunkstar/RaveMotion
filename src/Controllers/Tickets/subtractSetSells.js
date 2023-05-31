/* eslint-disable max-len */
const {Ticket} = require('../../db.js');

const subStrackSells= async (req, res)=>{
  try {

    const { aux } = req.body;
    for (const ticket of aux) { 
      const TandaTicket = await Ticket.findByPk(ticket.id);
      if (TandaTicket.reservation - ticket.quantity >=0) {
        TandaTicket.reservation -= ticket.quantity;
        await TandaTicket.save();
      } else {
        TandaTicket.reservation = 0;
      }
    }

    res.status(200).json("Reserva modificada con exito");
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = subStrackSells;
