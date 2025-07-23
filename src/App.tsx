import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import CreateGravestoneForm from "./components/CreateGravestoneForm";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CemeteriesPage from "./components/CemeteriesPage";
import AppLayout from "./AppLayout";
import SelectAction from "./components/SelectAction";
import SearchGravestones from "./components/SearchGravestone";
import Register from "./components/UserRegister";
import PendingUsersApproval from "./components/pendingUserApprovals";
import AdminRoute from "./components/AdminRoute";
import ForgotPassword from "./components/auth/ForgotPass";
import ResetPassword from "./components/auth/ResetPassword";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="user-register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Rutas que usan el AppLayout */}
          <Route element={<AppLayout />}>
            <Route
              path="/gravestone/create/:cemeteryId"
              element={
                <PrivateRoute>
                  <CreateGravestoneForm />
                </PrivateRoute>
              }
            />
            <Route path="/cemeteries" element={<CemeteriesPage />} />
            <Route path="/select-action/:cemeteryId" element={<SelectAction />} />
            <Route path="/search-gravestones/:cemeteryId" element={<SearchGravestones />} />
            {/* <Route path="/approvals" element={<PendingUsersApproval />} /> */}
            <Route path="/approvals" element={
              <AdminRoute>
                <PendingUsersApproval />
              </AdminRoute>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
