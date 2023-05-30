const {Ticket} = require('../../db');

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({where:{status:true}});
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = getTickets;


