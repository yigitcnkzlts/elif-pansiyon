import PageHero from '../components/PageHero';
import Contact from '../components/Contact';

export default function ContactPage({ data }) {
  return (
    <>
      <PageHero
        title="İletişim"
        subtitle="Rezervasyon ve bilgi için bize ulaşın"
        image={data.heroImage}
      />
      <Contact data={data} />
    </>
  );
}
