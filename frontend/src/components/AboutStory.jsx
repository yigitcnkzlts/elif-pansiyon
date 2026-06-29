export default function AboutStory({ about }) {
  return (
    <section className="about-story-section section">
      <div className="container">
        <div className="about-story-layout">
          <aside className="about-story-layout__aside">
            <span className="section-label">Biz Kimiz?</span>
            <h2 className="about-story-layout__title">
              Yarım Asırlık<br />
              <em>Bir Hikâye</em>
            </h2>
            <p className="about-story-layout__lead">
              1974'ten beri aynı adreste, aynı samimiyetle.
            </p>

            <div className="about-story-intro">
              {about.intro?.map((paragraph, i) => (
                <p key={i} className="about-story-intro__text">{paragraph}</p>
              ))}
            </div>

            {about.hotelFeatures && (
              <div className="about-hotel-features">
                {about.hotelFeatures.map((item) => (
                  <div className="about-hotel-features__item" key={item.title}>
                    <span className="about-hotel-features__icon">{item.icon}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>

          <div className="about-story-layout__chapters">
            {about.storyChapters.map((chapter, index) => (
              <article className="story-chapter" key={chapter.step}>
                <div className="story-chapter__marker">
                  <span className="story-chapter__step">{chapter.step}</span>
                  {index < about.storyChapters.length - 1 && (
                    <div className="story-chapter__line" />
                  )}
                </div>
                <div className="story-chapter__body">
                  <h3 className="story-chapter__title">{chapter.title}</h3>
                  <p className="story-chapter__text">{chapter.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {about.quote && (
          <blockquote className="about-quote">
            <span className="about-quote__mark">"</span>
            <p>{about.quote}</p>
          </blockquote>
        )}
      </div>
    </section>
  );
}
