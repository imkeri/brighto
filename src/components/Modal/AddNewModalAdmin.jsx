import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toastifyMessage } from "@utils/CustomFunctions";
import { URLS } from '@services/Urls';
import API from '@services/Api';
import * as Yup from "yup";


const AddNewModalAdmin = ({ handleModal ,fetchWhitelistData}) => {

    // Validation schema
    const validationSchema = Yup.object({
        user_id: Yup.string().required("User ID is required"),
        ip_address: Yup.string()
            .matches(
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                "Invalid IP address"
            )
            .required("IP is required"),
        comment: Yup.string().required("Comment is required"),
    });

    return (
        <>
            <div className="bg-black bg-opacity-25 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-[500px]">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
                            <h3 className="text-3xl font-semibold">WhiteList New IP</h3>
                        </div>
                        <div className="relative flex-auto">
                            <Formik
                                initialValues={{
                                    user_id: "",
                                    ip_address: "",
                                    comment: ""
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    API.post(URLS.ADD_IP, values)
                                        .then((response) => {
                                            if (response?.code === 201) {
                                                toastifyMessage(response?.message, "success");
                                                fetchWhitelistData("","","",1)
                                                handleModal(false);
                                            } else {
                                                toastifyMessage(response?.message, "error");
                                                handleModal(false);
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
                                                htmlFor="user_id"
                                            >
                                                User ID
                                            </label>
                                            <Field
                                                type="text"
                                                name="user_id"
                                                placeholder="Enter IP"
                                                className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                            />
                                            <ErrorMessage
                                                name="user_id"
                                                component="div"
                                                className="text-red-500 text-xs italic"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                className="block text-black-300 text-sm font-bold mb-1"
                                                htmlFor="ip_address"
                                            >
                                                IP
                                            </label>
                                            <Field
                                                type="text"
                                                name="ip_address"
                                                placeholder="Enter IP"
                                                className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                            />
                                            <ErrorMessage
                                                name="ip_address"
                                                component="div"
                                                className="text-red-500 text-xs italic"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                className="block text-black-300 text-sm font-bold mb-1"
                                                htmlFor="comment"
                                            >
                                                Comment
                                            </label>
                                            <Field
                                                type="text"
                                                name="comment"
                                                placeholder="Enter Comment"
                                                className="appearance-none border rounded w-full py-2 px-1 text-black"
                                            />
                                            <ErrorMessage
                                                name="comment"
                                                component="div"
                                                className="text-red-500 text-xs italic"
                                            />
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
        </>
    );
};

export default AddNewModalAdmin;
