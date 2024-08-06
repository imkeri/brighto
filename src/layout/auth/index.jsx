import { Routes, Route, Navigate } from "react-router-dom";
import {userRoutes} from "../../routes";
import LoginImage from "@assets/img/layout/login-video.mp4";
import { useTranslation } from "react-i18next";

export default function Auth() {
  const { t } = useTranslation();
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full shadow-lg bg-white h-full min-h-screen">
        <div className="bg-[#011627] text-white w-full md:w-2/3 p-10">
          <h1 className="text-4xl mt-2 md:mt-28 mb-8">{t('login.headinglogin')}</h1>
          <video src={LoginImage} alt="login-image"  width="600" height="300"autoPlay loop muted className="mb-8 mx-auto md:ml-24" />
          <div className="whitelabel-info">
            <p className="mx-8 md:ml-32">
              {t('login.info')}
            </p>
          </div>
        </div>
        <Routes>
          {getRoutes(userRoutes)}
          <Route
            path="/"
            element={<Navigate to="/auth/sign-in" replace />}
          />
        </Routes>
      </div>
    </>

  );
}
