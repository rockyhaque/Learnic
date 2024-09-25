import MenuItem from "./MenuItem";
import { FaUserFriends } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { LuSettings2 } from "react-icons/lu";

const AdminMenu = () => {
    return (
        <>
      <MenuItem
        icon={FaUserFriends}
        label="Manage Users"
        address="manage-users"
      />
      <MenuItem
        icon={SlNotebook}
        label="View All Materials"
        address="manage-all-materials"
      />
      <MenuItem
        icon={LuSettings2}
        label="All Session Maintenance"
        address="all-session-maintenance"
      />
      
    </>
    );
};

export default AdminMenu;