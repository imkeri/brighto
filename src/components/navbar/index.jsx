import React, { useContext, useState } from "react";
import Dropdown from "@components/dropdown";
import { FiAlignJustify, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import avatar from "@assets/img/avatars/avatar4.png";
import { useAuth } from "@hooks/auth/useAuth";
import ApiAndProductCards from "@components/card/WalletCards/ApiAndProductCards";
import { decodeToken } from "@utils/CustomFunctions";
import BookDemoModal from "@components/Modal/UserModal/BookDemoModal";
import { AuthContext } from "../../context/AuthContext";
const imageURL = import.meta.env.VITE_IMAGE_URL;
const Navbar = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onOpenSidenav, brandText } = props;
  const { logOut } = useAuth();
  const { userAuth } = decodeToken();
  const { profileDataSet } = useContext(AuthContext)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (<>
    {
      isModalOpen && <BookDemoModal handleModal={toggleModal} />
    }
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize text-black hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      {userAuth?.role === "admin" ? "" :
        <button
          onClick={toggleModal}
          className="flex items-center text-black-600 border border-red-700 font-bold uppercase text-sm px-4 py-2 mr-1">
          <FiPhone className="mr-2" /> Book a Demo Call
        </button>
      }

      <ApiAndProductCards />
      <div className="relative mt-[3px] flex h-[61px] w-[100px] flex-grow items-center justify-end gap-2 rounded-full md:flex-grow-0 md:gap-1  xl:gap-2">
        <span
          className="flex justify-center items-center rounded-full cursor-pointer text-xl shadow-xl bg-white text-gray-600 w-10 h-10  dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={(profileDataSet?.profile_photo && profileDataSet?.profile_photo !== undefined) ? imageURL + profileDataSet?.profile_photo : userAuth?.profile_photo ? imageURL + userAuth?.profile_photo : avatar}
              alt="Elon Musk"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {profileDataSet?.first_name || userAuth?.first_name}  {profileDataSet.last_name || userAuth?.last_name}
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />
              <div className="flex flex-col p-4">
                <Link
                  to="/admin/my-account"
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </Link>
                <Link
                  to="/auth/sign-in"
                  onClick={logOut}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in"
                >
                  Log Out
                </Link>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  </>);
};

export default Navbar;
