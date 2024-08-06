import { React, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "mdb-ui-kit/css/mdb.min.css";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
} from "mdb-react-ui-kit";
import { TabActiveDeactive } from "@hooks/admin/TableTabHandler/TabActiveDeactive";
import { decodeToken } from "@utils/CustomFunctions";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { toastifyMessage } from "@utils/CustomFunctions";

const EditProfileModal = ({ handleModal, ProfileData, updateProfile }) => {
  const { userAuth } = decodeToken();
  const [OTPResponse, setOTPResponse] = useState("");
  const { activeTab, handleTabClick } = TabActiveDeactive();

  //validation  for Name
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'First Name should contain only letters')
      .required('First Name is required'),
    last_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Last Name should contain only letters')
      .required('Last Name is required'),
  });

  //validation schema for phone
  const validationSchemaForPhone = Yup.object({
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number is not valid, it should be 10 digits')
      .required('Phone Number is required')
  });

  //validation schema for phone and OTP
  const validationSchemaForPhoneAndOTP = Yup.object({
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number is not valid, it should be 10 digits').required("Phone number is required."),
    otp: Yup.string().required("Enter Your OTP No."),
  });

  return (
    <div className="bg-black bg-opacity-25 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-[500px]">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold">Edit Profile </h3>
            <span
              className="cursor-pointer text-2xl font-semibold"
              onClick={() => handleModal(false)}
            >
              X
            </span>
          </div>
          <div className="relative flex-auto">
            <>
              <MDBTabs className="mb-3 text-2xl">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleTabClick("tab1")}
                    active={activeTab === "tab1"}
                  >
                    Edit Name
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleTabClick("tab2")}
                    active={activeTab === "tab2"}
                  >
                    Edit Phone Number
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
              <MDBTabsContent>
                {activeTab === "tab1" ? (
                  <>
                    <div>
                      <Formik
                        initialValues={{
                          first_name: ProfileData?.first_name || "",
                          last_name: ProfileData?.last_name || "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={updateProfile}
                      >
                        {({ }) => (
                          <Form className="rounded px-4 pt-4 pb-8 w-full">
                            <div className="mb-4">
                              <label
                                className="block text-black-300 text-sm font-bold mb-1"
                                htmlFor="first_name"
                              >
                                First Name
                              </label>
                              <Field
                                type="text"
                                name="first_name"
                                placeholder="Enter IP"
                                className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                              />
                              <ErrorMessage
                                name="first_name"
                                component="div"
                                className="text-red-500 text-xs italic"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-black-300 text-sm font-bold mb-1"
                                htmlFor="last_name"
                              >
                                Last Name
                              </label>
                              <Field
                                type="text"
                                name="last_name"
                                placeholder="Enter last_name"
                                className="appearance-none border rounded w-full py-2 px-1 text-black"
                              />
                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="text-red-500 text-xs italic"
                              />
                            </div>
                            <div className="flex items-center p-2 rounded-b">
                              <button
                                type="submit"
                                className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              >
                                Add
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {activeTab === "tab2" ? (
                  <div>
                    <Formik
                      initialValues={
                        OTPResponse.code === 200
                          ? {
                            // sent data for get otp
                            user_id: userAuth?.id,
                            phone: ProfileData?.phone || "",
                          }
                          : {
                            // send data for verify otp
                            user_id: userAuth?.id,
                            phone: ProfileData?.phone || "",
                            otp: "",
                          }
                      }
                      validationSchema={
                        OTPResponse.code === 200
                          ? validationSchemaForPhoneAndOTP
                          : validationSchemaForPhone
                      }
                      onSubmit={(values) => {
                        {
                          //  function to Verify otp on mobile no.
                          OTPResponse.code === 200
                            ? API.post(URLS.VERIFY_OTP, values)
                              .then((response) => {
                                if (response?.code === 200) {
                                  updateProfile({ phone: values?.phone })
                                  toastifyMessage(
                                    response?.message,
                                    "success"
                                  );
                                  handleModal(false);

                                } else {
                                  toastifyMessage(response?.message, "error");
                                }
                              })
                              .catch((error) => {
                                console.error("Error :", error);
                              })
                            :
                            //function to Send otp on mobile no.
                            API.post(URLS.SEND_OTP_ON_PHONE, values)
                              .then((response) => {
                                if (response?.code === 200) {
                                  setOTPResponse(response);
                                  toastifyMessage(
                                    response?.message,
                                    "success"
                                  );
                                } else {
                                  toastifyMessage(response?.message, "error");
                                }
                              })
                              .catch((error) => {
                                console.error("Error :", error);
                              });
                        }
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form className="rounded px-4 pt-4 pb-8 w-full">
                          {OTPResponse.code === 200 ? (
                            <div className="mb-4">
                              <label
                                className="block text-black-300 text-sm font-bold mb-1"
                                htmlFor="phone"
                              >
                                Phone Number
                              </label>
                              <Field
                                readOnly
                                type="text"
                                name="phone"
                                placeholder="Enter phone number"
                                className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                              />
                              <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-500 text-xs italic"
                              />
                            </div>
                          ) : (
                            <div className="mb-4">
                              <label
                                className="block text-black-300 text-sm font-bold mb-1"
                                htmlFor="phone"
                              >
                                Phone Number
                              </label>
                              <Field
                                type="text"
                                name="phone"
                                placeholder="Enter phone number"
                                className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                              />
                              <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-500 text-xs italic"
                              />
                            </div>
                          )}

                          {OTPResponse.code === 200 ? (
                            <div className="mb-4">
                              <label
                                className="block text-black-300 text-sm font-bold mb-1"
                                htmlFor="otp"
                              >
                                OTP
                              </label>
                              <Field
                                type="text"
                                name="otp"
                                placeholder="Enter otp number"
                                className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                              />
                              <ErrorMessage
                                name="otp"
                                component="div"
                                className="text-red-500 text-xs italic"
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          {OTPResponse.code === 200 ? (
                            <div className="flex items-center p-2 rounded-b">
                              <button
                                type="submit"
                                className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                Verify OTP
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center p-2 rounded-b">
                              <button
                                type="submit"
                                className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                Send OTP
                              </button>
                            </div>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                ) : (
                  ""
                )}
              </MDBTabsContent>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
