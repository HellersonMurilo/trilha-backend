require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

// Configuração do transporte usando Gmail com SSL
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Função para ler o template HTML
const getTemplate = (templateName) => {
  const templatePath = path.join(__dirname, '../../emails/template', templateName);
  return fs.readFileSync(templatePath, 'utf-8');
};

// Função para enviar o e-mail com HTML
exports.sendEmail = async (to, subject, htmlTemplate, replacements) => { 
  // Substituir as variáveis no template HTML
  let htmlContent = getTemplate(htmlTemplate);
  for (let key in replacements) {
    htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Não foi possível enviar o email");
  }
};
