import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Droom from "@assets/img/avatars/droomlogo.png";
import Gromo from "@assets/img/avatars/gromologo.png";
import Tata from "@assets/img/avatars/tatalogo.png";
import Dasbelt from "@assets/img/avatars/dasweltautologo.svg";
import { URLS } from '@services/Urls';
import API from '@services/Api';
import { toastifyMessage } from "@utils/CustomFunctions";;

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  // validation schema for login
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('login.invalidEmail'))
      .required(t('login.required')),
    password: Yup.string()
      .min(6, t('login.minLength'))
      .required(t('login.required')),
   
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white p-10 w-full md:w-1/3">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            // handle login API
            API.post(URLS.LOGIN, values)
              .then(response => {
                if (response?.code === 200) {
                  const token = response?.data?.authorization;
                  localStorage.setItem("token", token);
                  toastifyMessage(response?.message, "success")
                  setTimeout(() => {
                    navigate("/admin/dashboard")
                  }, 500);
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
            <Form className="rounded-md shadow-lg p-8 text-left w-full max-w-sm mb-8">
              <p className="text-xl font-semibold border-b border-gray-200 pb-2">
                <span className="text-brand-700 font-bold">{t("login.loginLable")}</span>
              </p>
              <div className="my-4">
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">{t('common.email')}</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              </div>
              <div className="my-4">
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">{t('login.password')}</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
              </div>
              {/* <div className="mb-3">
                <Field type="checkbox" id="terms" name="terms" className="mr-2" />
                <label htmlFor="terms" className="text-sm font-medium text-gray-700">
                  I agree to <a href="#" className="text-brand-700 underline">terms & conditions</a>
                </label>
                <ErrorMessage name="terms" component="div" className="text-red-500 text-xs" />
              </div> */}
              <button type="submit" className="w-full p-2 text-white font-semibold rounded-md bg-brand-800 hover:bg-brand-600 transition-colors">
                {t('login.loginButton')}
              </button>
              <Link to="/auth/forget-password" className="text-center text-sm mt-4 text-brand-700 underline block">{t('forgetPassword.forgotPassword')}</Link>
              <p className="text-center text-xs mt-6 text-gray-500">{t('forgetPassword.footerText')}</p>
            </Form>
          )}
        </Formik>
        <div className="flex space-x-4">
          <img src={Dasbelt} alt="logo-Dasbelt" className="w-1/4" />
          <img src={Droom} alt="logo-droom" className="w-1/2 mx-2" />
          <img src={Gromo} alt="logo-Grom" className="w-1/3" />
          <img src={Tata} alt="logo-Tata" className="w-1/3" />
        </div>
      </div>
    </>
  );
};

export default Login;
