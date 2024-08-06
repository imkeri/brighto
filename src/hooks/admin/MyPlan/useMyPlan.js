import { useCallback, useEffect, useMemo, useState,useContext } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { AuthContext } from "@context/AuthContext";

// Custom hook to fetch and manage my plan 
export const useMyPlan = () => {
    const [showModal, setShowModal] = useState(false);
    const [categoryData,setCategoryData] = useState([]);
    const [allPlan,setAllPlan] = useState([])
    const { setSpin} = useContext(AuthContext);

    const handleModal = (value) => {
        setShowModal(value);
    };

    // Fetch CATEGORY data from the API
    const fetchCategoryData = useCallback(() => {
        setSpin(true)
        API.get(URLS.GET_CATEGORY).then(response => {
            console.log("GET_CATEGORY", response);
            if (response?.code === 200) {
                setCategoryData(response?.data)
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
            setSpin(false)
        });
    }, []);

    const getPlanList = useCallback(() => {
        setSpin(true)
        API.get(URLS.GET_ALL_PLAN).then(response => {
            console.log("GET_ALL_PLAN", response);
            if (response?.code === 200) {
                setAllPlan(response?.data)
                setSpin(false)
            }
        }).catch(error => {
            console.error('API Error:', error);
            setSpin(false)
        });
    }, []);
    useEffect(() => {
        fetchCategoryData();
        getPlanList();
    }, [fetchCategoryData,getPlanList]);

    // useMemo to memoize the returned value
    return useMemo(() => ({
        allPlan,
        showModal,
        categoryData,
        setShowModal,
        handleModal,
        fetchCategoryData,
        getPlanList
    }), [showModal,categoryData,allPlan, setShowModal, handleModal,fetchCategoryData,getPlanList]);
};
