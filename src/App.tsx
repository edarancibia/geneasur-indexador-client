import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login";
import CreateGravestoneForm from "./components/CreateGravestoneForm";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CemeteriesPage from "./components/CemeteriesPage";
import AppLayout from "./AppLayout";
import SelectAction from "./components/SelectAction";
import SearchGravestones from "./components/SearchGravestone";
import Register from "./components/UserRegister";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
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
            <Route path="user-register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
