import { useMemo } from "react";
import API from "@services/Api";
import { URLS } from "@services/Urls";
import { toastifyMessage } from "@utils/CustomFunctions";
import { userRoutes } from "../../routes";
// Custom hook to fetch and manage auth
export const useAuth = () => {

    // Function to handle logout
    const logOut = () => {
        API.post(URLS.LOGOUT, {})
            .then(response => {
                console.log("response", response);
                if (response?.code === 200) {
                    localStorage.clear();
                    toastifyMessage(response?.message, "success");
                    const apiRoute = userRoutes.find(route =>
                        route.children && route.children.some(child => child.name === "Api's")
                    );
                    if (apiRoute) {
                        const apiChild = apiRoute.children.find(child => child.name === "Api's");
                        if (apiChild) {
                            apiChild.children = []
                        }
                    }

                }
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    };

    // useMemo to memoize the returned value
    return useMemo(() => ({
        logOut
    }), [logOut]);
};
