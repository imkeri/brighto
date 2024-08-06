
import moment from 'moment';
import { useMyPlan } from '@hooks/admin/MyPlan/useMyPlan';
import { Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import API from '@services/Api';
import { URLS } from '@services/Urls';
import { toastifyMessage } from "@utils/CustomFunctions";


const Index = ({ data, fetchPlanData }) => {
    const { allPlan } = useMyPlan();
    const { id } = useParams();

    // marge data
    const mergedData = allPlan?.map(service => {
        const plan = data?.find(p => p.plan_id === service.id);
        return plan ? { ...plan, ...service } : service;
    });


    return (<>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-[#f19357] text-white uppercase text-sm leading-normal">
                        <th className="py-3 px-2 text-left w-4p">S No.</th>
                        <th className="py-3 px-2 text-left w-15p">Date</th>
                        <th className="py-3 px-2 text-left w-15p">category</th>
                        <th className="py-3 px-2 text-left w-10p">PID</th>
                        <th className="py-3 px-2 text-left w-15p">API Name</th>
                        <th className="py-3 px-2 text-left w-10p">My Plan</th>
                        <th className="py-3 px-2 text-left w-10p">Current Price</th>
                        <th className="py-3 px-2 text-left w-15p">Change Price</th>
                    </tr>
                </thead>
                <tbody className="text-customGray-700 text-sm">
                    {mergedData?.length > 0 ? mergedData?.map((value, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-2 text-left">{index + 1}</td>
                            <td className="py-3 px-2 text-left">
                                {moment(value?.updated_at).format('ddd MMM DD YYYY HH:mm:ss')}
                            </td>
                            <td className="py-3 px-2 text-left">
                                {value?.tbl_plan_category?.category_name}
                            </td>
                            <td className="py-3 px-2 text-left">
                                {value?.PID}
                            </td>
                            <td className="py-3 px-2 text-left">
                                {value?.service_name}
                            </td>
                            <td className="py-3 px-2 text-left">
                                {value?.price}
                            </td>
                            <td className="py-3 px-2 text-left">
                                {value?.change_price}
                            </td>
                            <td className="py-3 px-2 text-left">
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        plan_id: value?.id,
                                        user_id: parseInt(id),
                                        change_price: ''

                                    }}
                                    onSubmit={(values) => {
                                        console.log("values", values)
                                        // function add user manually
                                        API.post(URLS.API_PLAN_CHANGE, values)
                                            .then((response) => {
                                                console.log("response", response)
                                                if (response?.code === 200) {
                                                    fetchPlanData();
                                                    toastifyMessage(response?.message, "success");
                                                } else {
                                                    toastifyMessage(response?.message, "error");
                                                }
                                            })
                                            .catch((error) => {
                                                console.error("Error:", error);
                                            });
                                    }}
                                >
                                    {({ values }) => (
                                        <Form>
                                            <div className="flex mb-2">
                                                <Field
                                              
                                                    type="number"
                                                    name="change_price"
                                                    placeholder=""
                                                    className="appearance-none border rounded w-[70px] py-1 px-1 mx-1 text-black"

                                                />
                                                {values.change_price && (
                                                    <button type="submit" className="">
                                                        Save
                                                    </button>
                                                )}
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                            </td>
                        </tr>
                    )) : <tr><td>Not Found</td></tr>}
                </tbody>
            </table>
        </div>
    </>);
}

export default Index;
