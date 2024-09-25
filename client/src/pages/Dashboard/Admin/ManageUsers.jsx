import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { BiSolidEditAlt } from "react-icons/bi";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const { user: loggedInUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedRole, setSelectedRole] = useState("student");
  const [selectedUserEmail, setSelectedUserEmail] = useState(null); // New state to store the selected user's email

  // Fetch Users Data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, role }) => {
      // Accept both email and role
      const { data } = await axiosSecure.patch(
        `/users/update/${email}`, // Use specific user email
        { role }
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      // console.log(data);
      toast.success("User role updated successfully");
    },
  });

  // Modal handler function
  const modalHandler = async () => {
    if (!selectedUserEmail) {
      toast.error("No user selected");
      return;
    }

    if (loggedInUser?.email === selectedUserEmail) {
      toast.error("Action not Allowed");
      return;
    }

    const userRole = {
      email: selectedUserEmail,
      role: selectedRole,
      status: "Verified",
    };

    try {
      await mutateAsync(userRole);
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  // Handle role selection change
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update the selected role state
  };

  // Handle the update button click
  const handleUpdateClick = (email) => {
    setSelectedUserEmail(email); // Set the selected user's email
    document.getElementById("my_modal_1").showModal(); // Open the modal
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="">
      <Helmet>
        <title>Manage Users</title>
      </Helmet>

      <SectionTitle heading="All Users" />

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>User Info</th>
                <th>Status</th>
                <th>Role</th>
                <th>Update Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-ghost badge-sm ${
                        user?.status === "Requested"
                          ? "text-green-500"
                          : "text-sky-500"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </td>
                  <td
                    className={
                      user?.role === "admin"
                        ? "text-green-500"
                        : user?.role === "tutor"
                        ? "text-yellow-500"
                        : user?.role === "student"
                        ? "text-purple-500"
                        : ""
                    }
                  >
                    {user?.role.charAt(0).toUpperCase() +
                      user?.role.slice(1).toLowerCase()}
                  </td>
                  <th>
                    <button
                      className="btn"
                      onClick={() => handleUpdateClick(user.email)} // Pass the user's email when opening the modal
                    >
                      <BiSolidEditAlt size={25} className="cursor-pointer" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">Update Role</h3>
          <div className="flex justify-center gap-6  py-2 mt-4">
            <select
              name="role"
              className="p-2 rounded-xl border w-1/2"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn bg-green-100" onClick={modalHandler}>
              Update
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog ">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-rose-400">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
