import moment from "moment";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const AllSessionsCard = ({ session }) => {
  const {
    _id,
    title,
    description,
    category,
    registration_end_date,
    registration_start_date,
  } = session;

  const currentDate = moment();

  const startDate = registration_start_date ? moment(registration_start_date) : null;
  const endDate = registration_end_date ? moment(registration_end_date) : null;

  // Check if the session is ongoing
  const isOngoing = startDate && endDate && currentDate.isAfter(startDate) && currentDate.isBefore(endDate);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-full rounded-2xl bg-gray-100 p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-2 border-x-green-200">
        <div className="flex justify-end">
          <div className="h-4 w-4 rounded-full bg-gray-900" />
        </div>
        <header className="text-center text-xl font-extrabold text-gray-600 mb-4">
          {category}
        </header>
        <div>
          <p className="text-center text-2xl font-extrabold text-gray-900 mb-2">
            {title}
          </p>
          <p className="text-center text-sm text-gray-700 mb-4">
            {description.length > 50
              ? description.substring(0, 50) + "..."
              : description}
          </p>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          <div
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-bold text-white transition-colors duration-300 ${
              isOngoing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isOngoing ? "Ongoing" : "Closed"}
          </div>
          
          <Link to={`/session/${_id}`} className="rounded-lg bg-sky-500 px-4 py-2.5 text-xl font-bold text-white transition-colors duration-300 hover:bg-sky-900">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

// Prop types validation
AllSessionsCard.propTypes = {
  session: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    registration_end_date: PropTypes.string,
    registration_start_date: PropTypes.string,
  }).isRequired,
};

export default AllSessionsCard;
