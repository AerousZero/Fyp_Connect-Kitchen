import React, { useState } from "react";
import Tab from "../../../components/common/Tab/index";
import TabContent from '../../../components/common/Tab/TabContent';

const TabList = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "For You" },
    { label: "Latest" },
    { label: "Saved" }
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            isActive={index === activeTab}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 cursor-pointer ${
              index === activeTab ? "bg-gray-300" : "bg-gray-100"
            }`}
          />
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab, index) => (
          activeTab === index && <TabContent key={index} label={tab.label} />
        ))}
      </div>
    </div>
  );
};

export default TabList;
