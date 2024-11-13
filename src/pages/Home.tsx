import { About, Banner, Hero, Map, PropertyListing } from "../components";
import { useSection } from '../context/SectionContext';

const Home = () => {
  const { aboutRef, contactRef } = useSection();

  return (
    <div>
      <div>
        <Hero />
      </div>
      <PropertyListing />
      <section ref={aboutRef}>
        <About />
      </section>
      <Banner />
      <section ref={contactRef}>
        <Map />
      </section>
    </div>
  );
};

export default Home;
