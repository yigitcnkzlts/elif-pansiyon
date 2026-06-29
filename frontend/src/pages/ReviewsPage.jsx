import PageHero from '../components/PageHero';
import Reviews from '../components/Reviews';

export default function ReviewsPage({ data }) {
  return (
    <>
      <PageHero
        title="Misafir Yorumları"
        subtitle="Sizden gelen değerli görüşler"
        image={data.gallery[4]}
      />
      <Reviews reviews={data.reviews} rating={data.rating} reviewCount={data.reviewCount} />
    </>
  );
}
