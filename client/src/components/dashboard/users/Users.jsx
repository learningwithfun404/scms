import React from "react";
import DashboardHeading from "../shared/DashboardHeading";
import useFindUsers from "../../../hooks/useFindUsers";
import useUpdateUserRole from "../../../hooks/useUpdateUserRole";
import toast from "react-hot-toast";

const Users = () => {
  const { allUsers } = useFindUsers();
  const { updateUserRole } = useUpdateUserRole();
  const users = allUsers?.data || [];

  const handleMakeAdmin = (userId) => {
    try {
      updateUserRole({ id: userId, role: "admin" });
      toast.success("User role updated to admin successfully");
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  return (
    <div>
      <DashboardHeading
        title="User Management"
        subTitle="Manage all Users in your system"
      />

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              user?.imageUrl ||
                              "https://placeimg.com/192/192/people"
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm opacity-50">{user.clerkId}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {user.email}
                    </span>
                  </td>
                  <td className={user.role === "admin" && "text-red-600"}>
                    {user.role}
                  </td>
                  <td className="space-x-2">
                    <button className="btn btn-warning">Delete</button>
                    <button
                      className="btn btn-success"
                      disabled={user.role === "admin"}
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
