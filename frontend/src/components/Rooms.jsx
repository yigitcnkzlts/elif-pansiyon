import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const filters = [
  { id: 'all', label: 'Tümü' },
  { id: 'available', label: 'Boş Odalar' },
  { id: 'full', label: 'Dolu Odalar' },
  { id: '2', label: '2 Kişilik' },
  { id: '3', label: '3 Kişilik' },
  { id: '4', label: '4 Kişilik' },
  { id: 'ac', label: 'Klimalı' },
  { id: 'no-ac', label: 'Klimasız' },
];

export default function Rooms({ rooms, availability }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRooms = useMemo(() => {
    let result = rooms;

    switch (activeFilter) {
      case 'available':
        result = result.filter((r) => r.isAvailable);
        break;
      case 'full':
        result = result.filter((r) => !r.isAvailable);
        break;
      case '2':
      case '3':
      case '4':
        result = result.filter((r) => r.capacity === Number(activeFilter));
        break;
      case 'ac':
        result = result.filter((r) => r.ac);
        break;
      case 'no-ac':
        result = result.filter((r) => !r.ac);
        break;
      default:
        break;
    }

    return result;
  }, [rooms, activeFilter]);

  const stats = availability || {
    totalRooms: rooms.reduce((s, r) => s + (r.total || 0), 0),
    availableRooms: rooms.reduce((s, r) => s + (r.available || 0), 0),
    occupiedRooms: rooms.reduce((s, r) => s + (r.occupied || 0), 0),
  };

  return (
    <section className="rooms section section--alt" id="odalar">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Konaklama</span>
          <h2 className="section-title">Odalarımız</h2>
          <p className="section-desc">
            Anlık oda durumunu görüntüleyin. Yakında online rezervasyon ve ödeme sistemi aktif olacak.
          </p>
        </div>

        <div className="rooms-availability">
          <div className="rooms-availability__card rooms-availability__card--available">
            <span className="rooms-availability__value">{stats.availableRooms}</span>
            <span className="rooms-availability__label">Boş Oda</span>
          </div>
          <div className="rooms-availability__card rooms-availability__card--occupied">
            <span className="rooms-availability__value">{stats.occupiedRooms}</span>
            <span className="rooms-availability__label">Dolu Oda</span>
          </div>
          <div className="rooms-availability__card rooms-availability__card--total">
            <span className="rooms-availability__value">{stats.totalRooms}</span>
            <span className="rooms-availability__label">Toplam Oda</span>
          </div>
          <div className="rooms-availability__bar">
            <div className="rooms-availability__bar-label">
              <span>Doluluk Oranı</span>
              <strong>{stats.occupancyRate ?? Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}%</strong>
            </div>
            <div className="rooms-availability__bar-track">
              <div
                className="rooms-availability__bar-fill"
                style={{ width: `${stats.occupancyRate ?? Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rooms__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`rooms__filter ${activeFilter === filter.id ? 'rooms__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="rooms__count">
          {filteredRooms.length} oda tipi · {filteredRooms.reduce((s, r) => s + r.available, 0)} müsait oda
        </p>

        <div className="rooms__grid">
          {filteredRooms.map((room, index) => (
            <article
              className={`room-card ${!room.isAvailable ? 'room-card--full' : ''}`}
              key={room.id}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="room-card__image">
                <img src={room.image} alt={room.name} loading="lazy" />
                <div className="room-card__overlay" />
                <div className="room-card__badges">
                  <span className={`room-card__status ${room.isAvailable ? 'room-card__status--available' : 'room-card__status--full'}`}>
                    {room.isAvailable ? 'Müsait' : 'Dolu'}
                  </span>
                  <span className="room-card__badge">{room.capacity} Kişilik</span>
                  <span className={`room-card__badge ${room.ac ? 'room-card__badge--ac' : 'room-card__badge--no-ac'}`}>
                    {room.ac ? 'Klimalı' : 'Klimasız'}
                  </span>
                </div>
              </div>
              <div className="room-card__body">
                <h3 className="room-card__title">{room.name}</h3>
                <div className="room-card__inventory">
                  <span className="room-card__inventory-item room-card__inventory-item--available">
                    <strong>{room.available}</strong> Boş
                  </span>
                  <span className="room-card__inventory-divider">/</span>
                  <span className="room-card__inventory-item room-card__inventory-item--occupied">
                    <strong>{room.occupied}</strong> Dolu
                  </span>
                  <span className="room-card__inventory-total">
                    ({room.total} oda)
                  </span>
                </div>
                <p className="room-card__desc">{room.description}</p>
                <ul className="room-card__features">
                  {room.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                {room.isAvailable ? (
                  <Link to="/iletisim" className="room-card__link" state={{ roomId: room.id, roomName: room.name }}>
                    Rezervasyon Yap →
                  </Link>
                ) : (
                  <span className="room-card__link room-card__link--disabled">
                    Şu An Müsait Değil
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <p className="rooms__empty">Bu filtreye uygun oda bulunamadı.</p>
        )}

        <div className="rooms__coming-soon">
          <span className="rooms__coming-soon-badge">Yakında</span>
          <p>Online rezervasyon ve güvenli ödeme sistemi çok yakında hizmetinizde.</p>
        </div>
      </div>
    </section>
  );
}
