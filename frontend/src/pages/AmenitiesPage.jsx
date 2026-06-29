import PageHero from '../components/PageHero';
import Amenities from '../components/Amenities';

export default function AmenitiesPage({ data }) {
  return (
    <>
      <PageHero
        title="Olanaklar"
        subtitle="Konforunuz için sunduğumuz tüm imkanlar"
        image={data.gallery[2]}
      />
      <Amenities amenities={data.amenities} />
    </>
  );
}
