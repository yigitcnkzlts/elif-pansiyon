import app from './app.js';

const PORT = process.env.PORT || 3001;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Elif Pansiyon API çalışıyor: http://localhost:${PORT}`);
  });
}

export default app;
