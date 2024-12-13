import { useState, useEffect } from 'react';
import { FaRegCheckSquare } from 'react-icons/fa';
import { GiTireIronCross } from 'react-icons/gi';
import { useNavigate, useParams } from 'react-router-dom';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | null>(null);

  useEffect(() => {
    console.log(`Payment ID: ${id}`);
    // Simulate API request
    setTimeout(() => {
      // Simulate a successful payment response
      setPaymentStatus('failed');
      // Uncomment the next line to simulate a failed payment response
      // setPaymentStatus('failed');
    }, 1000);
  }, [id]);

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
      {paymentStatus === null && <div>Processing payment...</div>}
      {paymentStatus === 'success' && (
        <div className='flex flex-col gap-3 items-center justify-center'>
          <div className='w-[100px] h-[100px] rounded-[100px] bg-green-600 text-white flex items-center justify-center'>
            <FaRegCheckSquare size={40} />
          </div>
          <h2>Payment Successful</h2>
          <button className='underline' onClick={handleHomeClick}>Go to Home</button>
        </div>
      )}
      {paymentStatus === 'failed' && (
        <div className='flex flex-col gap-3 items-center justify-center'>
          <div className='w-[100px] h-[100px] rounded-[100px] bg-red-600 text-white flex items-center justify-center'>
            <GiTireIronCross size={40} />
          </div>
          <h2>Payment Failed</h2>
          <button className='underline' onClick={handleHomeClick}>Go to Home</button>
        </div>
      )}
    </div>
  );
};

export default Payment;