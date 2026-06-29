import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { enrichRoomTypes, getAvailabilitySummary } from './services/rooms.js';
import { getAllReviews, addUserReview } from './services/reviews.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = join(__dirname, 'data', 'pansiyon.json');

function dataFile(name) {
  if (process.env.VERCEL) {
    return join('/tmp', name);
  }
  return join(__dirname, 'data', name);
}

function loadPansiyon() {
  return JSON.parse(readFileSync(dataPath, 'utf-8'));
}

function loadJson(name) {
  const path = dataFile(name);
  if (!existsSync(path)) return [];
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function saveJson(name, data) {
  writeFileSync(dataFile(name), JSON.stringify(data, null, 2));
}

app.get('/api/pansiyon', (_req, res) => {
  const data = loadPansiyon();
  const summary = getAvailabilitySummary(data.rooms);
  res.json({
    ...data,
    rooms: summary.roomTypes,
    availability: {
      totalRooms: summary.totalRooms,
      occupiedRooms: summary.occupiedRooms,
      availableRooms: summary.availableRooms,
      occupancyRate: summary.occupancyRate,
    },
  });
});

app.get('/api/rooms', (_req, res) => {
  const data = loadPansiyon();
  res.json(enrichRoomTypes(data.rooms));
});

app.get('/api/rooms/availability', (_req, res) => {
  const data = loadPansiyon();
  res.json(getAvailabilitySummary(data.rooms));
});

app.get('/api/reviews', (_req, res) => {
  const data = loadPansiyon();
  res.json(getAllReviews(data.reviews));
});

app.post('/api/reviews', (req, res) => {
  const { author, rating, text } = req.body;

  if (!author?.trim() || !text?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Ad ve yorum alanları zorunludur.',
    });
  }

  const numRating = Number(rating);
  if (!numRating || numRating < 1 || numRating > 5) {
    return res.status(400).json({
      success: false,
      error: 'Lütfen 1 ile 5 arasında puan verin.',
    });
  }

  if (text.trim().length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Yorum en az 10 karakter olmalıdır.',
    });
  }

  const review = addUserReview({ author, rating: numRating, text });
  const data = loadPansiyon();
  const all = getAllReviews(data.reviews);

  res.status(201).json({
    success: true,
    message: 'Yorumunuz yayınlandı. Teşekkür ederiz!',
    review,
    rating: all.rating,
    reviewCount: all.reviewCount,
    reviews: all.reviews,
  });
});

app.get('/api/reservations', (_req, res) => {
  res.json(loadJson('reservations.json'));
});

app.post('/api/reservations', (req, res) => {
  const { roomTypeId, guestName, guestPhone, guestEmail, checkIn, checkOut, guests } = req.body;

  if (!roomTypeId || !guestName || !guestPhone || !checkIn || !checkOut) {
    return res.status(400).json({
      success: false,
      error: 'Oda tipi, ad, telefon, giriş ve çıkış tarihi zorunludur.',
    });
  }

  const data = loadPansiyon();
  const roomType = enrichRoomTypes(data.rooms).find((r) => r.id === Number(roomTypeId));

  if (!roomType) {
    return res.status(404).json({ success: false, error: 'Oda tipi bulunamadı.' });
  }

  if (!roomType.isAvailable) {
    return res.status(409).json({
      success: false,
      error: 'Bu oda tipinde müsait oda bulunmuyor.',
    });
  }

  const reservation = {
    id: Date.now(),
    roomTypeId: Number(roomTypeId),
    roomTypeName: roomType.name,
    guestName,
    guestPhone,
    guestEmail: guestEmail || '',
    checkIn,
    checkOut,
    guests: guests || roomType.capacity,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: new Date().toISOString(),
  };

  const reservations = loadJson('reservations.json');
  reservations.push(reservation);
  saveJson('reservations.json', reservations);

  res.status(201).json({
    success: true,
    message: 'Rezervasyon talebiniz alındı. Onay için sizinle iletişime geçeceğiz.',
    reservation,
  });
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

  const messages = loadJson('messages.json');
  messages.push(entry);
  saveJson('messages.json', messages);

  res.json({
    success: true,
    message: 'Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.',
  });
});

export default app;
