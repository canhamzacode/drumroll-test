import { useAuthState } from '../../context'

interface IProfileProps {
    signout: () => void;
}

const Profile = ({signout}: IProfileProps) => {
    const {user} = useAuthState();
  return (
    <div>
        {/* <h3 className='text-xl font-semibold text-[#fe6a00] mb-3'>Profile Information</h3> */}
        <p className=''>Name: {user?.username}</p>
        <p className=''>Email: {user?.email}</p>
        <p className=''>
                    <span className=''>Joined: </span>
                    {new Date(user?.createdAt || "").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
        <button onClick={signout} className="bg-[#fe6a00] w-full h-[46.99px] px-4 py-3 rounded-md mt-3 text-white whitespace-nowrap">
            Logout
        </button>
    </div>
  )
}

export default Profile