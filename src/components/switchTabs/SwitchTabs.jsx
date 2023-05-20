import React, {useState} from "react";
import "./style.scss";

const SwitchTabs = ({data, onTabChange}) => {
  const [selectedTab, setSelectedTab] = useState(0); // for active class
  const [left, setLeft] = useState(0); // to move animated background

  const activeTab = (tab, index) => { 
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{left: left}}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
