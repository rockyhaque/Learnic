import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import moment from "moment";
import useRole from "../../hooks/useRole";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const SessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session", id],
    queryFn: () => axiosSecure.get(`/session/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  const bookingMutation = useMutation({
    mutationFn: (bookingData) => axiosSecure.post("/booked-sessions", bookingData),
    onSuccess: () => {
      toast.success("Session booked successfully!");
      navigate('/dashboard/booked-sessions')
    },
    onError: (error) => {
      toast.error(`Failed to book session: ${error.message}`);
    },
  });

  const handleBooking = () => {
    const bookingData = {
      userId: user?._id,
      sessionId: id,
      sessionTitle: session.title,
      tutor: session.tutor,
      registrationFee: session.registration_fee,
      bookedAt: new Date().toISOString(),
      student: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL
      }
    };
    bookingMutation.mutate(bookingData);
  };

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error fetching session details: {error.message}</div>;

  // console.log(session);

  const {
    title,
    description,
    category,
    class_start_date,
    class_end_date,
    duration,
    registration_start_date,
    registration_end_date,
    session_img,
    registration_fee,
    tutor,
  } = session;

  const currentDate = moment();

  const startDate = registration_start_date
    ? moment(registration_start_date)
    : null;
  const endDate = registration_end_date ? moment(registration_end_date) : null;

  // Check if the session is ongoing
  const isOngoing =
    startDate &&
    endDate &&
    currentDate.isAfter(startDate) &&
    currentDate.isBefore(endDate);

  return (
    <div className="max-w-screen-xl mx-auto p-4 space-y-3">
      <Helmet>
        <title>Session Details</title>
      </Helmet>
      <p className="mt-2 text-sm  badge badge-neutral">{category}</p>
      <div className="mt-2">
        <img src={session_img} alt="session_img" className="rounded-xl" />
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>

      <p className="mt-2">{description}</p>
      <div className="relative  rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg ">
        <div className="bg-white p-5 rounded-md flex items-center gap-3">
          <div className="avatar">
            <div className="w-14 rounded-xl">
              <img src={tutor?.image} className="" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg">{tutor?.name}</h1>
            <p>{tutor?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center border p-3 rounded-xl mt-6 shadow-xl hover:shadow-sm gap-4 md:gap-0">
        <div className="space-y-2">
          <p>
            <span className="font-medium">Class Start Date:</span>{" "}
            {class_start_date}
          </p>
          <p>
            {" "}
            <span className="font-medium">Class End Date:</span>{" "}
            {class_end_date}
          </p>
          <p>
            <span className="font-medium">Duration: </span>
            {duration}
          </p>
        </div>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Registration Start Date: </span>
            {registration_start_date}
          </p>
          <p>
            <span className="font-medium">Registration End Date:</span>
            {registration_end_date}
          </p>
          <p>
            <span className="font-medium">Registration Fee: </span>
            <span className="badge">{registration_fee}</span> BDT
          </p>
        </div>
      </div>

      <div className="flex justify-center py-8">
        <button
        onClick={handleBooking}
          disabled={role === "admin" || role === "tutor"}
          className={`btn btn-wide text-sm md:text-xl ${
            isOngoing
              ? "bg-green-50 hover:bg-gradient-to-r from-sky-50 to-cyan-50"
              : "bg-rose-200 hover:bg-gradient-to-r from-indigo-50 to-rose-300"
          } ${
            role === "admin" || role === "tutor"
              ? "disabled:bg-gray-300 disabled:cursor-not-allowed" 
              : ""
          }`}
        >
          {isOngoing ? "Book Now" : "Closed"}
        </button>
      </div>
    </div>
  );
};

export default SessionDetails;
