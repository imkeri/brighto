import { useState,useContext } from "react";
import { useMyPlan } from "@hooks/admin/MyPlan/useMyPlan";
import UpdatePlan from "@components/Modal/UpdatePlan";
import { AuthContext } from "@context/AuthContext";
import Spin from '@components/Spin/Index';

const Index = ({ data ,getPlanList}) => {

    const { handleModal, showModal } = useMyPlan();
    const [updateData,setUpdateData] = useState();
    const {spin} = useContext(AuthContext);
    return (
        <>
         {spin && <Spin/>}
            {showModal && <UpdatePlan handleModal={() => handleModal(!showModal)} planData={updateData} getPlanList={getPlanList}/>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-[#f19357] text-white uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">S No.</th>
                            <th className="py-3 px-6 text-left">category</th>
                            <th className="py-3 px-6 text-left">API Name</th>
                            <th className="py-3 px-6 text-left">PID</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-customGray-700 text-sm">
                        {data?.length > 0 ? data?.map((value, index) => (
                            <tr key={index} className="border-b border-gray-200  text-customGray hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{index + 1}</td>
                                <td className="py-3 px-6 text-left">
                                    {value?.tbl_plan_category?.category_name}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {value?.service_name}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {value?.PID}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {value?.price}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <button className="text-base bg-[#f19357] text-white px-4 py-2 rounded " onClick={() =>{setUpdateData(value); handleModal(!showModal)}}>Update</button>
                                </td>
                            </tr>
                        )) :  <tr>
                        <td colSpan="4" className="py-3 px-6 text-center">No data found</td>
                      </tr>}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default Index;
