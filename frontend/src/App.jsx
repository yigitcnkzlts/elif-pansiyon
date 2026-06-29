import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RoomsPage from './pages/RoomsPage';
import AmenitiesPage from './pages/AmenitiesPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import ReservationPage from './pages/ReservationPage';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/pansiyon')
      .then((res) => {
        if (!res.ok) throw new Error('Veri yüklenemedi');
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="error-screen">
        <h1>Bağlantı Hatası</h1>
        <p>{error}</p>
        <p className="error-hint">Backend sunucusunun çalıştığından emin olun.</p>
      </div>
    );
  }

  if (!data) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout data={data} />}>
          <Route index element={<HomePage data={data} />} />
          <Route path="hakkimizda" element={<AboutPage data={data} />} />
          <Route path="odalar" element={<RoomsPage data={data} />} />
          <Route path="rezervasyon" element={<ReservationPage data={data} />} />
          <Route path="olanaklar" element={<AmenitiesPage data={data} />} />
          <Route path="galeri" element={<GalleryPage data={data} />} />
          <Route path="yorumlar" element={<ReviewsPage data={data} />} />
          <Route path="iletisim" element={<ContactPage data={data} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
