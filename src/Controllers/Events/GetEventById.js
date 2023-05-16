const { Event, Ticket } = require("../../db");

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
       
        const event = await Event.findByPk(id, {
            where: {status:true},
            include: [
                { model: Ticket, required: false, where: { eventId: id } },
            ],
        });
        if (event.status===true) {
            return res.status(200).json(event);
        } else {
            return res.status(400).json("Evento terminado");
        }
        return res.status(204).json('El evento ya termino')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getEventById;
