import { useTranslation } from "react-i18next";
import Droom from "@assets/img/avatars/droomlogo.png";
import Gromo from "@assets/img/avatars/gromologo.png";
import Tata from "@assets/img/avatars/tatalogo.png";
import Dasbelt from "@assets/img/avatars/dasweltautologo.svg"
import { Link,useNavigate} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { URLS } from '@services/Urls';
import API from '@services/Api';
import { toastifyMessage } from "@utils/CustomFunctions";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
  });


  return (
    <div className="flex flex-col items-center justify-center bg-white p-10 w-full md:w-1/3">
      <Formik
        initialValues={{
            email:""
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            API.post(URLS.FORGET_PASSWORD_EMAIL, values)
              .then((response) => {
                console.log("response===  ", response)
                if (response?.code === 200) {
                    const unique_id = response?.data?.unique_id;
                    // setTimeout(() => {
                    //   navigate(`/auth/reset-password/${unique_id}`, { state: { email: values.email } });
                    // }, 1000);
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
      
        {({ isSubmitting }) => (
          <Form className="rounded-md shadow-lg p-8 text-left w-full max-w-sm mb-8">
            <p className="text-xl font-semibold border-b border-gray-200 pb-2">
              <span className="text-brand-700 font-bold">{t("forgetPassword.forgetLabel")}</span>
            </p>
            <div className="my-4">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">{t('common.email')}</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full p-2 text-white font-semibold rounded-md bg-brand-800 hover:bg-brand-600 transition-colors">
              {t('common.submit')}
            </button>
            <Link to="/auth/sign-in" className="text-center text-sm mt-4 text-brand-700 underline block">{t('common.backToLogin')}</Link>
            <p className="text-center text-xs mt-6 text-gray-500">{t('login.footerText')}</p>
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
  );
};

export default ForgetPassword;
