import { useState, useEffect } from 'react';
import { FaRegCheckSquare } from 'react-icons/fa';
import { GiTireIronCross } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { usePropertyState } from '../context';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | null>(null);
  const { confirmPayment } = usePropertyState();
  const urlParams = new URLSearchParams(window.location.search);
  const [ref, setRef] = useState('');
  const trxref = urlParams.get('trxref');

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (trxref) {
        const data = await confirmPayment(trxref);
        console.log(data);
        setRef(trxref);
        if (data) {
          setPaymentStatus('success');
        } else {
          setPaymentStatus('failed');
        }
      }
    };

    fetchPaymentStatus();
  }, [trxref]);

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
          <h2>Payment with <span className='underline font-medium'>{ref}</span> Successful</h2>
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