# Elif Pansiyon Web Sitesi

Elif Pansiyon için modern full-stack web sitesi.

## Yerel Kurulum

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (yeni terminal)
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Vercel'e Deploy

### 1. Vercel hesabı
[vercel.com](https://vercel.com) üzerinden GitHub ile giriş yapın.

### 2. Projeyi bağla
1. **Add New Project** → `yigitcnkzlts/elif-pansiyon` reposunu seçin
2. Framework Preset: **Other**
3. Root Directory: `.` (kök dizin)
4. Build Command: `cd frontend && npm run build` (vercel.json otomatik ayarlar)
5. Output Directory: `frontend/dist`
6. **Deploy** butonuna tıklayın

### 3. CLI ile deploy (alternatif)

```bash
npm i -g vercel
cd d:\elifpansiyon
vercel login
vercel --prod
```

Deploy sonrası site `https://elif-pansiyon.vercel.app` gibi bir adreste yayında olur.

### Notlar
- Frontend + API aynı Vercel projesinde çalışır (`/api/*` rotaları)
- React Router için SPA yönlendirmesi `vercel.json` içinde tanımlı
- Yorum ve mesaj kayıtları Vercel'de geçici depolanır (kalıcı DB sonraki aşamada)

## Özellikler

- React + Vite frontend
- Express.js backend API
- Mobil uyumlu responsive tasarım
- Oda doluluk durumu (boş/dolu)
- Canlı misafir yorumları
- İletişim formu
- Yandex Harita entegrasyonu

## Bilgiler

Kaynak: [Yandex Haritalar - Elif Pansiyon](https://yandex.com.tr/maps/org/elif_pansiyon/1053361552/)
