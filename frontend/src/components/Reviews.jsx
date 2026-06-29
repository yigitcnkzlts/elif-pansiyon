function Stars({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} yıldız`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'stars__filled' : 'stars__empty'}>★</span>
      ))}
    </div>
  );
}

export default function Reviews({ reviews, rating, reviewCount }) {
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
        <div className="reviews__grid">
          {reviews.map((review) => (
            <blockquote className="review-card" key={review.id}>
              <Stars rating={review.rating} />
              <p className="review-card__text">"{review.text}"</p>
              <footer className="review-card__footer">
                <strong>{review.author}</strong>
                <time>{review.date}</time>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
