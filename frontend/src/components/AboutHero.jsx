export default function AboutHero({ data, about }) {
  const currentYear = new Date().getFullYear();

  const stats = [
    { value: `${about.yearsOfService}+`, label: 'Yıllık Deneyim' },
    { value: data.capacity.rooms, label: 'Konforlu Oda' },
    { value: data.rating, label: 'Misafir Puanı' },
    { value: '7/24', label: 'Kesintisiz Hizmet' },
  ];

  return (
    <section className="about-hero">
      <div className="about-hero__bg-gradient" />

      {/* Arka plan büyük yazılar */}
      <div className="about-hero__watermark" aria-hidden="true">
        <span className="about-hero__watermark-year">1974</span>
        <span className="about-hero__watermark-big">50</span>
        <span className="about-hero__watermark-text">HAKKIMIZDA</span>
      </div>

      <div className="container about-hero__inner">
        <div className="about-hero__main">
          <span className="about-hero__eyebrow">{about.foundedYear} — {currentYear}</span>
          <h1 className="about-hero__title">Hakkımızda</h1>
          <p className="about-hero__tagline">
            1974'ten bu yana Şarköy'ün kalbinde, denize yakın huzur dolu bir konaklama
          </p>

          <div className="about-hero__heritage">
            <h2 className="about-hero__heritage-title">{about.heritageTitle}</h2>
            <p className="about-hero__heritage-sub">{about.heritageSubtitle}</p>
          </div>
        </div>

        <div className="about-hero__stats">
          {stats.map((stat) => (
            <div className="about-hero__stat" key={stat.label}>
              <span className="about-hero__stat-value">{stat.value}</span>
              <span className="about-hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
