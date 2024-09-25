import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      

      {/* {user && (
        <li>
          <NavLink to="/contact">Contact Us</NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink to="/updateProfile">Update Profile</NavLink>
        </li>
      )} */}

      {user ? (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <div>
            <img
              className="w-5 md:w-10"
              src="https://i.ibb.co/w6pMT0P/ebook.png"
              alt=""
            />
          </div>
          <div>
            <Link
              to="/"
              className="btn btn-ghost text-xl hidden md:block lg:block pt-2"
            >
              Learnic
            </Link>
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="flex justify-center items-center gap-3">
              <div className="avatar online">
                <div className="w-10 rounded-full ring ring-customTeal ring-offset-base-100 ring-offset-0">
                  <img src={user.photoURL} referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            <div className="ml-3">
              <a onClick={logout} className="btn btn-sm bg-rose-500 text-white">
                <IoMdLogOut size={20} />
              </a>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="btn btn-sm">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
