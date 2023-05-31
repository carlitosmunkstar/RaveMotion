const {Event, TicketsSold} = require('../../db');
const {Op} = require('sequelize');

const rateEvent = async (req, res) => {
  const {userId, id, rating} = req.body;

  try {
    const isBuyer = await TicketsSold.findAll({
      where:{
        [Op.and]: [
          { userId: userId },
          { eventId: id }
        ]
      }
    });

    if (isBuyer.length) {
      const event = await Event.findByPk(id);
      event.rating = event.rating + rating;
      event.critics++;
      event.averageRating = event.rating / event.critics;
      await event.save();
      res.status(200).json("Puntuaje Actualizado");
    } else {
      res.status(400).json('El usuario no compro entradas para este evento')
    }
  } catch (error) {
    console.error("Caught an error:", error); 
    res.status(500).json({error: error.message})
  }
}

module.exports = rateEvent;

