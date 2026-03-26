import {
  X,
  Home,
  Users,
  FileText,
  Settings,
  User,
  LogOut,
  Shield,
} from "lucide-react";
import { Link, NavLink } from "react-router";

const Sidebar = ({ setOpen, isMobile }) => {
  const routes = [
    {
      path: "/dashboard",
      label: "Home",
      icon: Home,
    },
    {
      path: "/dashboard/users",
      label: "Users",
      icon: Users,
    },
    {
      path: "/dashboard/notice",
      label: "Notice",
      icon: FileText,
    },
    {
      path: "/dashboard/course",
      label: "Courses",
      icon: FileText,
    },
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/50 transition-shadow duration-300">
            <Shield className="text-white" size={22} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white">Admin</h1>
            <p className="text-xs text-slate-400">Manage you system</p>
          </div>
        </Link>
        {isMobile && (
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all duration-200"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Main Menu
        </p>
        <ul className="space-y-1">
          {routes?.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink
                  end
                  to={item.path}
                  onClick={() => isMobile && setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      isActive
                        ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={20}
                        className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                      />
                      <span className="font-medium">{item?.label}</span>
                      {isActive && (
                        <div className="absolute right-4 w-2 h-2 rounded-full bg-white animate-pulse" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="pt-6 mt-6 border-t border-slate-700/50">
          <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Account
          </p>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 group mt-2">
            <LogOut
              size={20}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="bg-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-slate-400 truncate">
                admin@school.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
