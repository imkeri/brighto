import React from 'react'
import "mdb-ui-kit/css/mdb.min.css";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
} from "mdb-react-ui-kit";
import { useIPList } from '@hooks/admin/IPList/useIPList';
import IPList from "@components/tables/IPList/IPList"
import BlockLits from '@components/tables/IPList/BlockLits';
import OffCanvas from '@components/Offcanvas/Index';
import Pagination from "@components/Pagination/Index";

const Index = () => {
    const { IPData, activeTab, handleTabClick, showOffCanvas, handleOffCanvas, fetchIplistData, fetchBlockIps, updateSatus, total, page, setPage } = useIPList();

    return (
        <div>
            <OffCanvas handleOffCanvas={() => handleOffCanvas(!showOffCanvas)} open={showOffCanvas} fetchlistData={activeTab === "block" ? fetchBlockIps : fetchIplistData} />
            <MDBTabs className="mb-3 text-2xl">
                <div className='flex justify-between w-full'>
                    <div className="flex">
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleTabClick("all")}
                                active={activeTab === "all"}
                            >
                                All IPs
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleTabClick("block")}
                                active={activeTab === "block"}
                            >
                                Blocked IPs
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
                {
                    activeTab === "all" ?
                        <IPList data={IPData} handleStatus={updateSatus} />
                        : <BlockLits data={IPData} />
                }
                <Pagination
                    currentPage={page}
                    totalPages={total}
                    setCurrent={setPage}
                />
            </MDBTabsContent>
        </div>
    )
}

export default Index
