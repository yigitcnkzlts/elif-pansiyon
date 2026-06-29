import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pricingPath = join(__dirname, '..', 'data', 'pricing.json');

let pricingConfig;

function getPricingConfig() {
  if (!pricingConfig) {
    pricingConfig = JSON.parse(readFileSync(pricingPath, 'utf-8'));
  }
  return pricingConfig;
}

export function parseDateOnly(str) {
  const [y, m, d] = String(str).split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateTr(date) {
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

export function getStayNights(checkIn, checkOut) {
  const start = parseDateOnly(checkIn);
  const end = parseDateOnly(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return [];
  }
  const nights = [];
  const cur = new Date(start);
  while (cur < end) {
    nights.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return nights;
}

function getSeasonForDate(date, config) {
  const month = date.getMonth() + 1;
  return config.seasons.find((s) => s.months.includes(month)) || config.seasons[1];
}

function getNightPrice(basePrice, date, config) {
  const season = getSeasonForDate(date, config);
  let price = Math.round(basePrice * season.multiplier);
  const day = date.getDay();
  if (config.weekendDays.includes(day)) {
    price = Math.round(price * (1 + config.weekendSurchargePercent / 100));
  }
  return { price, season: season.label, isWeekend: config.weekendDays.includes(day) };
}

export function calculateStayQuote(basePricePerNight, checkIn, checkOut) {
  const config = getPricingConfig();
  const nights = getStayNights(checkIn, checkOut);

  if (nights.length === 0) {
    return null;
  }

  const breakdown = nights.map((date) => {
    const { price, season, isWeekend } = getNightPrice(basePricePerNight, date, config);
    return {
      date: date.toISOString().slice(0, 10),
      label: formatDateTr(date),
      price,
      season,
      isWeekend,
    };
  });

  const total = breakdown.reduce((sum, n) => sum + n.price, 0);
  const nightCount = breakdown.length;

  return {
    currency: config.currency,
    nightCount,
    total,
    averagePerNight: Math.round(total / nightCount),
    breakdown,
  };
}

export function validateStayDates(checkIn, checkOut) {
  const nights = getStayNights(checkIn, checkOut);
  if (nights.length === 0) {
    return 'Geçerli giriş ve çıkış tarihi seçin. Çıkış tarihi girişten sonra olmalıdır.';
  }
  if (nights.length > 30) {
    return 'Tek seferde en fazla 30 gece rezervasyon yapılabilir.';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parseDateOnly(checkIn) < today) {
    return 'Giriş tarihi bugünden önce olamaz.';
  }

  return null;
}

export function getPricingRules() {
  return getPricingConfig();
}
