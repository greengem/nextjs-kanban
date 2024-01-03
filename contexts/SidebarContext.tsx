import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface SidebarContextType {
    toggled: boolean;
    toggleSidebar: () => void;
}

const defaultValue: SidebarContextType = {
    toggled: false,
    toggleSidebar: () => {},
};

const SidebarContext = createContext<SidebarContextType>(defaultValue);

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toggled, setToggled] = useState(false);

    const toggleSidebar = () => {
        setToggled(!toggled);
    };

    useEffect(() => {
    }, [toggled]);

    return (
        <SidebarContext.Provider value={{ toggled, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};
