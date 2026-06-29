import { useState } from 'react';

export default function Gallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="gallery section section--alt" id="galeri">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Galeri</span>
          <h2 className="section-title">Anlarımız</h2>
        </div>
        <div className="gallery__grid">
          {images.map((src, index) => (
            <button
              key={src}
              className={`gallery__item ${index === 0 ? 'gallery__item--large' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Fotoğraf ${index + 1}`}
            >
              <img src={src} alt={`Elif Pansiyon ${index + 1}`} loading="lazy" />
              <div className="gallery__item-overlay">
                <span>Büyüt</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div className="lightbox" onClick={() => setActiveIndex(null)}>
          <button className="lightbox__close" aria-label="Kapat">×</button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex - 1 + images.length) % images.length); }}
            aria-label="Önceki"
          >
            ‹
          </button>
          <img src={images[activeIndex]} alt="Büyük görünüm" className="lightbox__image" onClick={(e) => e.stopPropagation()} />
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex + 1) % images.length); }}
            aria-label="Sonraki"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
