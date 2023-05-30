/* eslint-disable max-len */
const {Event} = require('../../db');
const cloudinary = require('cloudinary').v2;
const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});


const createEvents = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      date,
      hour,
      venue,
      producer,
      userId,
    } = req.body;

    if (
      !name ||
            !image ||
            !description ||
            !date ||
            !hour ||
            !venue ||
            !producer ||
            !userId
    ) {
      res.status(400).json(
          'Su solicitud no se puede procesar debido a que faltan datos requeridos. Por favor, asegúrese de completar toda la información necesaria antes de volver a enviar la solicitud.',
      );
    } else {
      const result = await cloudinary.uploader.upload(image);
      const newImage = result.secure_url;
      await Event.findOrCreate({
        where: {name},
        defaults: {
          image: newImage,
          description,
          date,
          hour,
          venue,
          producer,
          userId,
        },
      })
          .then(([event, created]) => {
            if (created) {
              res.status(201).json(event);
            } else {
              res.status(409).json({
                error: 'Ya existe un evento con ese nombre',
              });
            }
          })
          .catch((err) => {
            console.error(error); 
            res.status(500).json({error: err.message});
          });
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = createEvents;
