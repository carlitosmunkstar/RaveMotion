/* eslint-disable max-len */
const {Ticket} = require('../../db.js');

const setTicketsStock= async (req, res)=>{
  try {
    const ticketId = req.params.ticketId;
    const {reservation} = req.body;

    if (!ticketId) {
      res.status(400).json({error: 'Debe proporcionar el ID de los tickets en el parámetro.'});
      return;
    }

    const TandaTicket = await Ticket.findByPk(ticketId);
    if (!TandaTicket) {
      res.status(404).json({error: 'No se encontraron tickets con el ID proporcionado.'});
      return;
    }

    const maxQuantity = TandaTicket.maxQuantity;
    const TotalTicketsreservation = TandaTicket.sells + TandaTicket.reservation + reservation;
    const reservasStock = maxQuantity - TandaTicket.sells - TandaTicket.reservation;

    // control se Stock
    if (TotalTicketsreservation > maxQuantity) {
      res.status(400).json({error: `No hay Stock para generar esa reserva. La cantidad de disponible para ${TandaTicket.name} es de ${reservasStock} tickets.`});
      return;
    }

    TandaTicket.reservation += reservation;
    await TandaTicket.save();

    res.status(200).json({TandaTicket});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports=setTicketsStock;
