import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext.js";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import './register.css';
 import { toast } from 'react-toastify';

 export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
      if (res.success) {
    navigate("/");
    toast.success("Welcome back! ❤️");
  } else {
    toast.error(res.message);
  }
  };

  return (
    <>
    <NavBar />
     <div className="register-page">
      <div className="register-form"> 
        <form onSubmit={submit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>

          <span className="form-footer">
            Don’t have an account?
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </span>
        </form>
      </div>
    </div>
    </>
  );
}