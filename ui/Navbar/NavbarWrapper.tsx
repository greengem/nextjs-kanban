import NavbarTitle from "./NavbarTitle";
import ColourPicker from "./ColourPicker";
import NavbarAvatar from "./NavbarAvatar";
import NavbarSidebarToggle from "./NavbarSidebarToggle";

export default function NavbarWrapper({
    userName, userImage
} : {
    userName: string, userImage: string
}) {
    return (
        <>
            <div className="flex items-center">
                <NavbarSidebarToggle />
                <NavbarTitle />
            </div>
            
            <div className="flex gap-5 items-center justify-between">
                <ColourPicker />
                <NavbarAvatar userName={userName} userImage={userImage} />
            </div>
        </>
    );
}
