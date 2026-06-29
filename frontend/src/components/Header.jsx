import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Anasayfa' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/odalar', label: 'Odalar' },
  { to: '/olanaklar', label: 'Olanaklar' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/yorumlar', label: 'Yorumlar' },
  { to: '/iletisim', label: 'İletişim' },
];

export default function Header({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const headerClass = [
    'header',
    scrolled || !isHome ? 'header--scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClass}>
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          <span className="header__logo-mark">E</span>
          <span className="header__logo-text">{data.name}</span>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`header__link ${location.pathname === link.to ? 'header__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="header__cta header__cta--mobile">
            Ara
          </a>
        </nav>

        <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="header__cta">
          {data.phoneDisplay}
        </a>

        <button
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
