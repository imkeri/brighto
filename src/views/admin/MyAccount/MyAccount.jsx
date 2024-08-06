import React, { useContext } from "react";
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
import { useUserAccount } from "@hooks/admin/UserAccount/useUserAccount";
import WalletHistory from "@components/tables/PaymentHistoryTable/WalletHistory";
import { AuthContext } from "@context/AuthContext";
import Spin from "@components/Spin/Index";

const MyAccount = () => {
  const { apiWalletData, apiProductData,spin } = useContext(AuthContext);
  const { AddWalletAmountsApiAndProduct } = useUserAccount();
  const { activeTab, handleTabClick } = TabActiveDeactive();

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1, "Please enter a valid amount greater than 0.")
      .required("Amount is required"),
  });

  const handleAddCredits = (amount, type) => {
    AddWalletAmountsApiAndProduct(amount, type);
  };
  

  return (
    <>
      <MDBTabs className="mb-3 text-2xl">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleTabClick("tab1")}
            active={activeTab === "tab1"}
          >
            Credits
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleTabClick("tab2")}
            active={activeTab === "tab2"}
          >
            Payment History
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        {activeTab === "tab1" ? (
          <>
          {spin && <Spin/>}
            <div className="bg-gray-100">
              <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
                <div className="wallet mb-4">
                  <div className="wallet-header text-xl mb-4">API Wallet</div>
                  <div className="wallet-balance text-3xl mb-4 font-semibold">
                    Balance ₹ {apiWalletData?.api_wallet_amount_balance}
                  </div>
                  <Formik
                    initialValues={{ amount: "" }}
                    validationSchema={walletValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                      handleAddCredits(values.amount, "api");
                      resetForm();
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="mb-2">
                          <label
                            className="block text-black-300 text-sm font-bold mb-1"
                            htmlFor="amount"
                          >
                            Add Credits
                          </label>
                          <Field
                            type="number"
                            name="amount"
                            placeholder="Enter Amount here"
                            className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                          />
                          <ErrorMessage
                            name="amount"
                            component="div"
                            className="text-red-500 text-xs italic"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-[#f19357] text-white px-4 py-2 rounded hover:bg-brand-600"
                          disabled={isSubmitting}
                        >
                          Add
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <hr className="h-[30px] bg-gray-400 mb-[30px]"></hr>
                <div className="wallet">
                  <div className="wallet-header text-xl mb-4">
                    Product Wallet
                  </div>
                  <div className="wallet-balance text-3xl mb-4 font-semibold">
                    Balance ₹ {apiProductData?.product_wallet_balance}
                  </div>
                  <Formik
                    initialValues={{ amount: "" }}
                    validationSchema={walletValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                      handleAddCredits(values.amount, "product");
                      resetForm();
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="mb-2">
                          <label
                            className="block text-black-300 text-sm font-bold mb-1"
                            htmlFor="amount"
                          >
                            Add Credits
                          </label>
                          <Field
                            type="number"
                            name="amount"
                            placeholder="Enter Amount here"
                            className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                          />
                          <ErrorMessage
                            name="amount"
                            component="div"
                            className="text-red-500 text-xs italic"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-[#f19357] text-white px-4 py-2 rounded hover:bg-brand-600"
                          disabled={isSubmitting}
                        >
                          Add
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {activeTab === "tab2" ? (
          <div>
            <WalletHistory />

          </div>
        ) : (
          ""
        )}
      </MDBTabsContent>
    </>
  );
};

export default MyAccount;
