import { useCallback, useMemo, useState, useContext } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { AuthContext } from "@context/AuthContext";

// Custom hook to manage user tracsaction
export const useUserTransaction = () => {
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [ApiLogData, setApiLogData] = useState([]);
    const [activeTab, setActiveTab] = useState("tab1");
    const [total, setTotal] = useState(1)
    const [apiPage, setApiPage] = useState(1);
    const { setSpin } = useContext(AuthContext);
    // handle tabs  
    const handleTabClick = (value) => {
        setActiveTab(value)
    }
    // handle off canvas
    const handleOffCanvas = (value) => {
        setShowOffCanvas(value)
    }

    // Fetch API Log
    const fetchAPILog = useCallback((user, email, pid, date, status, page) => {
        setSpin(true)
        API.get(URLS.USER_API_LOGS, {
            user_id: user,
            email: email,
            pid: pid,
            date: date,
            status: status,
            page_number: page || 1
        }).then(response => {
            console.log(response, "responseApi log")
            if (response?.code === 200) {
                setApiLogData(response?.data?.result);
                setTotal(response?.data?.total)
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
            setSpin(false)
        });
    }, [activeTab]);

    // fetch transcation data
    const fetchApiTransecation = useCallback((user, email, pid, date, status, page) => {
        console.log(user, email, pid, date, status, page)
        setSpin(true)
        API.get(URLS.USER_TRANSACTION, {
            user_id: user,
            email: email,
            pid: pid,
            date: date,
            page_number: page || 1
        }).then(response => {
            if (response?.code === 200) {
                setApiLogData(response?.data?.result);
                setTotal(response?.data?.total)
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
        });
    }, [activeTab]);


    // useMemo to memoize the returned value
    return useMemo(() => ({
        showOffCanvas,
        handleOffCanvas,
        activeTab,
        handleTabClick,
        ApiLogData,
        apiPage,
        setApiPage,
        total,
        fetchAPILog,
        fetchApiTransecation
    }), [ApiLogData, apiPage, total, fetchAPILog, setApiPage, fetchApiTransecation,
        showOffCanvas, setShowOffCanvas, handleOffCanvas, activeTab, handleTabClick]);
};
