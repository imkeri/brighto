import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '@services/Api';
import { URLS } from '@services/Urls';
import { toastifyMessage } from "@utils/CustomFunctions";

const BookDemoModal = ({ handleModal }) => {

    // validation schema for demo call
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone_number: Yup.string().required('Phone number is required'),
        company_name: Yup.string().required('Company name is required')
    });

    return (
        <div className="bg-black bg-opacity-25 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-8 mx-auto max-w-[500px]">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
                        <h3 className="text-3xl font-semibold">Book A Demo Call</h3>
                    </div>
                    <div className="relative flex-auto">
                        <Formik
                            initialValues={{
                                first_name: "",
                                last_name: "",
                                email: "",
                                phone_number: "",
                                company_name: ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);
                                // handle form for Book demo call
                                API.post(URLS.BOOK_DEMO, values)
                                    .then((response) => {
                                        console.log("responseDemo Call", response)
                                        if (response?.code === 200) {
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
                                            htmlFor="first_name"
                                        >
                                            First Name
                                        </label>
                                        <Field
                                            type="text"
                                            name="first_name"
                                            placeholder="Enter First Name"
                                            className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                        />
                                        <ErrorMessage
                                            name="first_name"
                                            component="div"
                                            className="text-red-500 text-xs italic"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-black-300 text-sm font-bold mb-1"
                                            htmlFor="last_name"
                                        >
                                            Last Name
                                        </label>
                                        <Field
                                            type="text"
                                            name="last_name"
                                            placeholder="Enter Last Name"
                                            className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                        />
                                        <ErrorMessage
                                            name="last_name"
                                            component="div"
                                            className="text-red-500 text-xs italic"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-black-300 text-sm font-bold mb-1"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter Email"
                                            className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-500 text-xs italic"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-black-300 text-sm font-bold mb-1"
                                            htmlFor="phone_number"
                                        >
                                            Phone Number
                                        </label>
                                        <Field
                                            type="text"
                                            name="phone_number"
                                            placeholder="Enter Phone Number"
                                            className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                        />
                                        <ErrorMessage
                                            name="phone_number"
                                            component="div"
                                            className="text-red-500 text-xs italic"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-black-300 text-sm font-bold mb-1"
                                            htmlFor="company_name"
                                        >
                                            Company Name
                                        </label>
                                        <Field
                                            type="text"
                                            name="company_name"
                                            placeholder="Enter Company Name"
                                            className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                        />
                                        <ErrorMessage
                                            name="company_name"
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
    );
};

export default BookDemoModal;
