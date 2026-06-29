import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';

function formatMoney(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(amount);
}

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function addDaysStr(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const capacityFilters = [
  { id: 'all', label: 'Tümü' },
  { id: 'available', label: 'Müsait odalar' },
  { id: '2', label: '2 Kişilik' },
  { id: '3', label: '3 Kişilik' },
  { id: '4', label: '4 Kişilik' },
];

export default function ReservationPage({ data }) {
  const [searchParams] = useSearchParams();
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || addDaysStr(todayStr(), 1));
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || addDaysStr(todayStr(), 4));
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 2);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [selectedId, setSelectedId] = useState(Number(searchParams.get('roomId')) || null);
  const [guestForm, setGuestForm] = useState({
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    notes: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [capacityFilter, setCapacityFilter] = useState('all');

  const filteredRooms = useMemo(() => {
    switch (capacityFilter) {
      case 'available':
        return rooms.filter((r) => r.isAvailableForDates);
      case '2':
      case '3':
      case '4':
        return rooms.filter((r) => r.capacity === Number(capacityFilter));
      default:
        return rooms;
    }
  }, [rooms, capacityFilter]);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === selectedId),
    [rooms, selectedId],
  );

  const searchRooms = async () => {
    setLoading(true);
    setSearchError(null);
    setSubmitStatus(null);
    setSearched(false);
    setCapacityFilter('all');

    try {
      const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests) });
      const res = await fetch(`/api/reservations/search?${params}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Arama başarısız');
      setRooms(result.rooms);
      setSearched(true);
      if (selectedId && !result.rooms.some((r) => r.id === selectedId)) {
        setSelectedId(null);
      }
    } catch (err) {
      setSearchError(err.message);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRoom) return;

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomTypeId: selectedRoom.id,
          checkIn,
          checkOut,
          guests,
          ...guestForm,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Rezervasyon gönderilemedi');

      setSubmitStatus({ type: 'success', message: result.message });
      setSelectedId(null);
      setGuestForm({ guestName: '', guestPhone: '', guestEmail: '', notes: '' });
      searchRooms();
    } catch (err) {
      setSubmitStatus({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title="Online Rezervasyon"
        subtitle="Tarih seçin, anlık fiyatı görün ve talebinizi gönderin"
        image={data.rooms[1]?.image}
      />

      <section className="reservation section">
        <div className="container">
          <div className="reservation-search card-panel">
            <h2 className="reservation-search__title">1. Tarih ve kişi sayısı</h2>
            <div className="reservation-search__grid">
              <label className="reservation-field">
                <span>Giriş tarihi</span>
                <input
                  type="date"
                  value={checkIn}
                  min={todayStr()}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) {
                      setCheckOut(addDaysStr(e.target.value, 1));
                    }
                  }}
                />
              </label>
              <label className="reservation-field">
                <span>Çıkış tarihi</span>
                <input
                  type="date"
                  value={checkOut}
                  min={addDaysStr(checkIn, 1)}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </label>
              <label className="reservation-field">
                <span>Kişi sayısı</span>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} kişi</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="btn btn--primary reservation-search__btn"
                onClick={searchRooms}
                disabled={loading}
              >
                {loading ? 'Hesaplanıyor…' : 'Müsait odaları ve fiyatları göster'}
              </button>
            </div>
            {searchError && <p className="reservation-alert reservation-alert--error">{searchError}</p>}
            <p className="reservation-search__hint">
              Temmuz–Ağustos yüksek sezon; Cuma ve Cumartesi geceleri ek ücret uygulanır.
            </p>
          </div>

          {searched && (
            <div className="reservation-results">
              {rooms.length > 0 && (
                <div className="reservation-filters reservation-filters--standalone">
                  {capacityFilters.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      className={`reservation-filters__btn ${capacityFilter === filter.id ? 'reservation-filters__btn--active' : ''}`}
                      onClick={() => setCapacityFilter(filter.id)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}

              {rooms.length === 0 ? (
                <p className="reservation-results__empty">Bu tarihler için sonuç bulunamadı.</p>
              ) : filteredRooms.length === 0 ? (
                <p className="reservation-results__empty">Bu filtreye uygun oda bulunamadı.</p>
              ) : (
                <>
                  <p className="reservation-results__count">
                    {filteredRooms.length} oda tipi
                    {capacityFilter === 'available'
                      ? ` · ${filteredRooms.filter((r) => r.isAvailableForDates).length} müsait`
                      : ''}
                  </p>
                  <div className="reservation-rooms">
                  {filteredRooms.map((room) => (
                    <article
                      key={room.id}
                      className={`reservation-room card-panel ${!room.isAvailableForDates ? 'reservation-room--disabled' : ''} ${selectedId === room.id ? 'reservation-room--selected' : ''}`}
                    >
                      <div className="reservation-room__media">
                        <img src={room.image} alt={room.name} loading="lazy" />
                      </div>
                      <div className="reservation-room__body">
                        <div className="reservation-room__head">
                          <h3>{room.name}</h3>
                          <span className="reservation-room__capacity">{room.capacity} kişilik</span>
                        </div>
                        <p className="reservation-room__desc">{room.description}</p>
                        <div className="reservation-room__price">
                          <strong>{formatMoney(room.quote.total)}</strong>
                          <span>
                            {room.quote.nightCount} gece · ort. {formatMoney(room.quote.averagePerNight)}/gece
                          </span>
                        </div>
                        {!room.isAvailableForDates ? (
                          <p className="reservation-room__unavailable">{room.unavailableReason}</p>
                        ) : (
                          <button
                            type="button"
                            className="btn btn--outline"
                            onClick={() => setSelectedId(room.id === selectedId ? null : room.id)}
                          >
                            {selectedId === room.id ? 'Seçimi kaldır' : 'Bu odayı seç'}
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
                </>
              )}
            </div>
          )}

          {selectedRoom && (
            <div className="reservation-checkout card-panel">
              <h2 className="reservation-checkout__title">3. Bilgileriniz ve özet</h2>
              <div className="reservation-checkout__grid">
                <div className="reservation-summary">
                  <h3>{selectedRoom.name}</h3>
                  <p>{checkIn} → {checkOut} · {guests} kişi</p>
                  <ul className="reservation-breakdown">
                    {selectedRoom.quote.breakdown.map((night) => (
                      <li key={night.date}>
                        <span>
                          {night.label}
                          <small>{night.season}{night.isWeekend ? ' · H.sonu' : ''}</small>
                        </span>
                        <strong>{formatMoney(night.price)}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="reservation-summary__total">
                    <span>Toplam</span>
                    <strong>{formatMoney(selectedRoom.quote.total)}</strong>
                  </div>
                  <p className="reservation-summary__note">
                    Ödeme şu an online alınmaz. Talebiniz onaylandıktan sonra telefonla bilgilendirilirsiniz.
                  </p>
                </div>

                <form className="reservation-form" onSubmit={handleSubmit}>
                  <label>
                    Ad Soyad *
                    <input
                      required
                      value={guestForm.guestName}
                      onChange={(e) => setGuestForm({ ...guestForm, guestName: e.target.value })}
                    />
                  </label>
                  <label>
                    Telefon *
                    <input
                      required
                      type="tel"
                      value={guestForm.guestPhone}
                      onChange={(e) => setGuestForm({ ...guestForm, guestPhone: e.target.value })}
                    />
                  </label>
                  <label>
                    E-posta
                    <input
                      type="email"
                      value={guestForm.guestEmail}
                      onChange={(e) => setGuestForm({ ...guestForm, guestEmail: e.target.value })}
                    />
                  </label>
                  <label>
                    Not (isteğe bağlı)
                    <textarea
                      rows={3}
                      value={guestForm.notes}
                      onChange={(e) => setGuestForm({ ...guestForm, notes: e.target.value })}
                    />
                  </label>
                  {submitStatus && (
                    <p className={`reservation-alert reservation-alert--${submitStatus.type}`}>
                      {submitStatus.message}
                    </p>
                  )}
                  <button type="submit" className="btn btn--primary" disabled={submitting}>
                    {submitting ? 'Gönderiliyor…' : 'Rezervasyon talebi gönder'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
