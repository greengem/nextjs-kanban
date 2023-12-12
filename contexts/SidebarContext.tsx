import React, { useState, createContext, useContext, ReactNode } from 'react';

interface SidebarContextType {
  isSidebarVisible: boolean;
  isSlimSidebar: boolean;
  toggleSidebar: () => void;
  toggleSlimSidebar: () => void;
}

const SidebarVisibilityContext = createContext<SidebarContextType>({
  isSidebarVisible: false,
  isSlimSidebar: true,
  toggleSidebar: () => {},
  toggleSlimSidebar: () => {},
});

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isSlimSidebar, setSlimSidebar] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleSlimSidebar = () => {
    setSlimSidebar(!isSlimSidebar);
  };

  return (
    <SidebarVisibilityContext.Provider value={{ isSidebarVisible, isSlimSidebar, toggleSidebar, toggleSlimSidebar }}>
      {children}
    </SidebarVisibilityContext.Provider>
  );
};

export const useSidebarVisibility = (): SidebarContextType => {
  return useContext(SidebarVisibilityContext);
};
