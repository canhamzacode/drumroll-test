import { About, Banner, Contact, Footer, Hero, Map, Navbar, PropertyListing } from "../components"


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <PropertyListing />
      <About />
      <Banner />
      <Map />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home