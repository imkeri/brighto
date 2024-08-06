import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdDownload, MdContentCopy } from "react-icons/md";
import { pan_verification_api } from '@utils/Filed'
import { useParams } from 'react-router-dom';
import API from '@services/Api';
import { toastifyMessage, handleCopyClick, decodeToken, downloadPDF } from "@utils/CustomFunctions";;
import Table from 'react-bootstrap/Table';
import * as Yup from 'yup';
import { renderTableRows } from '@utils/CustomComponent';
import { AuthContext } from '@context/AuthContext';
import Spin from '@components/Spin/Index';
import moment from 'moment';

const Index = () => {
  const { name } = useParams();
  const [service_name, id] = name?.split("=");
  const { userAuth } = decodeToken();
  const [data, setData] = useState("");
  const { spin, setSpin } = useContext(AuthContext);

  // dynamic initial value 
  const initialValues = pan_verification_api[service_name]?.fileds.reduce((values, field) => {
    values[field.name] = '';
    return values;
  }, {});

  // dynamic valiadtion schema
  const validationSchema = pan_verification_api[service_name]?.fileds.reduce((schema, field) => {
    if (field.require) {
      if (field?.name === "name" || field?.name === "state" || field?.name === "client_name") {
        schema[field.name] = Yup.string().matches(/^[A-Za-z\s]+$/, `${field.label} should contain only letters`).required(`${field.label} is required`)
      } else if (field.name === 'email') {
        schema[field.name] = Yup.string().matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 'Enter valid email').required(`${field.label} is required`);
      } else if (field.name === 'phone') {
        schema[field.name] = Yup.string()
          .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
          .required(`${field.label} is required`);
      } else {
        schema[field.name] = Yup.string().required(`${field.label} is required`);
      }
    } else {
      if (field.name === 'email') {
        schema[field.name] = Yup.string().matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 'Enter valid email');
      } else if (field.name === 'phone') {
        schema[field.name] = Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits');
      } else {
        schema[field.name] = Yup.string();
      }
    }
    return schema;
  }, {});
  const formValidationSchema = Yup.object().shape(validationSchema);

  useEffect(() => {
    setData(""); // state update when route change
  }, [service_name]);


  return (
    <>
      {spin && <Spin />}
      <div className="max-w-8xl mx-auto bg-white shadow-md rounded-lg">
        <div className="py-6 px-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4 border-b">
            {pan_verification_api[service_name]?.formLabel}
          </h3>
          <Formik
            enableReinitialize={true}
            validationSchema={formValidationSchema}
            initialValues={{ "plan_id": id, "user_id": userAuth?.id, services: service_name.toLowerCase().replace(/ /g, '_'), ...initialValues }}
            onSubmit={(values) => {
              console.log("values", values)
              // handle post API functions
              setSpin(true)
              API.post(pan_verification_api[service_name]?.APIURL, values)
                .then((response) => {
                  console.log("response", response)
                  setSpin(false)
                  if (response?.code === 200) {
                    var res = response?.data?.data
                    console.log("res", res)
                    const obj = {
                      "UserID": res?.user_id,
                      "application": res?.application_number,
                      "UserName": res?.name,
                      "Email": res?.email,
                      "LeanderName": res?.client_name,
                      "Location": res?.state,
                      "Product": service_name.toLowerCase().replace(/ /g, '_'),
                      "Date&Time": moment(res?.created_at).format('ddd MMM DD YYYY HH:mm:ss'),
                      "RatePerCheck": response?.data?.transaction?.price
                    }
                    const cleanedString = response?.data?.data?.response?.slice(1, -1);
                    const properJsonString = cleanedString.replace(/\\"/g, '"');
                    const result = JSON.parse(properJsonString);
                    if (result.status === "SUCCESS" || result.status === 200) {
                      toastifyMessage(response?.message, "success");
                      setData({ ...result, data: { ...obj, ...result?.data } })
                    } else if (result.status === "UNAUTHORISED" || result.status === "UNAUTHORIZED") {
                      toastifyMessage(result?.message, "error");
                    } else {
                      toastifyMessage(result?.errors[0]?.message, "error");
                    }
                  } else {
                    toastifyMessage(response?.message, "error");
                  }
                })
                .catch((error) => {
                  setSpin(false)
                  console.error("Error:", error);
                });
            }}
          >
            {() => (
              <Form>
                {
                  pan_verification_api[service_name]?.fileds?.map((value, index) => {
                    return (
                      <>
                        <div className='m-2' key={index}>
                          <label htmlFor={value?.name} className="block text-sm font-medium text-customGray-700">{value?.label}</label>
                          <Field
                            key={index}
                            type={value.name === "application_number" ? "number":"text"}
                            id={value?.name}
                            name={value?.name}
                            placeholder={value?.Placeholder}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <ErrorMessage name={value?.name} component="div" className="text-red-500 text-xs" />
                        </div>
                      </>
                    )
                  })
                }
                <div className='mt-4 mx-2'>
                  <button type="submit" className=" py-2 px-4 bg-[#f19357] text-white rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
          {
            data && <div className='my-3'>
              <h4 className='bg-black text-white p-3'>Output</h4>
              <div className='flex items-center justify-between p-3'>
                <button onClick={() => downloadPDF(service_name, setSpin)}><MdDownload /></button>
                <button onClick={() => handleCopyClick(data)}><MdContentCopy /></button>
              </div>
              <Table striped hover>
                <tbody id='table-to-pdf'>
                  {renderTableRows(data, ['status', 'data'])}
                </tbody>
              </Table>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Index;
