const nodemailer = require("nodemailer");

const sendEmail = async (recipient, subject, message) => {
  try {
    // Configura las opciones de transporte
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Usa el servicio de Gmail
      auth: {
        user: "torresfacundo.lt@gmail.com", // Reemplaza con tu correo electrónico de Gmail
        pass: "cwbocpbsnimnijhj", // Reemplaza con la contraseña de tu correo electrónico de Gmail
      },
    });

    // Configura las opciones de correo electrónico
    const mailOptions = {
      from: "your-email@example.com", // Reemplaza con tu correo electrónico de Gmail
      to: recipient,
      subject: subject,
      text: message,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log("Email enviado");
  } catch (error) {
    console.error("Error al enviar el correo electrónico: ", error.message);
  }
};

module.exports = sendEmail;
