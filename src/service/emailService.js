require("dotenv").config();
const nodemailer = require("nodemailer");

// Configuração do transporte usando Gmail com SSL
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true, // true para SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Adicione esta linha se você encontrar problemas com certificados
  },
});

// Função para enviar o e-mail
exports.sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Não foi possível enviar o email");
  }
};
