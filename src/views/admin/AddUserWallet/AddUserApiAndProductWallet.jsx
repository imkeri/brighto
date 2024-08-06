import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "mdb-ui-kit/css/mdb.min.css";
import { useUserList } from "@hooks/admin/UserList/useUserList";

const AddUserApiAndProductWallet = () => {

  const { AddUserWalletAmountsApiAndProduct,userDetail,getUserList  } = useUserList();
  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1, "Please enter a valid amount greater than 0.")
      .required("Amount is required"),
  });

  const handleAddCredits = (amount, type) => {
    AddUserWalletAmountsApiAndProduct(amount, type);
  };


  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
        <div className="wallet mb-4">
          <div className="wallet-header text-xl mb-4">API Wallet</div>
          <div className="wallet-balance text-3xl mb-4 font-semibold">
            Balance ₹ {userDetail?.api_wallet_amount_balance}
          </div>
          <Formik
            initialValues={{ amount: "" }}
            validationSchema={walletValidationSchema}
            onSubmit={(values, { resetForm }) => {
              handleAddCredits(values.amount, "api");
              resetForm();
              getUserList ();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <label>Add Credits</label>
                <div className="add-credits flex">
                  <Field
                    type="number"
                    name="amount"
                    placeholder="Enter Amount here"
                    className="w-[300px] p-2 border border-gray-300 rounded mr-4"
                  />
                  <button
                    type="submit"
                    className="bg-[#f19357] text-white px-4 py-2 rounded hover:bg-brand-600"
                    disabled={isSubmitting}
                  >
                    Add
                  </button>
                </div>
                <ErrorMessage
                  name="amount"
                  component="span"
                  className="text-red-500"
                />
              </Form>
            )}
          </Formik>
        </div>
        <hr className="h-[30px] bg-gray-400 mb-[30px]"></hr>
        <div className="wallet">
          <div className="wallet-header text-xl mb-4">Product Wallet</div>
          <div className="wallet-balance text-3xl mb-4 font-semibold">
            Balance ₹ {userDetail?.product_wallet_balance}
          </div>
          <Formik
            initialValues={{ amount: "" }}
            validationSchema={walletValidationSchema}
            onSubmit={(values, { resetForm }) => {
              handleAddCredits(values.amount, "product");
              resetForm();
              getUserList ();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <label>Add Credits</label>
                <div className="add-credits flex">
                  <Field
                    type="number"
                    name="amount"
                    placeholder="Enter Amount here"
                    className="w-[300px] p-2 border border-gray-300 rounded mr-4"
                  />
                  <button
                    type="submit"
                    className="bg-[#f19357] text-white px-4 py-2 rounded hover:bg-brand-600"
                    disabled={isSubmitting}
                  >
                    Add
                  </button>
                </div>
                <ErrorMessage
                  name="amount"
                  component="span"
                  className="text-red-500"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddUserApiAndProductWallet;
