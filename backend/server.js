import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dataPath = join(__dirname, 'data', 'pansiyon.json');
const messagesPath = join(__dirname, 'data', 'messages.json');

function loadPansiyon() {
  return JSON.parse(readFileSync(dataPath, 'utf-8'));
}

function loadMessages() {
  if (!existsSync(messagesPath)) return [];
  return JSON.parse(readFileSync(messagesPath, 'utf-8'));
}

function saveMessages(messages) {
  writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
}

app.get('/api/pansiyon', (_req, res) => {
  res.json(loadPansiyon());
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message, checkIn, checkOut } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      error: 'Ad, telefon ve mesaj alanları zorunludur.',
    });
  }

  const entry = {
    id: Date.now(),
    name,
    email: email || '',
    phone,
    message,
    checkIn: checkIn || '',
    checkOut: checkOut || '',
    createdAt: new Date().toISOString(),
  };

  const messages = loadMessages();
  messages.push(entry);
  saveMessages(messages);

  res.json({
    success: true,
    message: 'Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.',
  });
});

app.listen(PORT, () => {
  console.log(`Elif Pansiyon API çalışıyor: http://localhost:${PORT}`);
});
