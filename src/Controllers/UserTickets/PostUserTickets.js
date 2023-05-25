/* eslint-disable max-len */
const {TicketsSold, Ticket, Event}=require('../../db');
const qrcode = require('qrcode'); // generador de codigo qr
const {v4: uuidv4} = require('uuid'); // generador de clave unica
const fs = require('fs'); // manejo de carpetas y archivos
const cloudinary = require('cloudinary').v2; // carga de archivos en cloudinary
const tmp = require('tmp'); // generador de archivos temporales para cargar en cloudinary
const sendEmailWithQrCode = require('../../Services/mailerMangaer');

const {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env;

// CLOUDINARY CONFIGURACION
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const PostTickets = async (req, res) => {
  const {tickets} = req.body;
  let newTickets = [];

  try {
    const resultados = await Promise.all(
        tickets.map(async (ticket) => {
          if (!ticket.eventId||!ticket.userId||!ticket.ticketId||!ticket.mail) {
            return res.status(400).json({error: 'Su solicitud no se puede procesar, asegurese que los datos requeridos sean correctos.'});
          }
          /* eslint-disable-next-line*/
          const codigo_ticket = uuidv4();

          // Generar el código QR usando la librería qrcode
          const buffer = await qrcode.toBuffer(codigo_ticket, {
            errorCorrectionLevel: 'M',
            version: 3,
            margin: 4,
            width: 150,
            color: {
              dark: '#000',
              light: '#fff',
            },
          });
          /* eslint-disable-next-line*/
          const archivo_temporal = tmp.fileSync();
          /* eslint-disable-next-line*/
          await fs.promises.writeFile(archivo_temporal.name, buffer);

          // Cargar el archivo en Cloudinary
          const resultado = await cloudinary.uploader.upload(
              /* eslint-disable-next-line*/
              archivo_temporal.name,
              {
                resource_type: 'raw',
                public_id: `qrCode`,
                format: 'png',
              },
          );

          // Eliminar el archivo temporal
          /* eslint-disable-next-line*/
          archivo_temporal.removeCallback();
          // Agregar el ticket a la lista de nuevos tickets con la URL del código QR

          // * aumenta en 1 sells de la tanda
          const tanda=await Ticket.findByPk(ticket.ticketId);
          tanda.sells++;
          await tanda.save();

          return {
            ...ticket,
            /* eslint-disable-next-line*/
            id: codigo_ticket,
            qrImage: resultado.secure_url,
          };
        }),
    );
    // Agregar los nuevos tickets a la base de datos
    newTickets = resultados;

    const createdTickets = await TicketsSold.bulkCreate(newTickets);
    if (createdTickets) {
      newTickets.map(async (ticket) => {
        const newTicket = await TicketsSold.findByPk(ticket.id, {
          include: [{
            model: Ticket, // Reemplaza "Tanda" con el nombre correcto del modelo de la tanda de tickets
            where: {id: ticket.ticketId},
            attributes: ['name', 'accessType'],
          },
          {
            model: Event,
            attributes: ['name'],
          }],
        });
        await sendEmailWithQrCode(newTicket);
      });
      console.log('LLEGUEEEEE');

      res.status(200).json(createdTickets);
    } else {
      res.status(400).json('Error al comprar los tickets');
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
module.exports=PostTickets;
