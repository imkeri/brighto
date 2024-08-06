import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import resetPassword from "@assets/img/layout/resetPassword.jpg";
import API from '@services/Api';
import { URLS } from '@services/Urls';
import { toastifyMessage } from "@utils/CustomFunctions";;

const Index = () => {
    // valiadtion schema for reset password
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('New password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl flex flex-col lg:flex-row m-8">
                <div className="lg:w-2/3 p-6 lg:border-r border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
                    <Formik
                        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            // Handle form submission
                            API.post(URLS.RESET_PASSWORD, values)
                                .then(response => {
                                    if (response?.code === 200) {
                                        toastifyMessage(response?.message, "success")
                                    } else {
                                        toastifyMessage(response?.message, "error")
                                    }
                                })
                                .catch(error => {
                                    console.error('API Error:', error);
                                })
                        }}
                    >
                        {() => (
                            <Form className="text-left">
                                <div className="mb-4">
                                    <label htmlFor="oldPassword" className="block text-sm font-medium text-customGray-700">Current Password</label>
                                    <Field
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter current password"
                                    />
                                    <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-xs" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-customGray-700">New Password</label>
                                    <Field
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter new password"
                                    />
                                    <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-customGray-700">Confirm Password</label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter confirm password"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs" />
                                </div>
                                <p className="text-xs text-customGray-500 mb-4">Password must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols.</p>
                                <button type="submit" className="w-full bg-brand-800 text-white py-2 rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Reset Password</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="lg:w-1/3 p-6 flex justify-center items-center bg-gray-50 rounded-lg">
                    <img src={resetPassword} alt="Illustration" className="max-w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

export default Index;
