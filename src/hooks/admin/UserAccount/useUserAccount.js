import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { decodeToken } from "@utils/CustomFunctions";
import { toastifyMessage } from "@utils/CustomFunctions";
import { AuthContext } from "@context/AuthContext";

export const useUserAccount = () => {
  const { userAuth } = decodeToken();
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const { getAdminApiWallet, getAdminProductWallet,setSpin} = useContext(AuthContext);
  const [total, setTotal] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Function to fetch API and Payment history data from API
  const getPaymentHistory = useCallback((page) => {
    setSpin(true)
    API.get(URLS.GET_PAYMENT_HISTORY,{
      page_number: page || 1
    })
      .then((response) => {
        if (response?.code === 200) {
          setPaymentHistoryData(response?.data?.result);
          setTotal(response?.data?.total)
          setSpin(false)
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setSpin(false)
      });
  }, []);

  // Add both Api Amount and wallet amount
  const AddWalletAmountsApiAndProduct = (amount, type) => {
    setSpin(true)
    let data;
    if (type == "api") {
      data = {
        user_id: userAuth.id,
        type: "api",
        api_wallet_amount_balance: amount,
      };
    } else {
      data = {
        user_id: userAuth.id,
        type: "",
        product_wallet_balance: amount,
      };
    }
    API.put(URLS.ADD_ADMIN_WALLET, data,true)
      .then((response) => {
        console.log(response,"AddWallet Admin")
        if (response?.code === 200) {
          toastifyMessage(response?.message, "success");
          // Refresh Payment History data after adding amount
          getPaymentHistory();
          getAdminProductWallet();
          getAdminApiWallet()
          setSpin(false)
        }
        else {
          setSpin(false)
          toastifyMessage(response?.message, "error");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setSpin(false)
      });
  };


  useEffect(() => {
    getPaymentHistory(currentPage);
  }, [getPaymentHistory,currentPage]);

  return useMemo(
    () => ({
      paymentHistoryData,
      AddWalletAmountsApiAndProduct,
      setCurrentPage,
      currentPage,
      total
    }),
    [paymentHistoryData,setCurrentPage,currentPage,total]
  );
};
