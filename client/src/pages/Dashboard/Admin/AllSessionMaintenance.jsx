import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import moment from "moment";

const AllSessionMaintenance = () => {
  const axiosSecure = useAxiosSecure();
  const [deleteLoading, setDeleteLoading] = useState(false); 

  
  const {
    data: sessions,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allSessions"],
    queryFn: () => axiosSecure.get("/sessions").then((res) => res.data),
    onError: (error) => {
      toast.error(`Failed to fetch sessions: ${error.message}`);
    },
  });

  
  const deleteMutation = useMutation({
    mutationFn: (sessionId) => {
      setDeleteLoading(true); 
      return axiosSecure.delete(`/sessions/${sessionId}`);
    },
    onSuccess: () => {
      toast.success("Session deleted successfully!");
      setDeleteLoading(false); 
      refetch(); 
    },
    onError: (error) => {
      toast.error(`Failed to delete session: ${error.message}`);
      setDeleteLoading(false); 
    },
  });

  const handleDeleteSession = (sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(sessionId);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
      <Helmet>
        <title>All Sessions | Learnic</title>
      </Helmet>
      <SectionTitle heading="All Sessions" />

      <h2 className="text-2xl font-bold mb-4"></h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color="#36D7B7" />
        </div>
      ) : (
        <div>
          {sessions && sessions.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Title</th>
                  <th className="py-2">Tutor Email</th>
                  <th className="py-2">Class Start Date</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session._id}>
                    <td className="border px-4 py-2">{session.title}</td>
                    <td className="border px-4 py-2">{session.tutorEmail}</td>
                    <td className="border px-4 py-2">
                      {moment(session.class_start_date).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeleteSession(session._id)}
                        className="bg-red-500 text-white rounded px-4 py-2"
                        disabled={deleteLoading} // Disable button while deleting
                      >
                        {deleteLoading ? (
                          <ClipLoader size={15} color="#ffffff" />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-ful h-44 flex justify-center items-center"><p>No sessions found.</p></div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllSessionMaintenance;
