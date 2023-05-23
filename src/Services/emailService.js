const nodemailer = require('nodemailer');

const sendEmail = async (recipient, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'torresfacundo.lt@gmail.com',
        pass: 'cwbocpbsnimnijhj',
      },
    });


    const mailOptions = {
      from: 'your-email@example.com',
      to: recipient,
      subject: subject,
      html: message,
    };


    await transporter.sendMail(mailOptions);
    console.log('Email enviado');
  } catch (error) {
    console.error('Error al enviar el correo electrónico: ', error.message);
  }
};

module.exports = sendEmail;
