import { useCallback, useEffect, useMemo, useState } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { decodeToken } from "@utils/CustomFunctions";

export const useApiUsage = () => {
  const { userAuth } = decodeToken();
  const [userApiData, setUserApiData] = useState([]);
  const [userApiTransactionData, setUserApiTransactionData] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleTabClick = (value) => {
    setActiveTab(value);
    setCurrentPage(1); // Reset to first page on tab change
  };
  //Csv modal handle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
};
  //fetch User Api Logs from Api
  const fetchUserApiLogs = useCallback(
    (page) => {
      API.get(URLS.USER_API_LOGS, {
        user_id: userAuth.id,
        page_number: page,
      })
        .then((response) => {
          if (response?.code === 200) {
            setUserApiData(response?.data?.result);
            setTotalPages(response?.data?.total || 1); // set total pages
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    },
    [userAuth.id]
  );

  //fetch User Api Transaction Logs from Api
  const fetchApiTransactions = useCallback(
    (page) => {
      API.get(URLS.USER_TRANSACTION, {
        user_id: userAuth.id,
        page_number: page,
      })
        .then((response) => {
          console.log(response, "APITransctionRes");
          if (response?.code === 200) {
            setUserApiTransactionData(response?.data?.result);
            setTotalPages(response?.data?.total || 1); // set total pages
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    },
    [userAuth.id]
  );

  useEffect(() => {
    fetchUserApiLogs(currentPage);
    fetchApiTransactions(currentPage);
  }, [fetchUserApiLogs, currentPage, activeTab]);

  return useMemo(
    () => ({
      userApiData,
      fetchUserApiLogs,
      activeTab,
      handleTabClick,
      currentPage,
      totalPages,
      fetchApiTransactions,
      userApiTransactionData,
      toggleModal,
      isModalOpen,
      setCurrentPage
    }),
    [
      activeTab,
      userApiData,
      fetchUserApiLogs,
      handleTabClick,
      currentPage,
      totalPages,
      fetchApiTransactions,
      userApiTransactionData,
      toggleModal,
      isModalOpen,
      setCurrentPage
    ]
  );
};
