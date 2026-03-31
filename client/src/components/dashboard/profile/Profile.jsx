import useLoggedInUser from "../../../hooks/useLoggedInUser";

const DashBoardProfile = () => {
  const { user, isLoading } = useLoggedInUser();
  const userData = user?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">User information not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
      <div className="flex flex-col items-center gap-4">
        {userData.imageUrl ? (
          <img
            src={userData.imageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
            {userData.firstName?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{userData.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 capitalize">
            {userData.role}
          </span>
        </div>
      </div>

      <div className="mt-8 divide-y divide-gray-100">
        <div className="flex justify-between py-3">
          <span className="text-gray-500 font-medium">First Name</span>
          <span className="text-gray-800">{userData.firstName ?? "—"}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-gray-500 font-medium">Last Name</span>
          <span className="text-gray-800">{userData.lastName ?? "—"}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-gray-500 font-medium">Email</span>
          <span className="text-gray-800">{userData.email ?? "—"}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-gray-500 font-medium">Role</span>
          <span className="text-gray-800 capitalize">
            {userData.role ?? "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashBoardProfile;
