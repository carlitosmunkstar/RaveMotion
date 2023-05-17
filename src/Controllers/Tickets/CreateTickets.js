const { Ticket, Event } = require("../../db");

const createTickets = async (req, res) => {
  const {tickets} = req.body;
  try {
    for(let ticket of tickets){
      if (!ticket.name || !ticket.maxQuantity || !ticket.price || !ticket.accessType||!ticket.eventId){
        return res.status(400).json("Su solicitud no se puede procesar, asegurese que los datos requeridos sean correctos.");
      }
      const evento=await Event.findByPk(ticket.eventId,
        {include:[
          { model: Ticket, required: false, where: { name: ticket.name } },
      ]})
      if(evento && evento.Tickets && evento.Tickets.length > 0){
        return res.status(400).json('Ya existe una tanda con ese nombre')
      }
      }

      const createdTickets = await Ticket.bulkCreate(tickets);
      res.status(200).json(createdTickets);
    }
   catch (error) {
    res.status(500).json({ error: error.message });
  };
}
module.exports = createTickets;
