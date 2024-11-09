import aboutImg from "../../assets/aboutImg.png";

const About = () => {
  return (
    <div className='w-full max-w-[1366px] py-24 mx-auto grid-cols-2 gap-4 grid'>
        <div className='flex flex-col gap-10'>
            <h2 className='text-3xl text-[#232323]'>About Heristays shortlets in Lekki and VI Lagos:</h2>
            <div className='text-[#727272] text-lg flex flex-col gap-6'>
                <p>We specialize in providing top-tier shortlet accommodations in the most sought-after locations of Victoria Island and Lekki. Our selection of over 300 shortlet apartments is second to none, each fully furnished and serviced to meet the highest standards of luxury and convenience.</p>
                <p>Power outages are a thing of the past with our 24/7 power supply, reliably supported by dual backup generators. Safety is a priority, and our shortlet apartments are situated within secure gated estates, complete with uniformed guards and electronic access control gates, ensuring your peace of mind.</p>
                <p>Some of our amenities include a fully-equipped Gym, on-site laundry services, and an inviting swimming pool. Our commitment to cleanliness is unwavering, with professional cleaning services provided every three days to maintain the pristine condition of your shortlet apartment.</p>
                <p>We are dedicated to offering an unmatched shortlet living experience in Lagos. Whether you’re in town for business or pleasure, our apartments provide the perfect blend of luxury, security, and comfort. Book your next stay with us and discover the ideal shortlet apartment in Lagos—where every detail is designed with your utmost satisfaction in mind.</p>
            </div>
        </div>
        <div className="w-full">
            <img src={aboutImg} alt="about" loading="lazy" />
        </div>
    </div>
  )
}

export default About