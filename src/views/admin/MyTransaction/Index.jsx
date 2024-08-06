import React from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
} from "mdb-react-ui-kit";
import { useMyTransaction } from '@hooks/admin/MyTrasaction/useMyTransaction';
import ApiTrasaction from '@components/tables/MyTransaction/ApiTrasaction';
import OffCanvas from '@components/Offcanvas/Admin/Index';
import Pagination from "@components/Pagination/Index";

const Index = () => {

    const { handleTabClick, activeTab, transaction, page, setPage, total, handleOffCanvas, showOffCanvas, fetchApiTransecation } = useMyTransaction();
    return (
        <div>
            <OffCanvas handleOffCanvas={() => handleOffCanvas(!showOffCanvas)} open={showOffCanvas} fetchlistData={fetchApiTransecation} type="myTransaction" page={page} setPage={setPage} />
            <MDBTabs className="mb-3 text-2xl">
                <div className='flex justify-between w-full'>
                    <div className="flex">
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick("tab1")} active={activeTab === "tab1"}>
                                Api transaction
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick("tab2")} active={activeTab === "tab2"}>
                                Product transaction
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </div>
                    <div>
                        <button className="bg-[#f19357] text-white px-4 py-2 rounded mb-4" onClick={() => handleOffCanvas(!showOffCanvas)}>
                            Filter
                        </button>
                    </div>
                </div>

            </MDBTabs>
            <MDBTabsContent>
                {activeTab === "tab1" && <>
                    <ApiTrasaction ApiLogData={transaction} apiPage={page} setApiPage={setPage} total={total} handleOffCanvas={handleOffCanvas} showOffCanvas={showOffCanvas} fetchAPILog={fetchApiTransecation} />
                    <Pagination
                        currentPage={page}
                        totalPages={total}
                        setCurrent={setPage}
                    />
                </>}
                {activeTab === "tab2" && <></>}
            </MDBTabsContent>
        </div>
    )
}

export default Index
