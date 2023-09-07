const nodemailer = require("nodemailer");

// Configura el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // Cambia a tu proveedor de correo electrónico
  auth: {
    user: "drymixnoresponder@gmail.com", // Tu dirección de correo electrónico
    pass: "Drymix2023", // Tu contraseña
  },
});

module.exports = transporter;
