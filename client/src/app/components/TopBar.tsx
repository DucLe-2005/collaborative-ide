"use client";

import React from "react";
import { Bell, Settings, User } from "lucide-react";

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function TopBar({ sidebarOpen, setSidebarOpen }: TopBarProps) {
  const [hasHovered, setHasHovered] = React.useState(false);
  const [indicator, setIndicator] = React.useState("w-[20%]");

  const handleClick = () => {
    setSidebarOpen(!sidebarOpen);
    setHasHovered(false); // Reset hover effect after toggle
  };

  const handleMouseEnter = () => {
    if (sidebarOpen && hasHovered) {
      setIndicator("w-[20%] bg-gray-300");
    } else if (!sidebarOpen && hasHovered) {
      setIndicator("w-[40%] bg-transparent");
    }
  };

  const handleMouseLeave = () => {
    if (sidebarOpen) {
      setHasHovered(true);
      setIndicator("w-[40%] bg-gray-300");
    } else {
      setHasHovered(true);
      setIndicator("w-[20%] bg-transparent");
    }
  };

  // Update width on sidebar toggle
  React.useEffect(() => {
    if (sidebarOpen) {
      setIndicator("w-[40%] bg-gray-300");
    } else {
      setIndicator("w-[20%] bg-transparent");
    }
  }, [sidebarOpen]);

  return (
    <div
      className="fixed top-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 z-40"
      style={{
        left: "0",
        transition: "left 0.3s ease-in-out",
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-2">
          {/* Add your title or logo here */}
          <button
            className="cursor-pointer h-10 w-10 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity duration-100"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="h-4.5 w-5 border border-gray-300 rounded-[2px]">
              <div
                className={`${indicator}  border-r border-gray-300 h-full transition-all duration-100 ease-in-out`}
              ></div>
            </div>
          </button>

          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Real-Time IDE
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
