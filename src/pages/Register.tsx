import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Replace the URL with your actual register endpoint
      await axios.post("/api/auth/register", {
        email: values.email,
        password: values.password,
      });

      // Redirect to the login page after successful registration
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "50px 0" }}>
      <h2>Register</h2>
      {error && (
        <Alert message={error} type='error' style={{ marginBottom: 20 }} />
      )}
      <Form name='register_form' onFinish={onFinish}>
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
          rules={[{ required: true, message: "Please enter a password" }]}
          hasFeedback
        >
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder='Confirm Password' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Register
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          Already have an account? <a href='/login'>Login here</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
