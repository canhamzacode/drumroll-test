import { useEffect, useState } from "react"
import { CustomModal } from "../components";
import CreateProperty from "../components/Property/Create";
import { Popconfirm, Table, Tooltip } from "antd";
import { FaEdit } from "react-icons/fa";
import { IProperty } from "../types";
import { AiFillDelete } from "react-icons/ai";
import { usePropertyState } from "../context";

interface ModalState {
    show: boolean;
    type?: "createProperty" | "editProperty";
    data?: IProperty;
}

  
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
};

const Dashboard = () => {
    const [modal, setModal] = useState<ModalState>({ show: false, type: "createProperty" });
    const {loading, deleteProperty, getAllSummary, summary, getAllProperties, properties} = usePropertyState();

    useEffect(() => {
        getAllProperties();
        getAllSummary();
    },[]);

    const closeModal = () => {
        setModal({ show: false, type: "createProperty" });
    }

    const openModal = () => {
        setModal({ show: true, type: "createProperty" });
    }

    const openEditModal = (data: IProperty) => {
        setModal({ show: true, type: "editProperty", data: data});
    }


    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => <div>{text.slice(0, 30)}...</div>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: number) => <div>#{text}</div>,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Property Type',
            dataIndex: 'propertyType',
            key: 'propertyType',
        },
        {
            title: 'Guest Capacity',
            dataIndex: 'guestCapacity',
            key: 'guestCapacity',
        },
        {
            title: 'Bedrooms',
            dataIndex: 'bedrooms',
            key: 'bedrooms',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => formatDate(date),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: string, data: IProperty) => (
                <div className="flex gap-3 items-center">
                    <div role="button" onClick={() => openEditModal(data)} aria-label="Edit property">
                        <Tooltip title={'Edit'}>
                            <FaEdit className="text-xl text-blue-400 cursor-pointer" />
                        </Tooltip>
                    </div>
                    <Popconfirm
                        okButtonProps={{ className: "bg-primary" }}
                        placement="top"
                        title={"Delete"}
                        onConfirm={() => {
                            deleteProperty(data._id as string);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title={'Delete'}>
                            <AiFillDelete className="text-xl text-red-500 cursor-pointer" />
                        </Tooltip>
                    </Popconfirm>
                </div>
            ),
        },
    ];

  return (
    <div className='w-full max-w-[1366px] mx-auto px-5'>
        <div className='mb-5 flex justify-between'>
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
        <div className="grid h-full mt-3 tablet:grid-cols-3 md:grid-cols-2 gap-4 grid-cols-1">
            <div className="w-full p-4 h-32 rounded-lg shadow-xl border flex flex-col gap-3">
                <h4 className="text-lg font-semibold">Total Properties</h4>
                <p className="text-4xl font-bold">{summary?.totalProperties || 0}</p>
            </div>
            <div className="w-full p-4 h-32 rounded-lg shadow-xl border flex flex-col gap-3">
                <h4 className="text-lg font-semibold">Total Revenue</h4>
                <p className="text-4xl font-bold">
                    &#8358;{summary?.revenueGenerated?.toLocaleString() || 0}
                </p>
            </div>
            <div className="w-full p-4 h-32 rounded-lg shadow-xl border flex flex-col gap-3">
                <h4 className="text-lg font-semibold">Total Avalable Properties</h4>
                <p className="text-4xl font-bold">{summary?.availableProperties || 0}</p>
            </div>
        </div>
        {/*  */}
        <h1 className='text-2xl font-bold mt-6'>Properties</h1>
        <Table columns={columns} dataSource={properties} loading={loading} rowKey="_id" />
        {/* Bookings should be displayed here also summary.booking */}
        <CustomModal 
            show={modal.show} 
            onDismiss={closeModal}
            title={modal.type === "createProperty" ? "Create Property" : "Edit Property"}
            width="1000px"
        >
           {modal.type === "createProperty" ? <CreateProperty closeModal={closeModal} /> : <CreateProperty closeModal={closeModal} data={modal.data} />}
        </CustomModal>
    </div>
  )
}

export default Dashboard