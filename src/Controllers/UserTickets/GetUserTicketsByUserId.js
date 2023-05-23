const {TicketsSold, Ticket, Event} = require('../../db');

const getUserTicketsByID = async (req, res) => {
  const {userId} = req.params;
  try {
    const userTickets = await TicketsSold.findAll({
      where: {userId: userId},
      include: [{
        model: Ticket,
        attributes: ['accessType', 'name']},
      {model: Event,
        attributes: ['name', 'date']},
      ]});
    if (userTickets) {
      res.status(200).json(userTickets);
    } else {
      res.status(400).json('No se encontraron ticket para este usuario');
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = getUserTicketsByID;
