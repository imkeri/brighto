import React, { useContext } from "react";
import moment from "moment";
import { useUserAccount } from "@hooks/admin/UserAccount/useUserAccount";
import { AuthContext } from "@context/AuthContext";
import Spin from "@components/Spin/Index";
import Pagination from "@components/Pagination/Index";

const WalletHistory = () => {
  const { paymentHistoryData, setCurrentPage, currentPage, total } =
    useUserAccount();
  const { spin } = useContext(AuthContext);

  return (
    <>
      {spin && <Spin />}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#f19357] text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">S No.</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">API Wallet</th>
              <th className="py-3 px-6 text-left">Product Wallet</th>
            </tr>
          </thead>
          <tbody className="text-customGray-700 text-sm">
            {paymentHistoryData.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center">
                  No data found
                </td>
              </tr>
            ) : (
              paymentHistoryData.map((value, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    {currentPage == 1 ? index + 1 : (currentPage - 1) *(50) + (index + 1)}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {moment(value?.created_at).format(
                      "ddd MMM DD YYYY HH:mm:ss"
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {value.transaction_type === "api_wallet"
                      ? `₹ ${value.price}`
                      : "--"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {value.transaction_type === "pro_api_wallet"
                      ? `₹ ${value.price}`
                      : "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={total}
          setCurrent={setCurrentPage}
        />
      </div>
    </>
  );
};

export default WalletHistory;
