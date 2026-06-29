import { Link } from 'react-router-dom';
import AboutHero from '../components/AboutHero';
import AboutStory from '../components/AboutStory';

export default function AboutPage({ data }) {
  const about = data.about;

  return (
    <>
      <AboutHero data={data} about={about} />

      <AboutStory about={about} />

      <section className="about-video section section--alt">
        <div className="container">
          <div className="about-video__grid">
            <div className="about-video__info">
              <span className="section-label">Tanıtım Videosu</span>
              <h2 className="section-title">Elif Pansiyon'u Keşfedin</h2>
              <p className="about__text">
                Pansiyonumuzu, bahçemizi ve Şarköy'ün eşsiz atmosferini videomuzda
                yakından görün. 50 yıllık deneyimimizi ve misafirperverliğimizi
                sizlerle paylaşıyoruz.
              </p>
              <a
                href={about.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="about-video__youtube-link"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube'da İzle
              </a>
            </div>
            <div className="about-video__player">
              <div className="about-video__frame-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${about.youtubeVideoId}`}
                  title="Elif Pansiyon Tanıtım Videosu"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-timeline section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Tarihçe</span>
            <h2 className="section-title">50 Yıllık Yolculuğumuz</h2>
          </div>
          <div className="timeline">
            {about.timeline.map((item, index) => (
              <div className={`timeline__item ${index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`} key={item.year}>
                <div className="timeline__dot" />
                <div className="timeline__card">
                  <span className="timeline__year">{item.year}</span>
                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="timeline__text">{item.text}</p>
                </div>
              </div>
            ))}
            <div className="timeline__line" />
          </div>
        </div>
      </section>

      <section className="about-values section section--alt">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">Değerlerimiz</span>
            <h2 className="section-title">Nesilden Nesile Aktarılan Değerler</h2>
          </div>
          <div className="about-values__grid">
            <div className="about-values__item">
              <div className="about-values__icon">🏛️</div>
              <h4>Köklü Geçmiş</h4>
              <p>1974'ten beri aynı adreste, aynı güven ve samimiyetle hizmet veriyoruz.</p>
            </div>
            <div className="about-values__item">
              <div className="about-values__icon">🧹</div>
              <h4>Temizlik</h4>
              <p>50 yıllık tecrübemizle odalarımızı her misafir öncesi titizlikle hazırlıyoruz.</p>
            </div>
            <div className="about-values__item">
              <div className="about-values__icon">😊</div>
              <h4>Güler Yüz</h4>
              <p>Aile geleneğimiz olan sıcak karşılama, her misafirimizin yüzünde tebessüm bırakır.</p>
            </div>
            <div className="about-values__item">
              <div className="about-values__icon">🌊</div>
              <h4>Denize Yakınlık</h4>
              <p>Şarköy sahilinde merkezi konumumuzla Marmara'nın tadını çıkarın.</p>
            </div>
            <div className="about-values__item">
              <div className="about-values__icon">🌿</div>
              <h4>Bahçe & Doğa</h4>
              <p>Yeşil bahçemizde kuş sesleri eşliğinde huzur dolu anlar yaşayın.</p>
            </div>
            <div className="about-values__item">
              <div className="about-values__icon">❤️</div>
              <h4>Aile İşletmesi</h4>
              <p>Kurumsal değil, samimi. Her misafirimiz bizim için değerlidir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story section">
        <div className="container">
          <div className="about-story__grid about-story__grid--two">
            <div className="about-story__block">
              <span className="about-story__number">📍</span>
              <h3>Konumumuz</h3>
              <p>
                Cumhuriyet Mahallesi, Hisar Sokak No:1'de yer alan pansiyonumuz
                Şarköy sahilinin en güzel noktalarından birindedir.
                Tekirdağ'ın incisi Şarköy'de deniz, doğa ve huzur bir arada.
              </p>
              <p className="about-story__address">{data.address}</p>
            </div>
            <div className="about-story__block">
              <span className="about-story__number">🎯</span>
              <h3>Misyonumuz</h3>
              <p>
                50 yılı aşkın deneyimimizle her misafirimize temiz, ferah ve düzenli
                odalar sunarak unutulmaz bir tatil deneyimi yaşatmak. Güler yüzlü
                hizmet anlayışımız ve samimi yaklaşımımızla fark yaratıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta-section section section--alt">
        <div className="container">
          <div className="about-page__cta">
            <span className="about-page__cta-badge">50+ Yıllık Güven</span>
            <h2>Sizi Ağırlamaktan Mutluluk Duyarız</h2>
            <p>Odalarımızı inceleyin veya hemen rezervasyon için bize ulaşın.</p>
            <div className="about-page__cta-actions">
              <Link to="/odalar" className="btn btn--primary">Odaları Gör</Link>
              <Link to="/iletisim" className="btn btn--dark">Rezervasyon Yap</Link>
              <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="btn btn--outline-dark">
                {data.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
