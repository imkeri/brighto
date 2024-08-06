import moment from 'moment';
const TransactionTable = ({ DataofUserTransaction }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-[#f19357] text-white uppercase text-sm leading-normal">      
                        <th className="py-3 px-6 text-left">S No.</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">PID</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Amount</th>
                        <th className="py-3 px-6 text-left">Balance</th>
                        <th className="py-3 px-6 text-left">Type</th>
                    </tr>
                </thead>
                <tbody className="text-customGray-700 text-sm">
                    {DataofUserTransaction?.length > 0 ? DataofUserTransaction?.map((value, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{index + 1}</td>
                            <td className="py-3 px-6 text-left">
                                {moment(value?.created_at).format('ddd MMM DD YYYY HH:mm:ss')}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.tbl_plan_list?.PID ? value?.tbl_plan_list?.PID :"N/A" }
                            </td>
                            <td className="py-3 px-6 text-left">
                            {value?.tbl_user.email}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.tbl_plan_list?.service_name ? value?.tbl_plan_list?.service_name :"N/A"}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.price ? value?.price :"0"}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.remain_balance ? value?.remain_balance :"N/A"}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.type ? value?.type :"N/A"}
                            </td>
                            
                        </tr>
                    )) :  <tr>
                    <td colSpan="8" className="py-3 px-6 text-center">
                      No data found
                    </td>
                  </tr>}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable;
