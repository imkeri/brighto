import React,{useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from "react-router-dom";
import Droom from "@assets/img/avatars/droomlogo.png";
import Gromo from "@assets/img/avatars/gromologo.png";
import Tata from "@assets/img/avatars/tatalogo.png";
import Dasbelt from "@assets/img/avatars/dasweltautologo.svg";
import { URLS } from '@services/Urls';
import API from '@services/Api';
import { toastifyMessage } from "@utils/CustomFunctions";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // validation schema for reset password
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
      .required("Confirm Password is required")
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white p-10 w-full md:w-1/3">
        <Formik
          initialValues={{ user_id:id, newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values,"values")
            API.post(URLS.FORGOT_RESET_PASSWORD, values)
              .then(response => {
                if (response?.code === 200) {
                  toastifyMessage(response?.message, "success");
                  setTimeout(() => {
                     navigate("/auth/sign-in");
                  }, 500);
                } else {
                  toastifyMessage(response?.message, "error");
                }
              })
              .catch(error => {
                console.error('API Error:', error);
                toastifyMessage("Something went wrong. Please try again.", "error");
              });
          }}
        >
          {() => (
            <Form className="rounded-md shadow-lg p-8 text-left w-full max-w-sm mb-8">
              <p className="text-xl font-semibold border-b border-gray-200 pb-2">
                <span className="text-brand-700 font-bold">Reset Password</span>
              </p>
              <div className="my-4">
                <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs" />
              </div>
              <div className="my-4">
                <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs" />
              </div>
              <button type="submit" className="w-full p-2 text-white font-semibold rounded-md bg-brand-800 hover:bg-brand-600 transition-colors">
                Submit
              </button>
              <Link to="/auth/sign-in" className="text-center text-sm mt-4 text-brand-700 underline block">
                Back to Login
              </Link>
              <p className="text-center text-xs mt-6 text-gray-500">
                &copy; 2024 Company Name. All rights reserved.
              </p>
            </Form>
          )}
        </Formik>
        <div className="flex space-x-4">
          <img src={Dasbelt} alt="logo-Dasbelt" className="w-1/4" />
          <img src={Droom} alt="logo-droom" className="w-1/2 mx-2" />
          <img src={Gromo} alt="logo-Gromo" className="w-1/3" />
          <img src={Tata} alt="logo-Tata" className="w-1/3" />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
