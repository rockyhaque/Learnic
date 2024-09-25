import { useMutation, useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";
import { AiOutlineEdit } from "react-icons/ai";
import { TiDocumentDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'

const MyListingSession = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-listing-sessions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-listing-sessions/${user?.email}`
      );
      return data;
    },
  });

  // console.log(sessions);

  // Delete Mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/session/${id}`);
      return data;
    },
    onSuccess: (data) => {
      // console.log(data);
      refetch();
      toast.success("Session Deleted Successfully");
    },
  });

  // Handle Delete
  const handleDelete = async (id) => {
    // console.log(id);
    try {
      await mutateAsync(id);
    } catch (err) {
      // console.log(err);
    }
  };

  // Delete Confirmation Modal
  const cofirmDelete = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6FC276",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            handleDelete(id)
          Swal.fire({
            title: "Deleted!",
            text: "Your Session has been deleted successfully",
            icon: "success"
          });
        }
      });
    // console.log(id);
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <SectionTitle heading="My Listing Session" />
      <Helmet>
        <title>My Listing Session | Learnic</title>
      </Helmet>

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Session Info</th>
                <th>Duration</th>
                <th>Registration End Date</th>
                <th>Class Start Date</th>
                <th>Status</th>
                {/* <th>Update</th> */}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="rounded-xl h-12 w-12">
                          <img
                            src={session?.session_img}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{session?.title}</div>
                        <div className="text-sm opacity-50">
                          {session?.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {session?.duration}
                    </span>{" "}
                    Month
                  </td>
                  <td>{session?.registration_end_date}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {session?.class_start_date}
                    </button>
                  </th>
                  <th>{session?.status}</th>
                  {/* <th>
                    <AiOutlineEdit size={20} className="cursor-pointer" />
                  </th> */}
                  <th>
                    <button onClick={() => cofirmDelete(session?._id)}><TiDocumentDelete size={20} className="cursor-pointer" /></button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyListingSession;
