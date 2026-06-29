import { Link } from 'react-router-dom';

export default function Hero({ data }) {
  return (
    <section className="hero" id="anasayfa">
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${data.heroImage})` }}
      />
      <div className="hero__overlay" />
      <div className="hero__content container">
        <p className="hero__eyebrow">Şarköy · Tekirdağ</p>
        <h1 className="hero__title">{data.name}</h1>
        <p className="hero__tagline">{data.tagline}</p>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">{data.rating}</span>
            <span className="hero__stat-label">Puan</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">{data.capacity.rooms}</span>
            <span className="hero__stat-label">Oda</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">{data.capacity.beds}</span>
            <span className="hero__stat-label">Yatak</span>
          </div>
        </div>
        <div className="hero__actions">
          <Link to="/iletisim" className="btn btn--primary">Rezervasyon</Link>
          <Link to="/odalar" className="btn btn--outline">Odaları İncele</Link>
        </div>
      </div>
      <div className="hero__scroll">
        <span>Keşfet</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
