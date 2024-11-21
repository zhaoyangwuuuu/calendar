import React, { useState, useContext } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await axios.post("/api/auth/login", values);
      const { token } = response.data;

      localStorage.setItem("token", token);

      setAuthenticated(true);

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "50px 0" }}>
      <h2>Login</h2>
      {error && (
        <Alert message={error} type='error' style={{ marginBottom: 20 }} />
      )}
      <Form name='login_form' onFinish={onFinish}>
        <Form.Item
          name='email'
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Log in
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          Don't have an account? <a href='/register'>Register now</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
