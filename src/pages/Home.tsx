import { About, Banner, Hero, Map, PropertyListing } from "../components";
import { useSection } from '../context/SectionContext';

const Home = () => {
  const { aboutRef, contactRef } = useSection();

  return (
    <div>
      {/* <button onClick={() => scrollToSection("aboutRef")}>Go to About</button>
      <button onClick={() => scrollToSection("contactRef")}>Go to Contact</button> */}
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
