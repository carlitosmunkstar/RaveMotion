const { Event, Ticket } = require('../../db.js');

const getDeletedEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { status: false } });

    const eventIds = events.map((event) => event.id);

    const eventTickets = await Ticket.findAll({
      where: { eventId: eventIds },
    });

    const eventsWithTickets = events.map((event) => {
      const tickets = eventTickets.filter((ticket) => ticket.eventId === event.id);
      return { ...event.toJSON(), tickets };
    });

    res.status(200).json(eventsWithTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDeletedEvents;