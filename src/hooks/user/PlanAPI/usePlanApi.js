import { useCallback, useEffect, useMemo, useState } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";

// Custom hook to fetch and manage user plan
export const usePlanApi = () => {

    const [APIData,setAPIData] = useState([])


    // Function to fetch user plan from API
    const getPlanApiData = useCallback(() => {                         
        API.get(URLS.USER_GET_ALL_PLAN)
            .then(response => {
                console.log("response", response);
                if (response?.code === 200) {
                    setAPIData(response?.data)
                }
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    }, []);

    // useEffect to fetch user plan on component mount
    useEffect(() => {
        getPlanApiData();
    }, [getPlanApiData]);

    // useMemo to memoize the returned value
    return useMemo(() => ({
        APIData,
        getPlanApiData
    }), [APIData,getPlanApiData]);
};