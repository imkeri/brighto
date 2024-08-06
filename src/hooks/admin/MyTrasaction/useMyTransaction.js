import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { AuthContext } from "@context/AuthContext";

// Custom hook to manage my tracsaction
export const useMyTransaction = () => {
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [transaction, setTransaction] = useState([])
    const [activeTab, setActiveTab] = useState("tab1");
    const [total, setTotal] = useState(1)
    const [page, setPage] = useState(1);
    const { setSpin } = useContext(AuthContext);
    // handle tabs
    const handleTabClick = (value) => {
        setActiveTab(value)
    }
    // handle off canvas
    const handleOffCanvas = (value) => {
        setShowOffCanvas(value)
    }
    // fetch transcation data
    const fetchApiTransecation = useCallback((user, email, pid, date, status, page) => {
        setSpin(true)
        API.get(URLS.MY_TRANSACTION, {
            user_id: user,
            email: email,
            date: date,
            page_number: page
        }).then(response => {
            console.log("response---11111", response)
            if (response?.code === 200) {
                setTransaction(response?.data?.result);
                setTotal(response?.data?.total)
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
        });
    }, [activeTab]);

    useEffect(() => {
        activeTab === "tab1" && fetchApiTransecation("", "", "", "", "", page)
    }, [activeTab, page, fetchApiTransecation])

    // useMemo to memoize the returned value
    return useMemo(() => ({
        activeTab,
        showOffCanvas,
        transaction,
        page,
        setPage,
        handleTabClick,
        handleOffCanvas,
        total,
        fetchApiTransecation
    }), [activeTab, showOffCanvas, transaction, page, setPage, handleTabClick, handleOffCanvas, total, fetchApiTransecation]);
}