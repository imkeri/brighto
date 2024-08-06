import moment from 'moment';
import { AuthContext } from "@context/AuthContext";
import Spin from "@components/Spin/Index";
import React, { useContext } from "react";

const IPDetailsTable = ({ Data }) => {
    const { spin } = useContext(AuthContext);
    return (<>
    {spin && <Spin />}
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-[#f19357] text-white uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">S No.</th>
                        <th className="py-3 px-6 text-left">Created At</th>
                        <th className="py-3 px-6 text-left">Updated At</th>
                        <th className="py-3 px-6 text-left">IP Address</th>
                        <th className="py-3 px-6 text-left">Hits</th>
                    </tr>
                </thead>
                <tbody className="text-customGray-700 text-sm">
                    {Data?.length > 0 ? Data?.map((value, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{index + 1}</td>
                            <td className="py-3 px-6 text-left">
                                {moment(value?.created_at).format('ddd MMM DD YYYY HH:mm:ss')}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {moment(value?.updated_at).format('ddd MMM DD YYYY HH:mm:ss')}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value.ip_address}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value.hits_count}
                            </td>
                           
                            
                        </tr>
                    )) : <tr>
                    <td colSpan="7" className="py-3 px-6 text-center">
                      No data found
                    </td>
                  </tr>}
                </tbody>
            </table>
        </div>
        </>);
}

export default IPDetailsTable;
