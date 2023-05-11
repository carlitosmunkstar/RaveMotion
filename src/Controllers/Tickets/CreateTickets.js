const { Ticket } = require("../../db");

const createTickets = async (req, res) => {
  const {tickets} = req.body;
  try {
    tickets.forEach(tickets=>{    if (!tickets.name || !tickets.maxQuantity || !tickets.price || !tickets.accessType||!tickets.eventId) 
      res.status(400).json({error:"Su solicitud no se puede procesar, asegurese que los datos requeridos sean correctos."});})

      const createdTickets = await Ticket.bulkCreate(tickets);
      res.status(200).json(createdTickets);
    }
   catch (error) {
    res.status(500).json({ error: error.message });
  };
}
module.exports = createTickets;
