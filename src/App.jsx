import "./App.css";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import ReviewsPage from "./pages/ReviewsPage";
import SignupPage from "./pages/SignUpPage";
import CropDetails from "./pages/CropDetails";
import AdminUsers from "./pages/AdminUsers";
import Crops from "./pages/Crops";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import AboutUs from "./pages/AboutUsPage/AboutUs";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/CreateProduct";
import CreateStore from "./pages/CreateStore";
function App() {
  const user = useRecoilValue(userAtom);
  const [isLoading, setIsloading] = useState(true);
  const [cart, setCart] = useState([]);
  return (
    <>
      <Navbar />
      <Routes>
        {/* Routes accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route
          path="/crops/:id"
          element={<CropDetails cart={cart} setCart={setCart} />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ourstores" element={<AdminUsers />} />
        {/* Routes accessible if not logged in */}
        {!user && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </>
        )}

        {/* Routes accessible if logged in */}
        {user && (
          <>
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/profile" element={<AdminPage />}>
              <Route index element={<Profile />} />
              {user.role == "admin" && (
                <>
                  {" "}
                  <Route path="createproduct" element={<CreateProduct />} />
                  <Route path="createstore" element={<CreateStore />} />
                  {/* Admin-only routes */}
                </>
              )}
            </Route>

            {/* <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]} element={<AdminPage />} />
              }
            /> */}

            {/* User-only routes */}
            {/* <Route
              path="/user"
              element={
                <ProtectedRoute roles={["user"]} element={<UserPage />} />
              }
            /> */}
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
