import { Link } from "react-router";
import { NavLink } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
const navitems = [
  {
    path: "/",
    pathName: "Home",
  },
  {
    path: "/about",
    pathName: "About",
  },
  {
    path: "/notice",
    pathName: "Notice",
  },
  {
    path: "/result",
    pathName: "Result",
  },
  {
    path: "/dashboard",
    pathName: "Dashboard",
  },
];  

const Navbar = () => {
  const { user } = useLoggedInUser();
  const userRole = user?.data?.role;

  const filteredNavItems = navitems.filter(
    (item) => item.path !== "/dashboard" || userRole === "admin",
  );

  return (
    <div className="navbar px-0">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* mobile menu */}
            {filteredNavItems?.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.pathName}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <Link className="text-xl font-semibold">School MS</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">
          {/* desktop menu */}
          {filteredNavItems?.map((item) => (
            <NavLink key={item.path} className="text-[15px]" to={item.path}>
              {item.pathName}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <button className=" cursor-pointer">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
