const {Ticket,Event,TicketsSold }=require('../../db')

const getTicketsSells = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await Event.findAll({
            where: {
              [Op.and]: [
                { userId: userId },
                { status: true }
              ]
            }
          });

    const ticketsPromises = events.map(async (e) => {
      const tickets = await Ticket.findAll({
        where: {
          eventId: e.dataValues.id,
          status: true
        }
      });

      let totalEventAmount = 0;
      let totalEventsSells = 0;
      const ticketsArray = [];

      await Promise.all(tickets.map(async (t) => {
        const ticketsold = await TicketsSold.findAll({ where: { ticketId: t.id } });
        totalEventAmount += t.sells * t.price;
        totalEventsSells += t.sells;

        const ticketsoldsArray = ticketsold.map((ts) => {
          return {
            id: ts.id,
            userId: ts.userId,
            email: ts.email,
            createdAt: ts.createdAt
          };
        });

        ticketsArray.push({
            name: t.name,
            maxq: t.maxQuantity,
            accesType:t.accessType,
            sells: t.sells,
            ticketId: t.id,
            price: t.price,
            totalAmount: t.sells * t.price,
            createdAt:  t.createdAt,
            ticketsolds: ticketsoldsArray
        });
      }));

      return {
        events: e.name,
            eventId: e.id,
            date: e.date,
            hour: e.hour,
            current: e.current,
            totalAmount: totalEventAmount,
            totalTicketSells: totalEventsSells,
            tickets: ticketsArray
      };
    });

    const ticketsProducer = await Promise.all(ticketsPromises);

    res.status(200).json(ticketsProducer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  module.exports = getTicketsSells;