import { Link } from 'react-router-dom';

export default function About({ data, preview }) {
  const years = data.about?.yearsOfService || 50;

  return (
    <section className="about section about--text-only" id="hakkimizda">
      <div className="container">
        <div className="about__content about__content--centered">
          <span className="section-label">1974'ten Beri</span>
          <h2 className="section-title">50 Yılı Aşkın Misafirperverlik</h2>
          <p className="about__text">{data.description}</p>
          <p className="about__text">
            1974 yılından bu yana Şarköy'ün kalbinde, denize yürüme mesafesinde
            nesilden nesile aktarılan misafirperverlik geleneğiyle hizmet veriyoruz.
          </p>
          <div className="about__highlights about__highlights--centered">
            <div className="about__highlight">
              <strong>{years}+</strong>
              <span>Yıllık Tecrübe</span>
            </div>
            <div className="about__highlight">
              <strong>{data.capacity.rooms}</strong>
              <span>Konforlu Oda</span>
            </div>
            <div className="about__highlight">
              <strong>{data.rating}★</strong>
              <span>Misafir Puanı</span>
            </div>
            <div className="about__highlight">
              <strong>7/24</strong>
              <span>Açık</span>
            </div>
          </div>
          {preview && (
            <Link to="/hakkimizda" className="btn btn--primary about__more-btn">
              Hikayemizi Keşfedin
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
