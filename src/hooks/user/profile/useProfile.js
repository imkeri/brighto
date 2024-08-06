import { useCallback, useEffect, useMemo, useState, useRef, useContext } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { toastifyMessage } from "@utils/CustomFunctions";
import { AuthContext } from "../../../context/AuthContext";

// Custom hook to fetch and manage profile data
export const useProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const {setProfileDataSet} = useContext(AuthContext)

  const handleModal = (value) => {
    setShowModal(value);
  };

  // Function to fetch profile data from API
  const getProfileData = useCallback(() => {
    API.get(URLS.GET_PROFILE_BY_ID)
      .then((response) => {
        console.log("response", response);
        if (response?.code === 200) {
          setProfileData(response?.data?.data);
          setProfileDataSet(response?.data?.data)
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  // function to Update user profile
  const updateProfileData = (values) => {
    API.put(URLS.PROFILE_UPDATE, values, true)
      .then((response) => {
        if (response?.code === 200) {
          toastifyMessage(response?.message, "success");
          getProfileData();
          setShowModal(false);
        } else {
          toastifyMessage(response?.message, "error");
        }
      })
      .catch((error) => {
        console.error("Error updating profile data:", error);
      });
  };
  //Function to Update Profile Image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toastifyMessage("Please upload a valid image file.", "error");
        return;
      }
      const formData = new FormData();
      formData.append("photo", file);
      API.put(URLS.PROFILE_UPLOAD, formData, false)
        .then((response) => {
          if (response?.code === 200) {
            toastifyMessage(response?.message, "success");
            getProfileData();
          } else {
            toastifyMessage(response?.message, "error");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };


  // useEffect to fetch profile data on component mount
  useEffect(() => {
    getProfileData();
  }, []);

  // useMemo to memoize the returned value
  return useMemo(
    () => ({
      profileData,
      getProfileData,
      handleModal,
      setShowModal,
      showModal,
      handleFileChange,
      fileInputRef,
      updateProfileData,
    }),
    [
      profileData,
      getProfileData,
      handleModal,
      setShowModal,
      showModal,
      updateProfileData,
      handleFileChange,
      fileInputRef,
    ]
  );
};
