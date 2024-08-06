import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import { userRoutes, adminRoute } from "../../routes";
import logo from "@assets/img/layout/Brighto-Logo.png";
import { decodeToken } from "@utils/CustomFunctions";

const Sidebar = ({ open, onClose }) => {
  const loginUser = decodeToken();

  return (
    <div
      className={`sm:none w-[300px] duration-175 linear fixed !z-50 flex h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className="logo ml-[20px] ">
        <img src={logo} alt="Logo" className="w-[150px] mt-7" />
      </div>
      <div className="mt-7 mb-7 h-px bg-gray-300 dark:bg-white/30" />
      <ul className="mb-auto pt-1 overflow-auto">
        <Links routes={loginUser?.userAuth?.role === "admin" ? adminRoute : userRoutes} />
      </ul>
    </div>
  );
};

export default Sidebar;
