import { Mail, Phone, Printer, Smartphone } from 'lucide-react';

const Contact = () => {
  return (
    <div className=''>
        <div className='w-full max-w-[1133px] mx-auto pt-36 pb-10 grid grid-cols-[400px,1fr] gap-7'>
            <div className='flex flex-col gap-10'>
                <h3 className='text-4xl font-bold'>Contact Information</h3>
                <div className='px-2'>
                    <p>Please reach out to us if you have any questions</p>
                    <div className='flex flex-col gap-3 text-[#5D6475] mt-4'>
                        <div className='flex gap-3 items-center'>
                            <Phone size={20} />
                            <p>+234 (916) 984-5070</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Smartphone size={20} />
                            <p>+234 (916) 984-5070</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Mail size={20} />
                            <p>info@heristays.com</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Printer size={20} />
                            <p>+234 (916) 984-5077</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-red-300'>

            </div>
        </div>
    </div>
  )
}

export default Contact