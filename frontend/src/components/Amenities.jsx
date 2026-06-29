const icons = {
  wifi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  tv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="15" rx="2" />
      <path d="M17 2l-5 5-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  shower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fridge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M4 10h16M10 6v2M10 14v4" strokeLinecap="round" />
    </svg>
  ),
  garden: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22V12M12 12C12 7 7 3 2 3c0 5 4 9 10 9M12 12c0-5 5-9 10-9 0 5-4 9-10 9M7 22c0-3 2-5 5-5s5 2 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function Amenities({ amenities }) {
  return (
    <section className="amenities section" id="olanaklar">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-label">Olanaklar</span>
          <h2 className="section-title">Konforunuz İçin Her Şey</h2>
        </div>
        <div className="amenities__grid">
          {amenities.map((item, index) => (
            <div className="amenity-card" key={item.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <div className="amenity-card__icon">{icons[item.icon]}</div>
              <h3 className="amenity-card__title">{item.title}</h3>
              <p className="amenity-card__desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
