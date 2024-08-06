import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import userAtom from "../atoms/userAtom";

const LoginPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://cropify-deploy.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("data from api", data);

      if (data.error) {
        console.log("data error in api", data.error);
        return;
      }
      console.log(data);
      localStorage.setItem("user-threads", JSON.stringify(data.data.user));
      setUser(data.data.user); // Corrected to match the data structure
      window.location.reload();
      navigate("/"); // Navigate to the homepage
    } catch (error) {
      console.log("login page error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <label style={{ marginBottom: "10px" }}>Email :</label>
        <input
          required
          type="text"
          value={inputs.email}
          onChange={(e) =>
            setInputs((inputs) => ({
              ...inputs,
              email: e.target.value,
            }))
          }
          style={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        ></input>
        <label style={{ marginBottom: "10px" }}>Password :</label>
        <input
          required
          type="password"
          value={inputs.password}
          onChange={(e) =>
            setInputs((inputs) => ({
              ...inputs,
              password: e.target.value,
            }))
          }
          style={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        ></input>
        <button
          onClick={handleLogin}
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
