import React, { useEffect, useState } from 'react';
import { useUserList } from '@hooks/admin/UserList/useUserList';
import AddUserApiAndProductWallet from '@views/admin/AddUserWallet/AddUserApiAndProductWallet';
import UserWhiteList from '@components/tables/UserWhiteList/Index';
import ApiPrice from '@components/tables/ApiPrice/Index';
import TransactionTable from '@components/tables/ApiUsageTable/TransactionTable';
import UserApiLogTable from '@components/tables/ApiUsageTable/UserApiLogTable';
import ExportCsvModal from "@components/Modal/UserModal/ExportCsvModal";
import { useUserTransaction } from '@hooks/admin/UserTransaction/useUserTransaction';
import Pagination from "@components/Pagination/Index";
import IPDetailsTable from '@components/tables/IPDetails/IPDetailsTable';

const UserDetail = () => {

    const { handleStatus, handleAccess, userDetail, whitelistData, planData, fetchPlanData, setOpen, open,IPData } = useUserList();
    const { fetchAPILog, ApiLogData, apiPage, setApiPage, total, fetchApiTransecation } = useUserTransaction();
    const [activeTab, setActiveTab] = useState('APITransactions');
   
console.log("Rajdl",IPData)
    // handle tabs
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    useEffect(() => {
        
        if (userDetail?.id && activeTab && apiPage) {
            activeTab === "APITransactions" && fetchApiTransecation(userDetail?.id, "", "", "", "", apiPage)
            activeTab === "APILogs" && fetchAPILog(userDetail?.id, "", "", "", "", apiPage)
        }
    }, [activeTab, apiPage, userDetail?.id])


    return (
        <div className="container mx-auto p-4 md:p-2">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2">User Detail</h2>
                        <div className="text-customGray-600">User id: {userDetail?.id}</div>
                        <div className="text-customGray-600">Email: {userDetail?.email}</div>
                        <div className="text-customGray-600">Comapny Name: {userDetail?.comapny_name}</div>
                    </div>
                    <div>
                        <div className="text-customGray-600">Name: {userDetail?.first_name} {userDetail?.last_name}</div>
                        <div className="text-customGray-600">Phone no: {userDetail?.phone}</div>
                        <div className="text-customGray-600">Address: {userDetail?.area}, {userDetail?.city}, {userDetail?.state}</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="text-customGray-600 mb-4 md:mb-0">API Wallet: ₹{userDetail?.api_wallet_amount_balance}</div>
                    <div className="text-customGray-600">Product Wallet: ₹{userDetail?.product_wallet_balance}</div>
                </div>
                <div className="mb-4">
                    <ul className="flex flex-wrap border-b">
                        <li className="-mb-px mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'APITransactions' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('APITransactions')}
                            >
                                API Transactions 
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'APILogs' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('APILogs')}
                            >
                                API Logs
                            </button>
                        </li>
                        {/* <li className="mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'ProductTransactions' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('ProductTransactions')}
                            >
                                Product Transactions
                            </button>
                        </li> */}
                        {/* <li className="mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'ProductLogs' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('ProductLogs')}
                            >
                                Product Logs
                            </button>
                        </li> */}
                        <li className="mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'APIPrice' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('APIPrice')}
                            >
                                API Price
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'Credits' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('Credits')}
                            >
                                Credits
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'IPDetails' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('IPDetails')}
                            >
                                IP Details
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'WhitelistIPs' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('WhitelistIPs')}
                            >
                                Whitelist IPs
                            </button>
                        </li>
                        <li className="mr-1">
                            <button
                                className={`tablinks py-2 px-4 font-semibold ${activeTab === 'Settings' ? 'border-indigo-500 text-indigo-600 border-l border-t border-r rounded-t' : ''}`}
                                onClick={() => handleTabClick('Settings')}
                            >
                                Settings
                            </button>
                        </li>
                    </ul>
                </div>
                {activeTab === 'APITransactions' && (
                    <div id="APITransactions" className="tabcontent">
                        {open && (
                            <ExportCsvModal
                                handleModal={() => setOpen(!open)} id={userDetail?.id}
                            />
                        )}
                        <div className='flex justify-end'>
                            <button className="bg-[#f19357] text-white px-4 py-2 rounded mb-2" onClick={() => setOpen(!false)}>
                                Export to CSV
                            </button>
                        </div>
                        <div>
                            <TransactionTable DataofUserTransaction={ApiLogData} />
                            <Pagination
                                currentPage={apiPage}
                                totalPages={total}
                                setCurrent={setApiPage}
                            />
                        </div>
                    </div>
                )}
                {activeTab === 'APILogs' && (
                    <div id="APILogs" className="tabcontent">
                        <UserApiLogTable DataofUserApi={ApiLogData} />
                        <Pagination
                            currentPage={apiPage}
                            totalPages={total}
                            setCurrent={setApiPage}
                        />
                    </div>
                )}
                {activeTab === 'ProductTransactions' && (
                    <div id="ProductTransactions" className="tabcontent">
                        {/* ProductTransactions content */}
                    </div>
                )}
                {activeTab === 'ProductLogs' && (
                    <div id="ProductLogs" className="tabcontent">
                        {/* ProductLogs content */}
                    </div>
                )}
                {activeTab === 'APIPrice' && (
                    <div id="APIPrice" className="tabcontent">
                        <ApiPrice data={planData} fetchPlanData={fetchPlanData} />
                    </div>
                )}
                {activeTab === 'Credits' && (
                    <div id="Credits" className="tabcontent">
                        {/* Credits content  Add API and PRODUCT wallet*/}
                        <AddUserApiAndProductWallet />
                    </div>
                )}
                {activeTab === 'IPDetails' && (
                    <div id="IPDetails" className="tabcontent">
                        <IPDetailsTable Data={IPData}/>
                        <Pagination
                                currentPage={apiPage}
                                totalPages={total}
                                setCurrent={setApiPage}
                            />
                    </div>
                )}
                {activeTab === 'WhitelistIPs' && (
                    <div id="WhitelistIPs" className="tabcontent">
                        <UserWhiteList data={whitelistData} type="admin" />
                    </div>
                )}
                {activeTab === 'Settings' && (
                    <div id="Settings" className="tabcontent">
                        <div>
                            <div className='mb-2 bg-gray-500 text-white p-2'>Plan Status</div>
                            <div>
                                <div className='flex w-full mt-3 border-b'>
                                    <div className='w-9/12'>
                                        Status
                                    </div>
                                    <div className="mt-1 flex space-x-4">
                                        <label className="flex items-center">
                                            <input type="radio" name="status" value="enable" defaultChecked={userDetail?.status === "enable"} onChange={(e) => handleStatus(e.target.value, userDetail?.id)} />
                                            <span className="ml-2 text-base">Active</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="status" value="disable" defaultChecked={userDetail?.status === "disable"} onChange={(e) => handleStatus(e.target.value, userDetail?.id)} />
                                            <span className="ml-2 text-base">Inactive</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='flex w-full my-2'>
                                    <div className='w-9/12'>
                                        Access Control
                                    </div>
                                    <div className="mt-1 flex space-x-4">
                                        <label className="flex items-center">
                                            <input type="radio" name="access_control" value="limited access" defaultChecked={userDetail?.access_control === "limited access"} onChange={(e) => handleAccess(e.target.value, userDetail?.id)} />
                                            <span className="ml-2 text-base">Limited Access</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="access_control" value="full access" defaultChecked={userDetail?.access_control === "full access"} onChange={(e) => handleAccess(e.target.value, userDetail?.id)} />
                                            <span className="ml-2 text-base">Full Access</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetail;



