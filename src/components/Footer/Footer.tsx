import footerIcons from "../../assets/footerIcons.png"

const Footer = () => {
  return (
    <div className='w-full max-w-[1366px] mx-auto p-5 border-t-[#DEDEDE] border-t text-gray-400 flex justify-between flex-wrap'>
      <p>© Copyright Heristays 2024. Heristays is a product of Drumroll Digital</p>
      <div className="">
        <img src={footerIcons} alt="card icons" />
      </div>
    </div>
  )
}

export default Footer