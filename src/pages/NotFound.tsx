import React, { useContext } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);

  const handleBackHome = () => {
    if (authenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
