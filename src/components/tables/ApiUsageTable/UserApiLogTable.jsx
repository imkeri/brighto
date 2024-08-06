import moment from 'moment';

const UserApiLogTable = ({ DataofUserApi }) => {

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-[#f19357] text-white uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">S No.</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">PID</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Amount</th>
                        <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                </thead>
                <tbody className="text-customGray-700 text-sm">
                    {DataofUserApi?.length > 0 ? DataofUserApi?.map((value, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{index + 1}</td>
                            <td className="py-3 px-6 text-left">
                                {moment(value?.updated_at).format('ddd MMM DD YYYY HH:mm:ss')}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.tbl_plan_list?.PID}
                            </td>
                            <td className="py-3 px-6 text-left">
                            {value?.tbl_plan_list?.service_name}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.price ? value?.price :"N/A"}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.status_code}
                            </td>
                            
                        </tr>
                    )) :  <tr>
                    <td colSpan="6" className="py-3 px-6 text-center">
                      No data found
                    </td>
                  </tr>}
                </tbody>
            </table>
        </div>
    );
}

export default UserApiLogTable;
