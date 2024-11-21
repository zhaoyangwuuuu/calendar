import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Private Route */}
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Redirect root path to /dashboard if authenticated, else to /login */}
      <Route
        path='/'
        element={
          <PrivateRoute>
            <Navigate to='/dashboard' replace />
          </PrivateRoute>
        }
      />

      {/* Catch-all route for undefined paths */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
