import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { MdOutlineCancelPresentation } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";


const BookedSessions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch booked sessions for the logged-in user by email
  const { data: bookedSessions, isLoading, error, refetch } = useQuery({
    queryKey: ["bookedSessions", user?.email], // Dependency on user email
    queryFn: () =>
      axiosSecure.get(`/booked-sessions/email?email=${user?.email}`).then((res) => res.data),
    enabled: !!user?.email, // Only run query if email is available
  });

  // Mutation to cancel a booking
  const cancelMutation = useMutation({
    mutationFn: (bookingId) => axiosSecure.delete(`/booked-sessions/${bookingId}`),
    onSuccess: () => {
      toast.success("Booking cancelled successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to cancel booking: ${error.message}`);
    },
  });

  const handleCancelBooking = (bookingId) => {
    cancelMutation.mutate(bookingId);
  };

  if (isLoading) return <div><LoadingSpinner></LoadingSpinner></div>;
  if (error) return <div>Error loading booked sessions: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Helmet>
        <title>My Bookings | Learnic</title>
      </Helmet>
      
      <SectionTitle heading="My Bookings" />
      {bookedSessions && bookedSessions.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="w-full bg-gray-200">
              <th className="py-2 px-4 border">Session Title</th>
              <th className="py-2 px-4 border">Tutor</th>
              <th className="py-2 px-4 border">Registration Fee</th>
              <th className="py-2 px-4 border">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookedSessions.map((booking) => (
              <tr key={booking._id} className="text-center border">
                <td className="py-2 px-4 border">{booking.sessionTitle}</td>
                <td className="py-2 px-4 border">{booking.tutor.name}</td>
                <td className="py-2 px-4 border">{booking.registrationFee} BDT</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="btn btn-sm hover:text-white bg-rose-400 hover:bg-rose-500"
                  >
                    <MdOutlineCancelPresentation />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No booked sessions found.</p>
      )}
    </div>
  );
};

export default BookedSessions;
