import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { decodeToken } from "@utils/CustomFunctions";


function ProtectedRoute({ children }) {
    let userData = decodeToken();
    const location = useLocation();

    if (!userData) {
        return <Navigate to="/auth/sign-in" state={{ from: location?.pathname }} />;
    }

     return children;
}
export default ProtectedRoute;
