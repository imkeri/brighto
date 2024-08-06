import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { URLS } from '@services/Urls';
import API from '@services/Api';
import { toastifyMessage } from "@utils/CustomFunctions";;
import { AuthContext } from "@context/AuthContext";
import Spin from '@components/Spin/Index';

const Index = () => {
    const { spin, setSpin } = useContext(AuthContext);

    // validataion schema fro add user
    const validationSchema = Yup.object({
        first_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'First Name should contain only letters')
            .required('First Name is required'),
        last_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'Last Name should contain only letters')
            .required('Last Name is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Phone number is not valid, it should be 10 digits')
            .required('Phone Number is required'),
        email: Yup.string()
            .required('Email is required')
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 'Enter valid email'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is required'),
    });

                                                    

    return (<>
        {spin && <Spin />}
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg">
            <div className="p-6">
                <h3 className="text-lg font-medium text-customGray-700 mb-4 border-b">
                    Add User
                </h3>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        first_name: "",
                        last_name: "",
                        phone: "",
                        email: "",
                        password: "",
                        access_control: "limited access",
                        role: "user"
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        setSpin(true)
                        // function add user manually
                        API.post(URLS.ADD_USER, values)
                            .then((response) => {
                                setSpin(false)
                                if (response?.code === 201) {
                                    toastifyMessage(response?.message, "success");
                                } else {
                                    toastifyMessage(response?.message, "error");
                                }
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                                setSpin(false)
                            });
                    }}
                >
                    {() => (
                        <Form>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-customGray-700">First Name</label>
                                    <Field
                                        placeholder="Enter First Name"
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage name="first_name" component="div" className="text-red-500 text-xs" />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-customGray-700">Last Name</label>
                                    <Field
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Enter Last Name"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage name="last_name" component="div" className="text-red-500 text-xs" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-customGray-700">Phone Number</label>
                                    <Field
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter Phone Number"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-customGray-700">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-customGray-700">Password</label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                                </div>

                            </div>
                            <div className='w-full py-4'>
                                <label className="block text-sm font-medium text-customGray-700">Access Control</label>
                                <div className="mt-1 flex space-x-4">
                                    <label className="flex items-center">
                                        <Field type="radio" name="access_control" value="limited access" />
                                        <span className="ml-2 text-sm text-customGray-700">Limited Access</span>
                                    </label>
                                    <label className="flex items-center">
                                        <Field type="radio" name="access_control" value="full access" />
                                        <span className="ml-2 text-sm text-customGray-700">Full Access</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className=" py-2 px-4 bg-[#f19357] text-white rounded-md hover:bg-[#f19357] focus:outline-none focus:ring-2 focus:ring-offset-2">Create Account</button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    </>);
};

export default Index;
