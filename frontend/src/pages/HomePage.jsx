import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';

export default function HomePage({ data }) {
  return (
    <>
      <Hero data={data} />
      <About data={data} preview />
      <section className="home-preview section section--alt">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Keşfedin</span>
            <h2 className="section-title">Elif Pansiyon'u Tanıyın</h2>
          </div>
          <div className="home-preview__grid">
            <Link to="/hakkimizda" className="home-preview__card">
              <span className="home-preview__icon">🏠</span>
              <h3>Hakkımızda</h3>
              <p>Şarköy'deki hikayemizi ve misyonumuzu keşfedin.</p>
              <span className="home-preview__link">Sayfaya Git →</span>
            </Link>
            <Link to="/odalar" className="home-preview__card">
              <span className="home-preview__icon">🛏️</span>
              <h3>Odalar</h3>
              <p>Konforlu odalarımızı inceleyin.</p>
              <span className="home-preview__link">Sayfaya Git →</span>
            </Link>
            <Link to="/olanaklar" className="home-preview__card">
              <span className="home-preview__icon">✨</span>
              <h3>Olanaklar</h3>
              <p>Wi-Fi, TV, bahçe ve daha fazlası.</p>
              <span className="home-preview__link">Sayfaya Git →</span>
            </Link>
            <Link to="/iletisim" className="home-preview__card">
              <span className="home-preview__icon">📞</span>
              <h3>İletişim</h3>
              <p>Rezervasyon ve bilgi için bize ulaşın.</p>
              <span className="home-preview__link">Sayfaya Git →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
