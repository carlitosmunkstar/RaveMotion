const {Ticket} = require('../../db');

const deleteTicket = async (req, res) => {
  try {
    const {id} = req.params;
    const deleted = await Ticket.findByPk(id);
    if (!deleted) {
      return res.status(400).json('Tanda no encontrada');
    }
    deleted.status=false;
    await deleted.save();
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
module.exports = deleteTicket;
