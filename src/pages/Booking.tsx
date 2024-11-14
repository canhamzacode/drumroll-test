import { useEffect } from "react";
import { usePropertyState } from "../context"
import { Table } from "antd";

const Booking = () => {
    const {booking, getAllBookings} = usePropertyState();

    useEffect(() => {
        getAllBookings();
    },[])

    const columns = [
        {
            title: "Order Id",
            dataIndex: "order_num",
        },
        {
            title: "Title",
            dataIndex: ["booking_info", "title"],
        },
        {
            title: "Price",
            dataIndex: ["booking_info", "price"],
        },
        {
            title: "Satus",
            dataIndex: ["booking_info", "status"],
        },
        {
            title: "Guest Capacity",
            dataIndex: ["booking_info", "guestCapacity"],
        },
    ]
  return (
    <div className='w-full max-w-[1366px] mx-auto px-5'>
        <div className="mb-5">
            <h1 className='text-2xl font-bold'>Bookings</h1>
            <p className='text-gray-500'>Welcome to your Bookings</p>
        </div>
        <div className="min-h-[250px]">
            <Table columns={columns} dataSource={booking} />
        </div>
    </div>
  )
}

export default Booking