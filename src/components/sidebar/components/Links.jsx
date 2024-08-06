import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdFileCopy } from "react-icons/md";
import { usePlanApi } from "@hooks/user/PlanAPI/usePlanApi";

export function SidebarLinks(props) {
  let location = useLocation();
  let navigate = useNavigate();
  const { routes } = props;
  const { APIData } = usePlanApi()
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (routeName) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [routeName]: !prevState[routeName],
    }));
  };

  const activeRoute = (routeName) => {
    return location.pathname.endsWith(routeName)
  };

  const handleNavigation = (route) => {
    if (route.children || route?.tbl_plan_lists) {
      toggleDropdown(route.name || route?.category_name);
    } else {
      navigate(route.layout + "/" + route.path || route.PID);
    }
  };

  useEffect(() => {
    if (APIData.length > 0) {
      const apiRoute = routes.find(route =>
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
  }, [APIData])

  const removeDuplicates = (array) => {
    const map = new Map();
    array.forEach(item => {
      map.set(item.name || item?.category_name || item?.service_name, item);
    });
    return Array.from(map.values());
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === "/admin") {
        return (
          <div key={index}>
            {
              (route.name || route?.category_name || route?.service_name) && <div
                className="relative mb-3 flex items-center hover:cursor-pointer"
                onClick={() => handleNavigation(route)}
              >
                <li className="my-[3px] flex justify-between cursor-pointer w-full items-center px-2">
                  <div className="flex items-center ">
                    <span
                      className={`${activeRoute(route.path) ? "font-bold text-brand-700 dark:text-white" : "font-medium text-gray-600"}`}
                    >
                      {route.icon ? route.icon : <span className="text-xs text-orange-600">post</span>}{" "}
                    </span>
                    {
                      route.name && <p
                        className={`leading-1 ml-2 text-base flex ${activeRoute(route.path) ? "font-bold text-navy-700 dark:text-white " : "font-medium text-gray-600"}`}
                      >
                        {route.name}
                      </p>
                    }
                    {
                      route?.category_name && <p
                        className={`leading-1 ml-2 text-sm flex ${activeRoute(route.path) ? "font-bold text-navy-700 dark:text-white " : "font-medium text-gray-600"}`}
                      >
                        {route?.category_name}
                      </p>
                    }
                    {
                      route?.service_name && <p
                        className={`leading-1 ml-2  text-xs flex ${activeRoute(route.path) ? "font-bold text-navy-700 dark:text-white " : "font-medium text-gray-600"}`}
                      >
                        {route?.service_name}
                      </p>
                    }
                  </div>
                  {(route.children || route?.tbl_plan_lists) && (
                    <span className="ml-auto">
                      {dropdownOpen[route.name || route?.category_name || route?.service_name] ? <MdKeyboardArrowUp className="h-6 w-6" /> : <MdKeyboardArrowDown className="h-6 w-6" />}
                    </span>
                  )}
                </li>
                {activeRoute(route.path) ? (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </div>
            }
            {(route.children || route?.tbl_plan_lists) && (dropdownOpen[route.name || route?.category_name || route?.service_name]) && (
              <div className="ml-6">
                {route.children?.length > 0 ? createLinks(removeDuplicates(route.children)) : createLinks(removeDuplicates(route?.tbl_plan_lists))}
              </div>
            )}
          </div>
        );
      }
    });
  };

  return <ul>{createLinks(routes)}</ul>;
}

export default SidebarLinks;
