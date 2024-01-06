import React from "react";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  backgroundColor: "#f50057", 
  color: "white", 
  padding: "10px 20px", 
  border: "none", 
  borderRadius: "5px", 
  cursor: "pointer", 
  marginLeft: "auto", 
};

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("Token");
        navigate("/");
      };

  return (
    <button onClick={handleLogout} style={buttonStyle}>
      Logout
    </button>
  );
};

export default LogoutButton;
