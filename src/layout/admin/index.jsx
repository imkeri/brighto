// Admin Component
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";
import { userRoutes, adminRoute } from "../../routes";
import ProtectedRoute from "@services/ProtectedRoute";
import { decodeToken } from "@utils/CustomFunctions";
import { usePlanApi } from "@hooks/user/PlanAPI/usePlanApi";


export default function Admin(props) {
  const loginUser = decodeToken();
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Dashboard");
  const { APIData } = usePlanApi()

  React.useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (APIData.length > 0) {
      const apiRoute = [loginUser?.userAuth?.role === "admin" ? adminRoute : userRoutes].find(route =>
        route.children && route.children.some(child => child.name === "Api's")
      );
      if (apiRoute) {
        const apiChild = apiRoute.children.find(child => child.name === "Api's");

        if (apiChild) {
          APIData.map(data => {
            var modifiedCategory = { ...data, layout: "/admin", icon: <MdFileCopy /> };
            var data2 = modifiedCategory.tbl_plan_lists.map(plan => ({
              ...plan,
              layout: "/admin",
              path: `${data?.category_name?.toLowerCase().replace(/\s+/g, '_')}/${plan?.service_name?.trim()?.replace(/\s+/g, '_')}=${plan?.id}`
            }));
            modifiedCategory.tbl_plan_lists = data2
            apiChild.children.push(modifiedCategory)
          });
        }
      }
    }
    getActiveRoute(location.pathname, loginUser?.userAuth?.role === "admin" ? adminRoute : userRoutes);
  }, [location.pathname, APIData]);

  // this function use for active route 
  const getActiveRoute = (location, routes) => {
    let activeRoute = "Dashboard";
    const findActiveRoute = (routeList) => {
      for (let route of routeList) {
        let fullPath = route.layout + "/" + (route.path || '');
        fullPath = fullPath.replace(/\/+/g, '/');
        if (fullPath?.startsWith(location)) {
          setCurrentRoute(route.name || route?.category_name || route?.service_name);
          return route.name;
        }
        if (route?.children?.length > 0 || route?.tbl_plan_lists?.length > 0 ) {
          const childActiveRoute =  route.children?.length > 0 ? findActiveRoute(route.children) : findActiveRoute(route?.tbl_plan_lists)
          if (childActiveRoute) {
            return childActiveRoute;
          }
        }
      }
      return null;
    };

    activeRoute = findActiveRoute(routes) || activeRoute;
    return activeRoute;
  };

  const getActiveNavbar = (routes, location) => {
    let activeNavbar = false;

    const findActiveNavbar = (routeList) => {
      for (let route of routeList) {
        let fullPath = route.layout + "/" + (route.path || '');
        fullPath = fullPath.replace(/\/+/g, '/');

        if (location?.includes(fullPath) && route.secondary) {
          activeNavbar = true;
        }
        if (route.children) {
          findActiveNavbar(route.children);
        }
      }
    };

    findActiveNavbar(routes);
    return activeNavbar;
  };


  // this function handle show routes
  const generateRouteElements = (route, parentKey) => {
    if (route.children) {
      return route.children.flatMap((child, childKey) => generateRouteElements(child, `${parentKey}-${childKey}`));
    } else {
      return (
        <Route path={route.path} element={<ProtectedRoute>{route.component}</ProtectedRoute>} key={parentKey} />
      );
    }
  };

  // handle route 
  const getRoutes = (routes) => {
    return routes.flatMap((route, key) => {
      if (route.layout === "/admin") {
        return generateRouteElements(route, key);
      }
      return [];
    });
  };


  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              loginUser={loginUser?.userAuth}
              brandText={currentRoute}
              secondary={getActiveNavbar(loginUser?.userAuth?.role === "admin" ? adminRoute : userRoutes)}
              {...rest}
            />
            <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                {getRoutes(loginUser?.userAuth?.role === "admin" ? adminRoute : userRoutes)}
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
