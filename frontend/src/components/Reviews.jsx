import { useState, useEffect, useCallback } from 'react';

function Stars({ rating, interactive, onRate }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="stars" aria-label={interactive ? 'Puan verin' : `${rating} yıldız`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`stars__btn ${star <= (hover || rating) ? 'stars__filled' : 'stars__empty'}`}
          onClick={() => interactive && onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          disabled={!interactive}
          aria-label={`${star} yıldız`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewForm({ onSubmitted }) {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (rating === 0) {
      setStatus({ type: 'error', message: 'Lütfen yıldızlara tıklayarak puan verin.' });
      return;
    }

    if (text.trim().length < 10) {
      setStatus({ type: 'error', message: 'Yorum en az 10 karakter olmalıdır.' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, rating, text }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus({ type: 'success', message: result.message });
        setAuthor('');
        setRating(0);
        setText('');
        onSubmitted(result);
      } else {
        setStatus({ type: 'error', message: result.error || 'Yorum gönderilemedi.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Sunucuya bağlanılamadı. Backend çalışıyor mu kontrol edin.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form__title">Deneyiminizi Paylaşın</h3>
      <p className="review-form__desc">
        Elif Pansiyon'da konakladınız mı? Yorumunuz anında yayınlanır.
      </p>

      <label className={`review-form__label review-form__label--stars ${rating === 0 ? 'review-form__label--required' : ''}`}>
        Puanınız <span className="review-form__hint">(yıldızlara tıklayın)</span>
        <Stars rating={rating} interactive onRate={setRating} />
        {rating > 0 ? (
          <span className="review-form__rating-text">{rating} / 5 yıldız seçildi</span>
        ) : (
          <span className="review-form__rating-hint">Henüz puan vermediniz</span>
        )}
      </label>

      <label className="review-form__label">
        Adınız
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Adınız veya takma ad"
          required
          maxLength={50}
        />
      </label>

      <label className="review-form__label">
        Yorumunuz
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Konaklama deneyiminizi anlatın..."
          required
          rows={4}
          minLength={10}
          maxLength={500}
        />
        <span className="review-form__char-count">{text.length}/500</span>
      </label>

      {status && (
        <div className={`form-status form-status--${status.type}`}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        className="btn btn--primary review-form__submit"
        disabled={loading}
      >
        {loading ? 'Gönderiliyor...' : 'Yorumu Yayınla'}
      </button>
    </form>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReviews(data.reviews);
      setRating(data.rating);
      setReviewCount(data.reviewCount);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleNewReview = (result) => {
    setReviews(result.reviews);
    setRating(result.rating);
    setReviewCount(result.reviewCount);
  };

  if (loading) {
    return (
      <section className="reviews section" id="yorumlar">
        <div className="container reviews__loading">Yorumlar yükleniyor...</div>
      </section>
    );
  }

  return (
    <section className="reviews section" id="yorumlar">
      <div className="container">
        <div className="reviews__header">
          <div>
            <span className="section-label">Misafir Yorumları</span>
            <h2 className="section-title">Sizden Gelenler</h2>
          </div>
          <div className="reviews__score">
            <span className="reviews__score-value">{rating}</span>
            <Stars rating={Math.round(rating)} />
            <span className="reviews__score-count">{reviewCount} değerlendirme</span>
          </div>
        </div>

        <div className="reviews__layout">
          <ReviewForm onSubmitted={handleNewReview} />

          <div className="reviews__list">
            <h3 className="reviews__list-title">
              Tüm Yorumlar
              <span className="reviews__live-badge">Canlı</span>
            </h3>
            <div className="reviews__grid">
              {reviews.map((review) => (
                <blockquote
                  className={`review-card ${review.source === 'visitor' ? 'review-card--new' : ''}`}
                  key={`${review.source}-${review.id}`}
                >
                  {review.source === 'visitor' && (
                    <span className="review-card__badge">Yeni</span>
                  )}
                  <Stars rating={review.rating} />
                  <p className="review-card__text">"{review.text}"</p>
                  <footer className="review-card__footer">
                    <strong>{review.author}</strong>
                    <time>{review.date}</time>
                  </footer>
                </blockquote>
              ))}
            </div>
            {reviews.length === 0 && (
              <p className="reviews__empty">Henüz yorum yok. İlk yorumu siz yapın!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
