import { useState } from "react"
import { CustomModal } from "../components";
import CreateProperty from "../components/Property/Create";

interface ModalState {
    show: boolean;
    type?: "createProperty";
    data?: [];
}

const Dashboard = () => {
    const [modal, setModal] = useState<ModalState>({ show: false, type: "createProperty" });

    const closeModal = () => {
        setModal({ show: false, type: "createProperty" });
    }

    const openModal = () => {
        setModal({ show: true, type: "createProperty" });
    }
  return (
    <div className='w-full max-w-[1366px] mx-auto px-5'>
        <div className='min-h-[400px] flex justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
                <p className='text-gray-500'>Welcome to your dashboard</p>
            </div>
            <div>
                <button onClick={openModal} className='text-white bg-[#FE6A28] w-[140px] h-10 rounded-lg'>
                    Add Property
                </button>
            </div>
        </div>
        <CustomModal 
            show={modal.show} 
            onDismiss={closeModal}
            title="Create Property"
            width="1000px"       
        >
            <CreateProperty />
        </CustomModal>
    </div>
  )
}

export default Dashboard