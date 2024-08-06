import { useState, useMemo } from "react";

export const TabActiveDeactive = (initialTab = "tab1") => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabClick = (value) => {
    if (value === activeTab) {
      return;
    }
    setActiveTab(value);
  };

  return useMemo(
    () => ({
      activeTab,
      handleTabClick
    }),
    [activeTab]
  );
}