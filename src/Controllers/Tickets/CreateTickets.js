const { Tickets } = require("../../db");

const createTickets = async (req, res) => {
  try {
    const {
      eventId,
      name,
      description,
      maxQuantity,
      price,
      accessType,
      sells,
    } = req.body;
    if (!name || !maxQuantity || !price || !accessType || !sells||!eventId) {
      res.status(400).json({error:"Su solicitud no se puede procesar debido a que faltan datos requeridos. Por favor, asegúrese de completar toda la información necesaria antes de volver a enviar la solicitud."});
    } else {
      const newTickets = await Tickets.create({
        eventId,
        name,
        description,
        maxQuantity,
        price,
        accessType,
        sells,
      });

      res.status(200).json({ newTickets });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createTickets;
//* actualizar a bulkcreate