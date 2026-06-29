import { Link } from 'react-router-dom';

export default function Footer({ data }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">Elif Pansiyon</Link>
          <p>{data.tagline}</p>
        </div>
        <div className="footer__links">
          <Link to="/hakkimizda">Hakkımızda</Link>
          <Link to="/odalar">Odalar</Link>
          <Link to="/olanaklar">Olanaklar</Link>
          <Link to="/galeri">Galeri</Link>
          <Link to="/yorumlar">Yorumlar</Link>
          <Link to="/iletisim">İletişim</Link>
          <a
            href="https://yandex.com.tr/maps/org/elif_pansiyon/1053361552/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yandex Harita
          </a>
        </div>
        <div className="footer__contact">
          <a href={`tel:${data.phone.replace(/\s/g, '')}`}>{data.phoneDisplay}</a>
          <p>{data.address}</p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© {year} Elif Pansiyon. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
