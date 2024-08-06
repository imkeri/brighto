import moment from 'moment'
import React, { useContext } from 'react'
import Pagination from "@components/Pagination/Index";
import Admin from "@components/Offcanvas/Admin/Index"
import { AuthContext } from "@context/AuthContext";
import Spin from '@components/Spin/Index';

const ApiTransaction = ({ ApiLogData, apiPage, setApiPage, total, showOffCanvas, handleOffCanvas, fetchAPILog }) => {
    const { spin } = useContext(AuthContext);
    return (<>
        {spin && <Spin />}
        <div>
            <Admin open={showOffCanvas} handleOffCanvas={handleOffCanvas} fetchlistData={fetchAPILog} type={"Transaction"} page={apiPage} setPage={setApiPage} />
            <div className='float-end'>
                <button className="bg-[#f19357] text-white px-4 py-2 rounded mb-4 mr-4 " onClick={() => handleOffCanvas(!showOffCanvas)}>
                    Filter
                </button>
            </div>
            <div class="container mx-auto p-4">
                {
                    ApiLogData?.map((value, index) => {
                        return (
                            <div class="bg-white border rounded-lg p-4 shadow-md my-4" key={index}>
                                <div class="flex flex-wrap gap-4 md:flex-nowrap items-start">
                                    {/* <div class="flex flex-col items-center gap-2">
                                        <div class="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span class="text-gray-500 text-xl font-bold">{value?.id}</span>
                                        </div>
                                    </div> */}
                                    <div class="w-11/12 flex justify-between flex-col md:flex-row gap-4 md:gap-8">
                                        <div class=" flex flex-col w-full gap-2">
                                            <div class="flex md:flex-col">
                                                <span class="font-bold">Date:</span>
                                                <span>{moment(value?.created_at).format('ddd MMM DD YYYY HH:mm:ss')}</span>
                                            </div>
                                            <div class="flex md:flex-col">
                                                <span class="font-bold">PID:</span>
                                                <span>{value?.tbl_plan_list?.PID}</span>
                                            </div>
                                        </div>
                                        <div class=" flex flex-col w-full gap-2">
                                            <div class="flex md:flex-col">
                                                <span class="font-bold">User ID:</span>
                                                <span>{value?.user_id}</span>
                                            </div>
                                            <div class="flex md:flex-col">
                                                <span class="font-bold">Type:</span>
                                                <span class="text-red-500">{value?.type}</span>
                                            </div>
                                        </div>
                                        <div class=" flex flex-col w-full gap-2">
                                            <div class="flex md:flex-col">
                                                <span class="font-bold">Email:</span>
                                                <span>{value?.tbl_user?.email}</span>
                                            </div>
                                            <div class="flex md:flex-col">
                                                <span class="font-bold">Amount:</span>
                                                <span>₹{value?.price}</span>
                                            </div>
                                        </div>
                                        <div class=" flex md:flex-col w-full">
                                            <span class="font-bold">Services:</span>
                                            <span>{value?.tbl_plan_list?.service_name}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Pagination currentPage={apiPage} totalPages={total} setCurrent={setApiPage} />
        </div>
    </>)
}

export default ApiTransaction
