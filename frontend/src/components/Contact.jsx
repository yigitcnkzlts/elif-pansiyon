import { useState } from 'react';

export default function Contact({ data }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', checkIn: '', checkOut: '', message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setForm({ name: '', email: '', phone: '', checkIn: '', checkOut: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.error });
      }
    } catch {
      setStatus({ type: 'error', message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setLoading(false);
    }
  };

  const mapUrl = `https://yandex.com.tr/maps/?ll=${data.coordinates.lng}%2C${data.coordinates.lat}&z=16&pt=${data.coordinates.lng},${data.coordinates.lat},pm2rdm`;

  return (
    <section className="contact section section--alt" id="iletisim">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-label">İletişim</span>
          <h2 className="section-title">Rezervasyon & Bilgi</h2>
        </div>
        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__card">
              <div className="contact__card-icon">📍</div>
              <div>
                <h3>Adres</h3>
                <p>{data.address}</p>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="contact__link">
                  Haritada Gör →
                </a>
              </div>
            </div>
            <div className="contact__card">
              <div className="contact__card-icon">📞</div>
              <div>
                <h3>Telefon</h3>
                <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="contact__phone">
                  {data.phoneDisplay}
                </a>
                <p className="contact__hours">{data.hours}</p>
              </div>
            </div>
            <div className="contact__map">
              <iframe
                title="Elif Pansiyon Konum"
                src={`https://yandex.com.tr/map-widget/v1/?ll=${data.coordinates.lng}%2C${data.coordinates.lat}&z=16&pt=${data.coordinates.lng},${data.coordinates.lat},pm2rdm`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <h3 className="contact__form-title">Bize Ulaşın</h3>
            <div className="form-row">
              <label>
                Ad Soyad *
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Adınız Soyadınız" />
              </label>
              <label>
                Telefon *
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="05XX XXX XX XX" />
              </label>
            </div>
            <label>
              E-posta
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ornek@email.com" />
            </label>
            <div className="form-row">
              <label>
                Giriş Tarihi
                <input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} />
              </label>
              <label>
                Çıkış Tarihi
                <input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} />
              </label>
            </div>
            <label>
              Mesajınız *
              <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Rezervasyon veya sorularınız..." />
            </label>
            {status && (
              <div className={`form-status form-status--${status.type}`}>
                {status.message}
              </div>
            )}
            <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
              {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
