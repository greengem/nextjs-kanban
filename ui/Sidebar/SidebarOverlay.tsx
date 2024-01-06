export default function SidebarOverlay({ 
    isVisible, onClick 
} : {
    isVisible: boolean; onClick: () => void;
}) {
    if (!isVisible) return null;

    return (
        <div onClick={onClick} className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-40 lg:hidden" />
    );
};
