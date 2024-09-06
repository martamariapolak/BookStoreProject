import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../login/Login";
import Home from "../home/Home";
import FileNotFound from "../file-not-found/FileNotFound";

function Router() {
  return (
    <Routes>
      {/* The ProtectedRoute will redirect the user to the login form if they haven't logged in. */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      {/* If no matches, display a 404 File Not Found page if logged in. If not logged in, the <ProtectedRoute /> will redirect to the login form. */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <FileNotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Router;
