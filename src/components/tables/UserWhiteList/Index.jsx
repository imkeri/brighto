import moment from 'moment';

const Index = ({ data, deletewhiteIp, type }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-[#f19357] text-white uppercase text-sm leading-normal">

                        <th className="py-3 px-6 text-left">S No.</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">IP</th>
                        <th className="py-3 px-6 text-left">Comment</th>
                        {
                            type === "user" && <th className="py-3 px-6 text-left">Action</th>
                        }
                    </tr>
                </thead>
                <tbody className="text-customGray-700 text-sm">
                    {data?.length > 0 ? data?.map((value, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{index + 1}</td>
                            <td className="py-3 px-6 text-left">
                                {moment(value?.updated_at).format('ddd MMM DD YYYY HH:mm:ss')}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.ip_address}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {value?.comment}
                            </td>
                            {
                                type === "user" && <td className="py-3 px-6 text-left">
                                    <button className="text-base bg-red-800 text-white px-4 py-2 rounded" onClick={() => deletewhiteIp(value.id)}>Delete</button>
                                </td>
                            }

                        </tr>
                    )) : <tr><td>Not Found</td></tr>}
                </tbody>
            </table>
        </div>
    );
}

export default Index;
