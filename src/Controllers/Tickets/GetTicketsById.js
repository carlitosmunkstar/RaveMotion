const { Ticket } = require("../../db");

const getTicketsById = async (req, res) => {
    const {eventId} = req.params
  try {
    const ticketsByID = await Ticket.findAll( {where: {eventId: eventId}});
    res.status(200).json(ticketsByID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTicketsById;