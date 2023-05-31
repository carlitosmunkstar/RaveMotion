/* eslint-disable max-len */
const { TicketsSold, Ticket, Event } = require("../../db");
const qrcode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const sendEmailWithQrCode = require("../../Services/mailerMangaer");

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

// CLOUDINARY CONFIGURACION
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});

const PostTickets = async (req, res) => {
    const { tickets } = req.body;
    let newTickets = [];

    try {
        const resultados = await Promise.all(
            tickets.map(async (ticket) => {
                if (
                    !ticket.eventId ||
                    !ticket.userId ||
                    !ticket.ticketId ||
                    !ticket.email
                ) {
                    return res
                        .status(400)
                        .json({
                            error: "Su solicitud no se puede procesar, asegurese que los datos requeridos sean correctos.",
                        });
                }
                /* eslint-disable-next-line*/
                const codigo_ticket = uuidv4();

                const buffer = await qrcode.toBuffer(codigo_ticket, {
                  errorCorrectionLevel: "M",
                  version: 3,
                  margin: 4,
                  width: 150,
                  color: {
                      dark: "#000",
                      light: "#fff",
                  },
              });

              const resultado = await new Promise((resolve, reject) => {
                  cloudinary.uploader.upload_stream(
                      {
                          resource_type: "raw",
                          public_id: `qrCode`,
                          format: "png",
                      },
                      (error, result) => {
                          if (error) {
                              console.error("Error al cargar la imagen en Cloudinary:", error);
                              reject(error);
                          } else {
                              resolve(result);
                          }
                      }
                  ).end(buffer);
              });

                return {
                    ...ticket,
                    /* eslint-disable-next-line*/
                    id: codigo_ticket,
                    qrImage: resultado.secure_url,
                };
            })
        );
        newTickets = resultados;
        if (newTickets.length === tickets.length) {
        const createdTickets = await TicketsSold.bulkCreate(newTickets);
        if (createdTickets) {
          for (const ticket of newTickets) {
            const newTicket = await TicketsSold.findByPk(ticket.id, {
              include: [
                {
                  model: Ticket,
                  where: { id: ticket.ticketId },
                  attributes: ["name", "accessType"],
                },
                {
                  model: Event,
                  attributes: ["name"],
                },
              ],
            });
            const tanda = await Ticket.findByPk(ticket.ticketId);
            console.log(tanda.dataValues.reservation)
            if(tanda.dataValues.reservation>0){
              tanda.reservation = tanda.reservation - 1;
            }
                tanda.sells = tanda.sells +1;
                await tanda.save()
            await sendEmailWithQrCode(newTicket);
          }

            res.status(200).json(createdTickets);
        } else {
            res.status(400).json("Error al comprar los tickets");
        }}
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = PostTickets;