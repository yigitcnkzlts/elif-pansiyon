export default function PageHero({ title, subtitle, image }) {
  return (
    <section className={`page-hero ${!image ? 'page-hero--plain' : ''}`}>
      {image && (
        <div
          className="page-hero__bg"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="page-hero__overlay" />
      <div className="page-hero__content container">
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__subtitle">{subtitle}</p>
      </div>
    </section>
  );
}
