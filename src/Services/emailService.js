const nodemailer = require('nodemailer');
const { NMAILER_PASSWORD, NMAILER_USER } = process.env;
const sendEmail = async (recipient, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NMAILER_USER,
        pass: NMAILER_PASSWORD,
      },
    });


    const mailOptions = {
      from: NMAILER_USER,
      to: recipient,
      subject: subject,
      html: message,
    };


    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error('Error al enviar el correo electrónico: ', error.message);
  }
};

module.exports = sendEmail;