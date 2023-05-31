/* eslint-disable max-len */
const {Event}=require('../../db.js');
const cloudinary = require('cloudinary').v2;
const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const putEvents= async (req, res)=>{
  try {
    const eventId = req.params.id;
    const putEvent = req.body;

    const result = await cloudinary.uploader.upload(`${putEvent.image}`, {
      resource_type: 'image',
    });

    const newImage = result.secure_url;
    putEvent.image = newImage;

    if (!eventId) {
      res.status(400).json({error: 'Debe proporcionar el ID del evento en el parámetro.'});
      return;
    }

    const event = await Event.findByPk(eventId); 
    if (!event) {
      res.status(404).json({error: 'No se encontró ningún evento con el ID proporcionado.'});
      return;
    }

    await event.update(putEvent);

    res.status(200).json({event:event});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports=putEvents;
