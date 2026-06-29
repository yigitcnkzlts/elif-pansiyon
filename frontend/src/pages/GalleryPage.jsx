import PageHero from '../components/PageHero';
import Gallery from '../components/Gallery';

export default function GalleryPage({ data }) {
  return (
    <>
      <PageHero
        title="Galeri"
        subtitle="Elif Pansiyon'dan kareler"
        image={data.gallery[3]}
      />
      <Gallery images={data.gallery} />
    </>
  );
}
