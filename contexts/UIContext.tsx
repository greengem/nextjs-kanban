import { createContext, useContext, useState, ReactNode } from 'react';

interface UIState {
    isBackgroundImageSelectorOpen: boolean;
    // Add other UI component states here
}

interface UIContextType {
    uiState: UIState;
    toggleBackgroundImageSelector: () => void;
    // Add other toggle functions or a generic toggle function
}

const defaultUIState: UIState = {
    isBackgroundImageSelectorOpen: false,
    // Initialize other states
};

const UIContext = createContext<UIContextType>({
    uiState: defaultUIState,
    toggleBackgroundImageSelector: () => {}, // Placeholder function
    // Add other initial toggle functions
});

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [uiState, setUIState] = useState(defaultUIState);

    const toggleBackgroundImageSelector = () => {
        setUIState(prevState => ({
            ...prevState,
            isBackgroundImageSelectorOpen: !prevState.isBackgroundImageSelectorOpen
        }));
    };

    return (
        <UIContext.Provider value={{ uiState, toggleBackgroundImageSelector }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUIContext = () => useContext(UIContext);
