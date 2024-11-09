import "./hero.css";

const Hero = () => {
  return (
    <div className="hero-bg px-5">
        <div className="w-full max-w-[1133px] mx-auto flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-white font-semibold tablet:text-5xl text-3xl">Luxury shortlet apartments in Lekki and VI Lagos</h1>
                <p className="text-lg text-white">Get the best prices on over 300 serviced shortlet apartments accross 6 Properties in Chevron, Lekki Phase1 and Victoria Island</p>
            </div>
            <div className="w-full p-4 bg-[#F7F7F8] rounded-xl grid grid-cols-[400px,1fr,100px] justify-between items-center gap-3">
                <div className="">
                    <p className="text-[#fe6a00]">Get special offers, and more from Heristays shortlets.</p>
                    <p>Subscribe to see secret deals and price reductions.</p>
                </div>
                <div className="bg-red-400 border rounded-lg p-3">
                    {/* Border container for input or other content */}
                </div>
                <div className="flex justify-end">
                    <button className="bg-[#fe6a00] px-4 py-3 rounded-3xl text-white whitespace-nowrap">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero