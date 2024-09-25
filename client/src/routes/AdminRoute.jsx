import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "admin") return children;
  return <Navigate to="/dashboard"></Navigate>;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
