const nodemailer = require('nodemailer');

const {
  NMAILER_PASSWORD,
  NMAILER_USER,
} = process.env;
/* eslint-disable-next-line*/
async function sendEmailWithQrCode(ticket) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: NMAILER_USER,
      pass: NMAILER_PASSWORD,
    },
    secure: true, // SSL protocolo de seguridad
    requireTLS: true, // TLS protocolo de seguridad
  });
  const qrCode = ticket.qrImage;
  const mailOptions = {
    from: 'NMAILER_USER',
    to: ticket.mail,
    subject: 'Su ticket esta listo',
    html: `<h1>${ticket.Event.dataValues.name}</h1>
  <h2>${ticket.Ticket.dataValues.name}</h2>
  <img src="${qrCode}" alt="qrCode"/> 
<p>con acceso: ${ticket.Ticket.dataValues.accessType}<p>
<p><b>Con este codigo QR unico tendra acceso al evento</b><p>
<h3><b>No reenvie o comparta su codigo.</b><h3>`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Correo electrónico enviado con éxito:', info.response);
}

module.exports = sendEmailWithQrCode;
