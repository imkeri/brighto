import { FaListAlt } from "react-icons/fa";
import Widget from "@components/widget/Widget";
import { useDashboard } from "@hooks/admin/DashBoard/useDashboard";
import { decodeToken } from "@utils/CustomFunctions";

const Dashboard = () => {
  const { usersData, transactionData, apiCount, totalApiAccess } = useDashboard();
  const loginUser = decodeToken();


  return (<>
    {loginUser?.userAuth?.role === "admin" ?
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 ">
        <Widget
          icon={<FaListAlt className="h-7 w-7" />}
          title={"Users"}
          subtitle={`${usersData ? usersData : "0"}`}
        />
        <Widget
          icon={<FaListAlt className="h-6 w-6" />}
          title={"Transactions"}
          subtitle={`₹ ${transactionData[0]?.total_price ? transactionData[0]?.total_price : "0.00"}`}
        />
      </div>

      :
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        <Widget
          icon={<FaListAlt className="h-7 w-7" />}
          title={"Total API’s hit"}
          subtitle={`${totalApiAccess[0]?.total_api_count ? totalApiAccess[0]?.total_api_count : "0"}`}
        />
        <Widget
          icon={<FaListAlt className="h-6 w-6" />}
          title={"Total API’s Access"}
          subtitle={`${apiCount ? apiCount : "0"}`}
        />
      </div>
    }

  </>);
};

export default Dashboard;
