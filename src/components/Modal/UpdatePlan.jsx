import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '@services/Api';
import { URLS } from '@services/Urls';
import { toastifyMessage } from "@utils/CustomFunctions";;



const AddNewPlan = ({ handleModal, planData ,getPlanList}) => {


    // validation schema for add paln
    const validationSchema = Yup.object().shape({
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        limited_access_control: Yup.boolean().required('Limited access control is required')
    });


    return (
        <div className="bg-black bg-opacity-25 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-[500px]">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
                        <h3 className="text-3xl font-semibold">Update Plan</h3>
                    </div>
                    <div className="relative flex-auto">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                id:planData?.id,
                                price:planData?.price || "",
                                limited_access_control: planData?.limited_access_control  ? "true" : "false" || ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);
                                // HANDLE FORM FOR CREATE PLAN
                                API.put(URLS.UPDATE_PLAN, values,true)
                                    .then((response) => {
                                        if (response?.code === 201) {
                                            getPlanList()
                                            toastifyMessage(response?.message, "success");
                                            handleModal(false)
                                        } else {
                                            toastifyMessage(response?.message, "error");
                                        }
                                    })
                                    .catch((error) => {
                                        console.error("Error:", error);
                                    });
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="rounded px-4 pt-4 pb-8 w-full">
                                    <div className="mb-2">
                                        <label
                                            className="block text-black-300 text-sm font-bold mb-1"
                                            htmlFor="price"
                                        >
                                            Price
                                        </label>
                                        <Field
                                            type="number"
                                            name="price"
                                            placeholder="Enter Price"
                                            className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                        />
                                        <ErrorMessage
                                            name="price"
                                            component="div"
                                            className="text-red-500 text-xs italic"
                                        />
                                    </div>
                                    <div className='mb-2'>
                                        <label
                                            className="block text-black-300 text-sm font-bol    d mb-1"
                                            htmlFor="default_price"
                                        >
                                            Limited Access
                                        </label>
                                        <div className="mt-1 flex space-x-4">
                                            <label className="flex items-center">
                                                <Field type="radio" name="limited_access_control" value="true"  />
                                                <span className="ml-2 text-sm text-gray-700">True</span>
                                            </label>
                                            <label className="flex items-center">
                                                <Field type="radio" name="limited_access_control" value="false" />
                                                <span className="ml-2 text-sm text-gray-700">False</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-2 rounded-b">
                                        <button
                                            type="submit"
                                            className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                                            disabled={isSubmitting}
                                        >
                                            Add
                                        </button>
                                        <button
                                            type="button"
                                            className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                                            onClick={() => handleModal(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewPlan;
