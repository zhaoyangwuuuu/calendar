import React, { useContext } from "react";
import { Button } from "antd";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    setAuthenticated(false);

    navigate("/login");
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Welcome to the Dashboard</h2>
      <Button type='primary' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
