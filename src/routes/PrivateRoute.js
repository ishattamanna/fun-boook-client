import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);

  if (loader) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    );
  }

  if (user?.uid) {
    return children;
  } else {
    return <Navigate to={"/signin"}></Navigate>;
  }
};

export default PrivateRoute;
