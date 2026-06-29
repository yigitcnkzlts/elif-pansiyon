import PageHero from '../components/PageHero';
import Rooms from '../components/Rooms';

export default function RoomsPage({ data }) {
  return (
    <>
      <PageHero
        title="Odalarımız"
        subtitle="Konforlu ve ferah odalarımızda huzurlu bir konaklama"
        image={data.rooms[0]?.image}
      />
      <Rooms rooms={data.rooms} availability={data.availability} />
    </>
  );
}
