import API from "@services/Api"
import { URLS } from "@services/Urls"
import { useCallback, useEffect, useMemo ,useState} from "react";
import { decodeToken } from "@utils/CustomFunctions";

export const useDashboard =()=>{
  const { userAuth } = decodeToken();
const [usersData,setUsersData]=useState([]);
const [transactionData,setTransactionData]=useState([]);
const [apiCount,setApiCount]=useState([]);
const [totalApiAccess,setTotalApiAccess]=useState([]);


// Dashboard Admin Apis
const getUserDashBoardData = useCallback(() => {
    API.get(URLS.GET_DASHBOARD_USERS)
      .then((response) => {
        if (response?.code === 200) {
            setUsersData(response?.data);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const getTransactionBoardData = useCallback(() => {
    API.get(URLS.GET_DASHBOARD_TRANSACTIONS)
      .then((response) => {
        if (response?.code === 200) {
            setTransactionData(response?.data)
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  //Dashboard Use Api
  const getApiCount = useCallback(() => {
    API.get(URLS.API_COUNT,{
      user_id: userAuth.id,
    })
      .then((response) => {
        if (response?.code === 200) {
          setApiCount(response?.data)
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);
  const getTotalApiAcess = useCallback(() => {
    API.get(URLS.TOTAL_API_ACCESS,{
      user_id: userAuth.id,
    })
      .then((response) => {
        if (response?.code === 200) {
          setTotalApiAccess(response?.data)
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

useEffect(()=>{
    getUserDashBoardData();
    getTransactionBoardData();
    getApiCount();
    getTotalApiAcess();
},[])

return useMemo (()=>({
    getUserDashBoardData,
     usersData,
     getTransactionBoardData,
     transactionData,
     getApiCount,
     apiCount,
     getTotalApiAcess,
     totalApiAccess
}),[getUserDashBoardData,usersData,getTransactionBoardData,transactionData,getApiCount,apiCount,getTotalApiAcess,totalApiAccess]);

}