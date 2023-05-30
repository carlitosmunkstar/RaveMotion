const {Ticket} = require('../../db');
const {Op}=require('sequelize');
const getTicketsById = async (req, res) => {
  const {eventId} = req.params;
  try {
    const ticketsByID = await Ticket.findAll( {where: {
        [Op.and]:[
            {eventId: eventId},
            {status:true}
        ]}});

    res.status(200).json(ticketsByID);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = getTicketsById;
