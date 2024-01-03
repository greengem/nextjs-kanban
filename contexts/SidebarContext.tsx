import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
    isOpen: boolean;
    toggleDrawer: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <SidebarContext.Provider value={{ isOpen, toggleDrawer }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
