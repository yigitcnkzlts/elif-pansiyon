import PageHero from '../components/PageHero';
import Reviews from '../components/Reviews';

export default function ReviewsPage({ data }) {
  return (
    <>
      <PageHero
        title="Misafir Yorumları"
        subtitle="Deneyiminizi paylaşın — yorumunuz anında yayınlanır"
        image={data.gallery[4]}
      />
      <Reviews />
    </>
  );
}
