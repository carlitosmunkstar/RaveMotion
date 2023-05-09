const nodemailer = require("nodemailer");

const sendEmail = async (recipient, subject, message) => {
  try {
    // Configura las opciones de transporte
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com", // Reemplaza con el host de tu proveedor de correo
      port: 587, // El puerto a utilizar, verifica la documentación de tu proveedor
      secure: false, // Si el puerto es 465, cambia a true, de lo contrario déjalo en false
      auth: {
        user: "your-email@example.com", // Reemplaza con tu correo electrónico
        pass: "your-email-password", // Reemplaza con la contraseña de tu correo electrónico
      },
    });

    // Configura las opciones de correo electrónico
    const mailOptions = {
      from: "your-email@example.com", // Reemplaza con tu correo electrónico
      to: recipient,
      subject: subject,
      text: message,
    };

   
    await transporter.sendMail(mailOptions);
    console.log("Email enviado");
  } catch (error) {
    console.error("Error al enviar el correo electrónico: ", error.message);
  }
};

module.exports = sendEmail;
