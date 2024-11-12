import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";
import Home from "./screens/Home.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminScreen from "./screens/admin/AdminScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import BookSearch from "./screens/BookSearch.jsx";
import BooksScreen from "./screens/BooksScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/suggestions" element={<BooksScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin" element={<AdminScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
