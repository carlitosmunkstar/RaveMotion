const qrcode = require("qrcode"); // generador de codigo qr
const { v4: uuidv4 } = require("uuid"); // generador de clave unica
const nodemailer = require("nodemailer"); // manejo y envio de mails
const fs = require("fs"); // manejo de carpetas y archivos
const cloudinary = require("cloudinary").v2; // carga de archivos en cloudinary
const tmp = require("tmp"); // generador de archivos temporales para cargar en cloudinary

const {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  NMAILER_PASSWORD,
  NMAILER_PARA_PRUEBAS,
  NMAILER_USER,
} = process.env;

//CLOUDINARY CONFIGURACION
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

//NODEMAILER config auth
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NMAILER_USER,
    pass: NMAILER_PASSWORD,
  },
  secure: true, //SSL protocolo de seguridad
  requireTLS: true, //TLS protocolo de seguridad
});

const qrManager = async(req,res)=> {
  try {

    // Generar un UUID único para cada ticket
    const codigo_ticket = uuidv4();

    // Generar el código QR usando la librería qrcode
    const buffer = await qrcode.toBuffer(codigo_ticket, {
      errorCorrectionLevel: "M",
      version: 3, //tamaño y capacidad de datos que contiene el codigo
      margin: 4,
      width: 150,
      color: {
        dark: "#000",
        light: "#fff",
      },
    });

    // Crear objeto para enviar el correo electrónico
    const mailOptions = {
      from: "NMAILER_USER",
      to: NMAILER_PARA_PRUEBAS,
      subject: "Su Codigo Qr ha sido generado",
      html: `<h2>Aquí está tu código QR:</h2>
    <p>Eat Sleep Rave Repeat<p>
    <p><b>con este codigo QR tendra acceso al evento</b><p>`,
      attachments: [
        {
          filename: "codigo_qr.png",
          content: buffer,
        },
      ],
    };

    // Enviar correo electrónico con el código QR como adjunto
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado con éxito:", info.response);

    // Crear archivo temporal para el código QR
    const archivo_temporal = tmp.fileSync();
    await fs.promises.writeFile(archivo_temporal.name, buffer);
    console.log(
      `El archivo ${archivo_temporal.name} se ha guardado correctamente!`
    );

    // Cargar el archivo en Cloudinary
    //--> NOS VA A SERVIR PARA QUE LA PERSONA SE BAJE EL TICKET DESDE LA PAGINA
    const resultado = await cloudinary.uploader.upload(archivo_temporal.name, {
      resource_type: "raw",
      public_id: "nombre_publico_del_archivo",
      format: "png",
    });

    console.log(resultado.secure_url);

    // Eliminar el archivo temporal
    archivo_temporal.removeCallback();

    res.status(200).json(resultado.secure_url);

  } catch (error) {
    console.error("Error al generar el código QR:", error);
    throw error;
  }
}
module.exports = qrManager;