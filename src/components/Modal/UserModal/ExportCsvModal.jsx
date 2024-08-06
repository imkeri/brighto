import React,{useContext} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from '@services/Api';
import { URLS } from '@services/Urls';
import { toastifyMessage ,decodeToken} from "@utils/CustomFunctions";
import {ExportEcelFile} from "@utils/ExportCsv"
import Spin from '@components/Spin/Index';
import { AuthContext } from '@context/AuthContext';

const ExportCsvModal = ({ handleModal ,id}) => {

    const { spin, setSpin } = useContext(AuthContext);
  // Validation schema for date fields
  const validationSchema = Yup.object({
    start_date: Yup.date()
      .required("Start Date is required")
      .nullable(),
    end_date: Yup.date()
      .required("End Date is required")
      .nullable()
      .min(Yup.ref('start_date'), "End Date cannot be before Start Date"),
  });

  return (
    <>
    {spin && <Spin/>}
      <div className="bg-black bg-opacity-25 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-[500px]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">Export Data</h3>
            </div>
            <div className="relative flex-auto">
              <Formik
                initialValues={{
                  user_id:id,
                  start_date: "",
                  end_date: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log("values",values)
                    setSpin(true)
                  console.log(values);
                  API.get(URLS.USER_TRANSACTION_EXPORT, values)
                    .then((response) => {
                      console.log("response===  ", response);
                      if (response?.code === 200 && response?.data?.length> 0) {
                        toastifyMessage(response?.message, "success");
                        ExportEcelFile(response?.data)
                        handleModal(false);
                        setSpin(false)
                      } else {
                        if(response?.code === 200 && response?.data?.length === 0){
                            handleModal(false);
                            setSpin(false)
                            toastifyMessage("No Data Found", "error");
                        }
                        else{
                        toastifyMessage(response?.message, "error");
                        handleModal(false);
                        setSpin(false)
                        }
                      }
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                      setSpin(false)
                    });
                }}
              >
                {({ isSubmitting }) => (
                    
                  <Form className="rounded px-4 pt-4 pb-8 w-full">
                    <div className="mb-4">
                      <label
                        className="block text-black-300 text-sm font-bold mb-1"
                        htmlFor="start_date"
                      >
                        Start Date
                      </label>
                      <Field
                        type="date"
                        name="start_date"
                        className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                      />
                      <ErrorMessage
                        name="start_date"
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-black-300 text-sm font-bold mb-1"
                        htmlFor="end_date"
                      >
                        End Date
                      </label>
                      <Field
                        type="date"
                        name="end_date"
                        className="appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                      <ErrorMessage
                        name="end_date"
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>
                    <div className="flex items-center p-2 rounded-b">
                      <button
                        type="submit"
                        className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        disabled={isSubmitting}
                      >
                        Export
                      </button>
                      <button
                        type="button"
                        className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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

export default ExportCsvModal;
