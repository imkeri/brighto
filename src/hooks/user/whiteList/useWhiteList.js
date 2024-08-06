import { useCallback, useEffect, useMemo, useState } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { decodeToken } from "@utils/CustomFunctions";
import { toastifyMessage } from "@utils/CustomFunctions";

// Custom hook to fetch and manage white list API
export const useWhiteList = () => {
    const {userAuth}  = decodeToken();
    const [showModal, setShowModal] = useState(false);
    const [whitelistData, setWhitelistData] = useState([]);

    const handleModal = (value) => {
        setShowModal(value);
    };

    // Fetch whitelist data from the API
    const fetchWhitelistData = useCallback(() => {
        API.get(URLS.GET_WHITE_LIST_BY_ID, {
            user_id: userAuth?.id
        }).then(response => {
            console.log("response:::",response)
            if (response?.code === 200) {
                setWhitelistData(response?.data?.result);
            }
        }).catch(error => {
            console.error('API Error:', error);
        });
    }, []);

    const deleteWhiteIPData = useCallback((id) => {
        API.delete(URLS.DELETE_WHITE_LIST_IP, {
            id:id,
            user_id: userAuth?.id
        }).then(response => {
            if (response?.code === 200) {
                fetchWhitelistData();
                toastifyMessage(response?.message, "success");
            }else{
                toastifyMessage(response?.message, "success");
            }
        }).catch(error => {
            console.error('API Error:', error);
        });
    }, []);
    

    useEffect(() => {
        fetchWhitelistData();
    }, [fetchWhitelistData]);
    // useMemo to memoize the returned value
    return useMemo(() => ({
        showModal,
        setShowModal,
        handleModal,
        whitelistData,
        fetchWhitelistData,
        deleteWhiteIPData
    }), [ showModal, setShowModal, handleModal, whitelistData,fetchWhitelistData,deleteWhiteIPData]);
};
