import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Layout({ data }) {
  return (
    <>
      <ScrollToTop />
      <Header data={data} />
      <main>
        <Outlet />
      </main>
      <Footer data={data} />
    </>
  );
}
