import React from "react";
import MainDashboard from "@views/admin/default";
import {
  MdDashboard,
  MdHome,
  MdMessage,
  MdPerson,
  MdPeople,
  MdOutlineSyncAlt,
  MdOutlinePermIdentity,
  MdLockReset,
  MdLineStyle
} from "react-icons/md";
import { BiSolidHelpCircle } from "react-icons/bi";
import SignIn from "@views/auth/Login";
import ForgetPassword from "@views/auth/ForgetPassword"
import Profile from "@views/user/profile/Index"
import WhiteListIP from "@views/user/WhitelistIP/WhiteListIP";
import NotFound from "@views/error/Index"
import Resetpassowrd from "@views/admin/Resetpassowrd/Index"
import AddUser from "@views/admin/AddUser/Index"
import UserList from "@views/admin/UserList/Index"
import UserDetail from "@views/admin/UserList/UserDetail"
import WhiteListIpAdmin from "@views/admin/WhiteListIpAdmin/Index"
import MyAccount from "@views/admin/MyAccount/MyAccount";
import IPList from "@views/admin/IPList/Index"
import MyPlan from "@views/admin/MyPlan/Index"
import PanAPI from "@views/user/PanAPI/Index";
import AadharVerification from "@views/user/AadharAPI/AadharVerificationWithOTP/Index";
import AadharValidation from "@views/user/AadharAPI/AadharVerificationWithoutOTP/AadharValidation";
import CompanyAPI from "@views/user/CompanyAPI/Index";
import VehicalAPI from "@views/user/VehicalAPI/Index";
import BankAPI from "@views/user/BankAPI/Index";
import GstPublicAPI from "@views/user/GstPublicAPI/Index";
import PassPortVerification from "@views/user/PassPortAPI/Index";
import VoterIDVerification from "@views/user/VoterIDVerification/Index";
import EmployeeEPFOVerification from "@views/user/EmployeeVerificationAPI/Index";
import FoodLisenseVerification from "@views/user/FoodLicenseVerification/Index";
import ImportExportVerification from "@views/user/ImportExportVerification/Index";
import MSMEVerification from "@views/user/MSMEverification/Index";
import TaxComplaince from "@views/user/TaxCompliances/Index";
import ApiUsage from "@views/user/ApiUsageTable/ApiUsage.jsx";
import UserTransaction from "@views/admin/UserTransaction/Index"
import MyTransaction from "@views/admin/MyTransaction/Index"
import ResetPassword from "@views/auth/ResetPassword";

export const userRoutes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
  },
  {
    name: "Forget Password",
    layout: "/auth",
    path: "forget-password",
    component: <ForgetPassword />,
  },
  {
    name: "Reset Password",
    layout: "/auth",
    path: "reset-password/:id",
    component: <ResetPassword />,
  },
  {
    name: "",
    layout: "/auth",
    path: "*",
    component: <NotFound />,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Apis Menu",
    layout: "/admin",
    icon: <MdMessage className="h-6 w-6" />,
    secondary: true,
    children: [
      {
        name: "Api Usage",
        layout: "/admin",
        path: "ApiUsage",
        icon: <MdHome className="h-6 w-6" />,
        component: <ApiUsage />,
      },
      {
        name: "",
        layout: "/admin",
        path: "pan_verification_api/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <PanAPI/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "adhaar_verification_with_otp/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <AadharVerification/>,
      },

      {
        name: "",
        layout: "/admin",
        path: "adhaar_verification_without_otp/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <AadharValidation/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "company_verification/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <CompanyAPI/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "vehicle_related_apis/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <VehicalAPI/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "gst_verification/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <GstPublicAPI />,
      },
      {
        name: "",
        layout: "/admin",
        path: "bank/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <BankAPI/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "passport_verification/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <PassPortVerification/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "voter_id_verification/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <VoterIDVerification/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "epfo_apis/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <EmployeeEPFOVerification/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "food_license_verification/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <FoodLisenseVerification/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "import_export_verification/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <ImportExportVerification/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "msme_verification/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <MSMEVerification/>,
      },
      {
        name: "",
        layout: "/admin",
        path: "tax_complaince_check/:name",
        icon: <MdHome className="h-6 w-6" />,
        component: <TaxComplaince/>,
      },
      
      
      {
        name: "Api's",
        layout: "/admin",
        icon: <BiSolidHelpCircle className="h-6 w-6" />,
        children: [],
      },
    ],
  },

  // {
  //   name: "Products Menu",
  //   layout: "/admin",
  //   icon: <MdMessage className="h-6 w-6" />,
  //   secondary: true,
  //   children: [
  //     {
  //       name: "Products",
  //       layout: "/admin",
  //       path: "Products",
  //       icon: <MdHome className="h-6 w-6" />,
  //       component: <Index />,
  //     },
  //   ]
  // },
  {
    name: "Support",
    layout: "/admin",
    icon: <MdMessage className="h-6 w-6" />,
    secondary: true,
    children: [
      {
        name: "My Account",
        layout: "/admin",
        path: "my-account",
        icon: <MdHome className="h-6 w-6" />,
        component: <Profile />,
      },
      {
        name: "Whitelist IP",
        layout: "/admin",
        path: "WhitelistIP",
        icon: <BiSolidHelpCircle className="h-6 w-6" />,
        component: <WhiteListIP />,
      },
      {
        name: "",
        layout: "/admin",
        path: "*",
        component: <NotFound />,
      },

    ]
  }

];

export const adminRoute = [
  {
    name: "",
    layout: "/admin",
    path: "*",
    component: <NotFound />,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: " User Accounts",
    layout: "/admin",
    path: "user-accounts",
    icon: <MdPeople className="h-6 w-6" />,
    component: <UserList />,
  },
  {
    name: "",
    layout: "/admin",
    path: "user-deatil/:id",
    icon: <MdPeople className="h-6 w-6" />,
    component: <UserDetail />,
  },
  {
    name: "Add User Manually",
    layout: "/admin",
    path: "add-user-manually",
    icon: <MdPerson className="h-6 w-6" />,
    component: <AddUser />,
  },
  {
    name: " User Transactions",
    layout: "/admin",
    path: "user-transactions",
    icon: <MdOutlineSyncAlt className="h-6 w-6" />,
    component: <UserTransaction />,
  },
  {
    name: " My Transactions",
    layout: "/admin",
    path: "my-transactions",
    icon: <MdOutlineSyncAlt className="h-6 w-6" />,
    component: <MyTransaction />,
  },
  {
    name: "My Plan",
    layout: "/admin",
    path: "my-plan",
    icon: <MdLineStyle className="h-6 w-6" />,
    component: <MyPlan />,
  },
  // {
  //   name: "TruBank",
  //   layout: "/admin",
  //   path: "tru-bank",
  //   icon: <MdFlood className="h-6 w-6" />,
  //   component: <MainDashboard />,
  // },
  {
    name: "My Account",
    layout: "/admin",
    path: "my-account",
    icon: <MdOutlinePermIdentity className="h-6 w-6" />,
    component: <MyAccount />,
  },
  {
    name: "Whitelist IP",
    layout: "/admin",
    path: "whitelist-iP",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <WhiteListIpAdmin />,
  },
  {
    name: "IP Hits",
    layout: "/admin",
    path: "ip-hitst",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <IPList />,
  },
  {
    name: "Reset Password",
    layout: "/admin",
    path: "reset-password",
    icon: <MdLockReset className="h-6 w-6" />,
    component: <Resetpassowrd />,
  },
];


