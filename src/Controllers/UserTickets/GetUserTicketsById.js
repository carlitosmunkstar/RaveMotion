const { TicketsVendidos } = require("../../db");

const getUserTicketsByID = async (req, res) => {
    const {userId} = req.params;
  try {
    const userTickets = await TicketsVendidos.findAll( {where: {userId: userId}});
    res.status(200).json(userTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUserTicketsByID;
