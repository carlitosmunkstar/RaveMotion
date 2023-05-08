const { Event } = require("../db");

const createEvents = async (req, res) => {
  try {
    const { name, imagen, description, date, hour, venue, producer } = req.body;
    if (
      !name ||
      !imagen ||
      !description ||
      !date ||
      !hour ||
      !venue ||
      !producer
    ) {
      res
        .status(400)
        .json(
          "Su solicitud no se puede procesar debido a que faltan datos requeridos. Por favor, asegúrese de completar toda la información necesaria antes de volver a enviar la solicitud."
        );
    } else {
      await Event.findOrCreate({
        where: { name },
        defaults: {
          imagen,
          description,
          date,
          hour,
          venue,
          producer,
        },
      })
        .then(([event, created]) => {
          if (created) {
            res.status(201).json(event);
          } else {
            res
              .status(409)
              .json({ error: "Ya existe un evento con ese nombre" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err.message });
        });
    }
  } catch (error) {
    res.status(500).json({ error: console.log(req) });
  }
};

module.exports = createEvents;
