import React, { useState, createContext, useContext, ReactNode } from 'react';

interface SidebarContextType {
  isSidebarVisible: boolean;
  isSlimSidebar: boolean;
  toggleSidebar: () => void;
  toggleSlimSidebar: () => void;
}

const SidebarVisibilityContext = createContext<SidebarContextType>({
  isSidebarVisible: true,
  isSlimSidebar: false,
  toggleSidebar: () => {},
  toggleSlimSidebar: () => {},
});

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isSlimSidebar, setSlimSidebar] = useState(false);

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
