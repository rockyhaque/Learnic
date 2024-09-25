import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SectionTitle from "../SectionTitle/SectionTitle";
import AllSessionsCard from "../Cards/AllSessionsCard";
import { useState } from "react";

const AllSessions = () => {
  const axiosCommon = useAxiosCommon();
  const [showAll, setShowAll] = useState(false);

  const fetchSessions = async () => {
    const response = await axiosCommon.get("/sessions");
    return response.data;
  };

  const {
    data: sessions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const displayedSessions = showAll ? sessions : sessions.slice(0, 4);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching sessions: {error.message}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <SectionTitle
        heading="All Sessions"
        description="All Sessions offers a comprehensive overview of available classes, covering various topics, durations, and expert instructors"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedSessions.map((session) => (
          <AllSessionsCard key={session._id} session={session} />
        ))}
      </div>
      <div className="flex justify-center my-12">
        <button
          onClick={() => setShowAll(!showAll)} // Toggle state on button click
          className="btn btn-wide font-semibold text-white text-xl bg-sky-500 hover:bg-green-400 "
        >
          {showAll ? "See Less" : "See All Sessions"}
        </button>
      </div>
    </div>
  );
};

export default AllSessions;
