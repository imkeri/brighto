import React,{useContext} from 'react';
import { useUserList } from '@hooks/admin/UserList/useUserList';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@context/AuthContext";
import Spin from '@components/Spin/Index';

const UserAccountRow = () => {
  const { userData } = useUserList();
  const navigate = useNavigate();
  const {spin} = useContext(AuthContext);

  return (<>
  {spin && <Spin/>}
    <div className="max-w-8xl mx-auto p-4">
      {
        userData?.length > 0 ? userData?.map((user, index) => {
          return (
            <div className="bg-white shadow-md rounded-lg p-4 mb-4" key={index}>
              <div className="mb-4 border-b py-2">
                <div className="text-lg text-gray-800 font-semibold">Date:<span className="text-[17px] text-customGray font-normal">{moment(user?.updated_at).format('ddd MMM DD YYYY HH:mm:ss')}</span></div>
              </div>
              <div className="grid grid-cols-1 sm:gap-6 md:grid-cols-2">
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-5">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xl font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <div className="mb-1 flex sm:flex-col gap-1">
                      <div className="text-lg font-bold text-black">User Id </div>
                      <div className="text-lg text-customGray">{user.id}</div>
                    </div>
                    <div className="mb-1 flex sm:flex-col gap-1">
                      <div className="text-lg font-bold text-black">Phone no </div>
                      <div className="text-lg text-customGray ">{user.phone}</div>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col justify-between items-start md:items-center">
                  <div>
                    <div className="mb-1 flex sm:flex-col gap-1">
                      <div className="text-lg font-bold text-black">Name</div>
                      <div className="text-lg text-customGray">{user.first_name} {user.last_name}</div>
                    </div>
                    <div className="mb-1 flex sm:flex-col gap-1">
                      <div className="text-lg font-bold text-black">Email</div>
                      <div className="text-lg text-customGray">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:gap-2">
                    <div className="mb-1 flex sm:flex-col gap-1">
                      <div className="text-lg font-medium text-gray-800">Status</div>
                      <div className={`text-lg font-bold ${user.status === "enable" ? 'text-green-500' : 'text-red-500'}`}>{user.status === "enable" ? "Active" : "Inactive"}</div>
                    </div>
                    <button className="py-2 px-4 my-2 bg-[#f19357] text-white rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=>navigate(`/admin/user-deatil/${user?.id}`)}>
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }) : <><div className='my-8'><h1 className='text-center'>Data Not Found</h1></div></>
      }
    </div>
    </>);
};

export default UserAccountRow;
