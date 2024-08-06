import { useCallback, useEffect, useMemo, useState,useContext } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { AuthContext } from "@context/AuthContext";
// Custom hook to fetch and manage white list API
export const useWhiteList = () => {
    const [showModal, setShowModal] = useState(false);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [whitelistData, setWhitelistData] = useState([]);
    const {setSpin} = useContext(AuthContext);

    const handleModal = (value) => {
        setShowModal(value);
    };

    const handleOffCanvas = (value) => {
        setShowOffCanvas(value)
    }
    // Fetch whitelist data from the API
    const fetchWhitelistData = useCallback((user, ip, date, page) => {
        setSpin(true)
        API.get(URLS.GET_ALL_WHITELIST_IP, {
            user_id: user,
            ip_address: ip,
            date: date,
            page_number: page
        }).then(response => {
            console.log("GET_ALL_WHITELIST_IP", response);
            if (response?.code === 200) {
                setWhitelistData(response?.data?.result);
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
            setSpin(false)
        });
    }, []);

    useEffect(() => {
        fetchWhitelistData("", "", "", 1);
    }, [fetchWhitelistData]);
    // useMemo to memoize the returned value
    return useMemo(() => ({
        showOffCanvas,
        showModal,
        setShowModal,
        handleModal,
        handleOffCanvas,
        whitelistData,
        fetchWhitelistData
    }), [showOffCanvas, setShowOffCanvas, showModal, setShowModal, handleModal, handleOffCanvas, whitelistData,fetchWhitelistData]);
};
