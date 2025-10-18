// mailer.js
import nodemailer from "nodemailer";

// Создаём и экспортируем функцию для отправки писем
export async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
    html, // можно передавать HTML-разметку
  });
}