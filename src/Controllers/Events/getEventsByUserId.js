const {Event, Ticket} = require('../../db');

const getEventByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    const event = await Event.findAll({
        where: {
          userId: userId,
          status: true
        },
        include: [
            {
              model: Ticket,
              required: false // Opcional, dependiendo de tus necesidades
            }
          ]
      });

    if (event) {
      return res.status(200).json(event);
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = getEventByUserId;