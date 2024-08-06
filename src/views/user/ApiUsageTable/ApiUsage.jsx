import React from "react";
import "mdb-ui-kit/css/mdb.min.css";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
} from "mdb-react-ui-kit";
import UserApiLogTable from "@components/tables/ApiUsageTable/UserApiLogTable";
import { useApiUsage } from "@hooks/user/ApiUsage/useApiUsage";
import Pagination from "@components/Pagination/Index";
import TransactionTable from "@components/tables/ApiUsageTable/TransactionTable";
import ExportCsvModal from "@components/Modal/UserModal/ExportCsvModal";
import { decodeToken } from "@utils/CustomFunctions";

const ApiUsage = () => {
    const { activeTab,
        handleTabClick,
        userApiData,
        userApiTransactionData,
        currentPage,
        totalPages,
        toggleModal,
        isModalOpen,
        setCurrentPage,
    } = useApiUsage();
    const { userAuth } = decodeToken();

    // const { activeTab, handleTabClick } = TabActiveDeactive();
    
    return (
        <>
            <MDBTabs className="mb-3 text-2xl">
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick("tab1")} active={activeTab === "tab1"}>
                        Api transaction
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick("tab2")} active={activeTab === "tab2"}>
                        Api Log
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                {activeTab === "tab1" && (<div>
                      
                    <div className="flex justify-end">
                    <button
                      onClick={toggleModal}
                      className="bg-[#f19357] text-white px-4 py-2 rounded mb-2 text-[20px] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  >Export to CSV</button>
                   </div>
                   <div>
                        {isModalOpen && (
                            <ExportCsvModal
                                handleModal={toggleModal} id={userAuth?.id}
                            />
                        )}
                        <TransactionTable DataofUserTransaction={userApiTransactionData} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrent={setCurrentPage}
                        />
                   
                    </div>
                    </div>
                )}
                {activeTab === "tab2" && (
                    <div>
                        <UserApiLogTable DataofUserApi={userApiData} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrent={setCurrentPage}
                        />
                    </div>
                )}
                {activeTab === "tab3" && <div>tab3</div>}
                {activeTab === "tab4" && <div>tab4 product Logs</div>}
            </MDBTabsContent>
        </>
    );
};

export default ApiUsage;
