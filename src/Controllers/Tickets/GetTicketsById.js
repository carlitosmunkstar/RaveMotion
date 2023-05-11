const { Tickets } = require("../../db");

const getTicketsById = async (req, res) => {
    const {id} = req.params
  try {
    const ticketsByID = await Tickets.findAll( {where: {eventId: id}});
    res.status(200).json(ticketsByID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTicketsById;