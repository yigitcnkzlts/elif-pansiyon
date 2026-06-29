import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/odalar', label: 'Odalar' },
  { to: '/rezervasyon', label: 'Rezervasyon' },
  { to: '/olanaklar', label: 'Olanaklar' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/yorumlar', label: 'Yorumlar' },
  { to: '/iletisim', label: 'İletişim' },
];

const mapUrl = 'https://yandex.com.tr/maps/org/elif_pansiyon/1053361552/';

export default function Footer({ data }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">Elif Pansiyon</Link>
          <p className="footer__tagline">{data.tagline}</p>
          <p className="footer__hours">{data.hours}</p>
        </div>

        <nav className="footer__nav" aria-label="Site menüsü">
          <h3 className="footer__heading">Sayfalar</h3>
          <ul className="footer__nav-grid">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="footer__map-link">
                Yandex Harita
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__contact">
          <h3 className="footer__heading">İletişim</h3>
          <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="footer__phone">
            {data.phoneDisplay}
          </a>
          <p className="footer__address">{data.address}</p>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="footer__map-btn">
            Haritada aç →
          </a>
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
