import useAuth from "../../hooks/useAuth";
import TutorMenu from "../../pages/Dashboard/Menu/TutorMenu";
import MenuItem from "../../pages/Dashboard/Menu/MenuItem";
import { BsGraphUp } from "react-icons/bs";
import { RiHomeLine } from "react-icons/ri";
import useRole from "../../hooks/useRole";
import StudentMenu from "../../pages/Dashboard/Menu/StudentMenu";
import AdminMenu from "../../pages/Dashboard/Menu/AdminMenu";

const Sidebar = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();

  return (
    <div className="w-64 h-full bg-gradient-to-r from-teal-50 to-sky-50 rounded p-3 shadow-lg pt-10">
      <div className="flex items-center space-x-4 p-2 mb-5">
        <img className="h-12 rounded-full" src={user?.photoURL} alt="User Profile" />
        <div>
          <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
            {user?.displayName}
          </h4>
          <span className="text-sm tracking-wide flex items-center space-x-1">
            <svg
              className="h-4 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-gray-600">
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </span>
          </span>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        <MenuItem label="Home" address="/" icon={RiHomeLine} />
        {/* <MenuItem label="Statistics" address="/dashboard" icon={BsGraphUp} /> */}

        {role === "student" && <StudentMenu />}
        {role === "tutor" && <TutorMenu />}
        {role === "admin" && <AdminMenu />}
      </ul>
    </div>
  );
};

export default Sidebar;
