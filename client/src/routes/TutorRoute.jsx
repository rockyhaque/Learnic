import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";

const TutorRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "tutor") return children;
  return <Navigate to="/dashboard"></Navigate>;
};

export default TutorRoute;

TutorRoute.propTypes = {
  children: PropTypes.element,
};
