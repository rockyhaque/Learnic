import MenuItem from "./MenuItem";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { GrSave } from "react-icons/gr";
import { BiBookReader } from "react-icons/bi";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const StudentMenu = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // Apply applyRequst
  const applyRequst = async () => {
    try {
      const currentUser = {
        email: user?.email,
        role: "student",
        status: "Requested",
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      if (data.modifiedCount > 0) {
        toast.success("Success! Please wait for admin confirmation.");
      } else {
        toast.success("Please wait for admin approval ⌛");
      }
    } catch (err) {
      toast.error(err.messsage);
    }
  };

  // handle Apply Tutor Modal
  const handleApplyTutor = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6FC276",
      cancelButtonColor: "#d33",
      confirmButtonText: "Apply",
    }).then((result) => {
      if (result.isConfirmed) {
        applyRequst();
      }
    });
  };
  return (
    <>
      <MenuItem
        icon={MdOutlineCreateNewFolder}
        label="Create Note"
        address="create-note"
      />
      <MenuItem
        icon={MdOutlineEditNote}
        label="Manage Personal Notes"
        address="manage-personal-notes"
      />
      <MenuItem
        icon={GrSave}
        label="Booked Sessions"
        address="booked-sessions"
      />
      <MenuItem
        icon={BiBookReader}
        label="All Materials"
        address="all-materials"
      />

      <div className="ml-12 pt-5">
        <button onClick={handleApplyTutor} className="btn btn-sm bg-green-200">
          Join as a Tutor
        </button>
      </div>
    </>
  );
};

export default StudentMenu;
