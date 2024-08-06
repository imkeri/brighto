import { useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContext";
import { decodeToken } from "@utils/CustomFunctions";

const ApiAndProductCards = () => {
  const {
    getAdminApiWallet,
    getAdminProductWallet,
    apiWalletData,
    apiProductData,
  } = useContext(AuthContext);
  const loginUser = decodeToken();


  useEffect(() => {
    getAdminApiWallet();
    getAdminProductWallet();
  }, [getAdminApiWallet, getAdminProductWallet]);

  return (
    <>
     <div className="flex justify-between space-x-4">

   
  <div className="bg-white rounded-lg border-2 border-gray-500 flex items-center">
    {/* {loginUser?.userAuth?.role === "admin" ? "" : */}
    <div
     className="bg-[#f19357] rounded-tl-[5px] rounded-bl-[5px] text-white font-bold text-xs py-3 px-3 flex flex-col items-center justify-center">
      <span className="text-[17px]">+</span>
      <span className="font-semibold">ADD</span>
    </div>
    <div className="flex flex-col text-left p-2 flex-grow">
      <div className="text-xs font-semibold text-gray-600">API Wallet:</div>
      <div className="text-lg font-bold">₹ {apiWalletData?.api_wallet_amount_balance}</div>
    </div>
    <button className="ml-2 text-gray-500 hover:text-gray-700 p-2">
    </button>
  </div>
  <div className="bg-white rounded-lg border-2 border-gray-500 flex items-center">
  
    <div className="bg-[#f19357] rounded-tl-[5px] rounded-bl-[5px] text-white font-bold text-xs py-3 px-3 flex flex-col items-center justify-center">
      <span className="text-[17px] ">+</span>
      <span className="font-semibold">ADD</span>
    </div>
    <div className="flex flex-col text-left p-2 flex-grow">
      <div className="text-xs font-semibold text-gray-600">Product Wallet</div>
      <div className="text-lg font-bold">₹ {apiProductData?.product_wallet_balance}</div>
    </div>
    <button className="ml-2 text-gray-500 hover:text-gray-700 p-2">
    </button>
  </div>
</div>

    </>
  );
};

export default ApiAndProductCards;
