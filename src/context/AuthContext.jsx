import React, { useCallback, createContext, useState } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
// Create the context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [apiWalletData, setApiWalletData] = useState([]);
  const [apiProductData, setApiProductData] = useState([]);
  const [profileDataSet,setProfileDataSet]= useState([])
  const [spin,setSpin] = useState(false);

  // Function to fetch API Wallet and product wallet data from API
  const getAdminApiWallet = useCallback(() => {
    API.get(URLS.GET_ADMIN_API_WALLET)
      .then((response) => {
        console.log(response,"WalletApi")
        if (response?.code === 200) {
          setApiWalletData(response?.data);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const getAdminProductWallet = useCallback(() => {
    API.get(URLS.GET_ADMIN_PRODUCT_WALLET)
      .then((response) => {
        console.log(response,"ProductAmount")
        if (response?.code === 200) {
          setApiProductData(response?.data);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getAdminApiWallet,
        getAdminProductWallet,
        apiWalletData,
        apiProductData,
        spin,
        setSpin,
        profileDataSet,
        setProfileDataSet
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
