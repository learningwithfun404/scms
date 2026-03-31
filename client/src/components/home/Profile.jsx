import useLoggedInUser from "../../hooks/useLoggedInUser";

const Profile = () => {
  const { user, isLoading } = useLoggedInUser();
  const userData = user?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="遭16l-4-4m0 0l-4 4m4-4v12" /></svg>
        </div>
        <p className="text-gray-600 font-medium">Profile data unavailable</p>
        <p className="text-gray-400 text-sm">Please try refreshing or logging in again.</p>
      </div>
    );
  }

  return (
    <div className=" mt-8 ">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Account Profile</h1>
        <p className="text-gray-500 text-sm">Manage your personal information and account settings.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Profile Identity Card */}
        <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center gap-6">
          {userData.imageUrl ? (
            <img
              src={userData.imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-semibold text-white ring-4 ring-white shadow-sm">
              {userData.firstName?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-gray-500">{userData.email}</p>
            <div className="mt-3">
                <span className="px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                    {userData.role}
                </span>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="p-0">
          {[
            { label: "First Name", value: userData.firstName },
            { label: "Last Name", value: userData.lastName },
            { label: "Email Address", value: userData.email },
            { label: "Account Role", value: userData.role, capitalize: true },
          ].map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row sm:items-center justify-between px-8 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-500 w-40">{item.label}</span>
              <span className={`text-gray-900 font-medium mt-1 sm:mt-0 ${item.capitalize ? 'capitalize' : ''}`}>
                {item.value ?? "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Hint */}
      <p className="mt-6 text-center text-xs text-gray-400">
        To update your information, please contact your system administrator.
      </p>
    </div>
  );
};

export default Profile;