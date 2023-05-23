/* eslint-disable max-len */
const {Ticket}=require('../../db.js');

const putTicket= async (req, res)=>{
  try {
    const ticketId = req.params.ticketId;
    const updatedData = req.body;


    if (!ticketId) {
      res.status(400).json({error: 'Debe proporcionar el ID de los tickets en el parámetro.'});
      return;
    }

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      res.status(404).json({error: 'No se encontraron tickets con el ID proporcionado.'});
      return;
    }

    await ticket.update(updatedData);

    res.status(200).json({updatedData});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports=putTicket;
