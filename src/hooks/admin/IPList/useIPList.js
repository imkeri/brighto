import { useCallback, useEffect, useMemo, useState,useContext } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { toastifyMessage } from "@utils/CustomFunctions";
import { AuthContext } from "@context/AuthContext";
// Custom hook to fetch and manage IP list
export const useIPList = () => {
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [IPData, setIPData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [total, setTotal] = useState(1)
    const [Page, setPage] = useState(1)
    const {setSpin} = useContext(AuthContext);

    // handle tabs
    const handleTabClick = (value) => {
        setActiveTab(value)
    }
    // handle off canvas
    const handleOffCanvas = (value) => {
        setShowOffCanvas(value)
    }

    // Fetch IPslist data from the API
    const fetchIplistData = useCallback((user, ip, date, page) => {
        setSpin(true)
        API.get(URLS.GET_ALL_IP_HITS, {
            user_id: user,
            ip_address: ip,
            date: date,
            page_number: page
        }).then(response => {
            if (response?.code === 200) {
                setIPData(response?.data?.result);
                setTotal(response?.data?.total)
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
            setSpin(false)
        });
    }, [activeTab]);

    // fetch block APi list base on filter
    const fetchBlockIps = useCallback((user, ip, date, page) => {
        setSpin(true)
        API.get(URLS.GET_BLOCK_IP, {
            user_id: user,
            ip_address: ip,
            date: date,
            page_number: page
        }).then(response => {
            if (response?.code === 200) {
                setIPData(response?.data?.result);
                setTotal(response?.data?.total)
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
            setSpin(false)
        });
    }, [activeTab]);

    // handle status block and unblock IP
    const updateSatus = useCallback((id, status) => {
        setSpin(true)
        API.post(URLS.BLOCK_UNBLOCK_IP, {
            id: id,
            status: status
        }).then(response => {
            if (response?.code === 200) {
                toastifyMessage(response?.message, "success");
                fetchIplistData("", "", "", Page);
                setSpin(false)
            } else {
                toastifyMessage(response?.message, "error");
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
        });
    }, []);


    // handle functions based on active tab
    useEffect(() => {
        activeTab === "all" && fetchIplistData("", "", "", Page);
        activeTab === "block" && fetchBlockIps("", "", "", Page)
    }, [fetchIplistData, fetchBlockIps, activeTab]);

    // useMemo to memoize the returned value
    return useMemo(() => ({
        total,
        showOffCanvas,
        handleOffCanvas,
        IPData,
        fetchIplistData,
        activeTab,
        handleTabClick,
        fetchBlockIps,
        updateSatus,
        setPage
    }), [total,showOffCanvas, setShowOffCanvas, handleOffCanvas, activeTab, IPData, fetchIplistData, handleTabClick, fetchBlockIps, updateSatus,setPage]);
};
