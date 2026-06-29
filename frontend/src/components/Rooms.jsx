import { Link } from 'react-router-dom';

export default function Rooms({ rooms }) {
  return (
    <section className="rooms section section--alt" id="odalar">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Konaklama</span>
          <h2 className="section-title">Odalarımız</h2>
          <p className="section-desc">
            Her bütçeye ve ihtiyaca uygun, konforlu odalarımızda unutulmaz bir konaklama deneyimi yaşayın.
          </p>
        </div>
        <div className="rooms__grid">
          {rooms.map((room, index) => (
            <article className="room-card" key={room.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="room-card__image">
                <img src={room.image} alt={room.name} loading="lazy" />
                <div className="room-card__overlay" />
              </div>
              <div className="room-card__body">
                <h3 className="room-card__title">{room.name}</h3>
                <p className="room-card__desc">{room.description}</p>
                <ul className="room-card__features">
                  {room.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link to="/iletisim" className="room-card__link">
                  Bilgi Al →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
