import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../errors/ErrorHandler";
import RootLayout from "../layout/RootLayout";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Services from "../pages/Services";
import AdminLayout from "../layout/AdminLayout";
import UsersPage from "../pages/admin/UsersPage";
import LocalServices from "@/pages/LocalServices";
import HomePage from "@/pages/Layout";
import { userIdFromLocalStorage } from "@/global";
import ApplicationsPage from "@/pages/admin/Applications";
import Applicants from "@/components/Admin/Applicants/Applicants";

const isAuthenticated = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<Services />} />

        {/* Services Route */}
        <Route path="services" >
          <Route index element={<Services />} />
          <Route path="local" element={<LocalServices />} />
          <Route path="global" element={<h2 className="text-red-600">global services</h2>} />
        </Route>

        <Route
          path="contact"
          element={
            <ProtectedRoute isAllowed={userIdFromLocalStorage} redirectPath={`/login`}>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Admin Layout */}
      <Route
        path="/admin"
        element={<AdminLayout />}
        errorElement={<ErrorHandler />}
      >
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectPath={`/login`}
            >
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="applications"
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectPath={`/login`}
            >
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="applicant"
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectPath={`/login`}
            >
              <Applicants />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Any Route */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
