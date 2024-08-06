import React, { useEffect } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
} from "mdb-react-ui-kit";
import { useUserTransaction } from '@hooks/admin/UserTransaction/useUserTransaction';
import ApiLog from '@components/DataRow/ApiLog';
import ApiTransaction from '@components/DataRow/ApiTransaction';

const Index = () => {

  const { handleTabClick, activeTab, fetchAPILog, ApiLogData, apiPage,
    setApiPage, total, handleOffCanvas, showOffCanvas, fetchApiTransecation } = useUserTransaction();


  useEffect(() => {
    activeTab === "tab2" && fetchAPILog("", "", "", "", "", apiPage)
    activeTab === "tab1" && fetchApiTransecation("", "", "", "", "", apiPage)
  }, [activeTab, apiPage]);
  
  return (
    <div>
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
        {/* <MDBTabsItem>
          <MDBTabsLink onClick={() => handleTabClick("tab3")} active={activeTab === "tab3"}>
            Product Transactions
          </MDBTabsLink>
        </MDBTabsItem> */}
        {/* <MDBTabsItem>
          <MDBTabsLink onClick={() => handleTabClick("tab4")} active={activeTab === "tab4"}>
            Product Logs
          </MDBTabsLink>
        </MDBTabsItem> */}
      </MDBTabs>
      <MDBTabsContent>
        {activeTab === "tab1" && <ApiTransaction ApiLogData={ApiLogData} apiPage={apiPage} setApiPage={setApiPage} total={total} handleOffCanvas={handleOffCanvas} showOffCanvas={showOffCanvas} fetchAPILog={fetchApiTransecation} />}
        {activeTab === "tab2" && <ApiLog ApiLogData={ApiLogData} apiPage={apiPage} setApiPage={setApiPage} total={total} handleOffCanvas={handleOffCanvas} showOffCanvas={showOffCanvas} fetchAPILog={fetchAPILog} />}
        {activeTab === "tab3" && <div>tab3</div>}
        {activeTab === "tab4" && <div>tab4 product Logs</div>}
      </MDBTabsContent>
    </div>
  )
}

export default Index
