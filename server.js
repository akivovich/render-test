import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config"; // подключаем .env
import { sendEmail } from "./mailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Маршрут для отправки email
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    await sendEmail({ to, subject, text, html });
    res.json({ success: true, message: "Email отправлен!" });
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    res.status(500).json({ success: false, error: "Не удалось отправить письмо" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));