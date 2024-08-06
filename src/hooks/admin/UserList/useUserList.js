import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { useParams } from "react-router-dom";
import { toastifyMessage } from "@utils/CustomFunctions";
import { AuthContext } from "@context/AuthContext";

// Custom hook to fetch and manage user data
export const useUserList = () => {
  const { getAdminApiWallet, getAdminProductWallet, setSpin } =
    useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [whitelistData, setWhitelistData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [IPData,setIPData]=useState([]);
  const [total, setTotal] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  // Function to fetch user data from API
  const getUserList = useCallback(() => {
    setSpin(true);
    var params = { user_id: id !== undefined ? id : "" };
    API.get(URLS.GET_ALL_USER, params)
      .then((response) => {
        setSpin(false);
        if (response?.code === 200) {
          if (id !== undefined) {
            setUserDetail(response?.data[0]);
          } else {
            setUserData(response?.data);
          }
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setSpin(false);
      });
  }, []);

  // Fetch userwhitelist data from the API
  const fetchWhitelistData = useCallback(() => {
    API.get(URLS.GET_WHITE_LIST_BY_ID, {
      user_id: id,
    })
      .then((response) => {
        if (response?.code === 200) {
          setWhitelistData(response?.data?.result);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);


  const fetchIPDetailsData = useCallback((page) => {
    API.get(URLS.IP_Details, {
      user_id: id,
      page_number: page || 1
    })
      .then((response) => {
        if (response?.code === 200) {
          setIPData(response?.data?.result);
          setTotal(response?.data?.total);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  // Fetch PLAN DATA data from the API
  const fetchPlanData = useCallback(() => {
    API.get(`${URLS.GET_ALL_USER_PLAN}${id}`)
      .then((response) => {
        if (response?.code === 200) {
          setPlanData(response?.data);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const AddUserWalletAmountsApiAndProduct = (amount, type) => {
    let data;
    if (type == "api") {
      data = {
        user_id: id,
        type: "api",
        api_wallet_amount_balance: amount,
      };
    } else {
      data = {
        user_id: id,
        type: "",
        product_wallet_balance: amount,
      };
    }
    API.put(URLS.ADD_USER_AMOUNT_WALLET, data, true)
      .then((response) => {
        console.log(response,"AddWallet user")
        if (response?.code === 200) {
          getUserList();
          //update header wallet when added user credit wallet
          getAdminApiWallet();
          getAdminProductWallet();
          toastifyMessage(response?.message, "success");
        } else {
          toastifyMessage(response?.message, "error");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  // handle status
    const handleStatus = (status, id) => {
    const data = {
      user_id: id,
      status: status,
    };
    API.post(URLS.UPDATE_STATUS, data)
      .then((response) => {
        if (response?.code === 200) {
        toastifyMessage(response?.message, "success");
        } else {
        toastifyMessage(response?.message, "error");
        }
      })
      .catch((error) => {
      console.error("API Error:", error);
      });
  };

  // handle access
    const handleAccess = (control, id) => {
    const data = {
      user_id: id,
      access_control: control,
    };
    API.post(URLS.CONTROL_ACCESS, data)
      .then((response) => {
        if (response?.code === 200) {
          toastifyMessage(response?.message, "success");
        } else {
          toastifyMessage(response?.message, "error");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  // useEffect to fetch profile data on component mount
  useEffect(() => {
    getUserList();
    fetchWhitelistData();
    fetchIPDetailsData(currentPage);
  }, [getUserList, fetchWhitelistData,fetchIPDetailsData,currentPage]);

  // useMemo to memoize the returned value
  return useMemo(
    () => ({
      whitelistData,
      userData,
      handleStatus,
      handleAccess,
      getUserList,
      userDetail,
      fetchWhitelistData,
      AddUserWalletAmountsApiAndProduct,
      fetchPlanData,
      planData,
      setOpen,
      open,
      fetchIPDetailsData,
      IPData,
      setCurrentPage,
      currentPage,
      total,
    }),
    [
      userData,
      userDetail,
      whitelistData,
      fetchWhitelistData,
      fetchPlanData,
      planData,
      getUserList,
      setOpen,
      open,
      AddUserWalletAmountsApiAndProduct,
      fetchIPDetailsData,
      IPData,
      setCurrentPage,
      currentPage,
      total,
    ]
  );
};
