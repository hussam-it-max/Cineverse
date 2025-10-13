import{useState,useContext} from 'react';
import { UserContext } from '../Context/UserContext.js';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import './register.css';
export default function Register() {
    const { register } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const res = await register(email, password);
          if (res.success) {
    navigate("/login");
  } else {
    alert(res.message);
  }
    };

    return (
        <>
        <NavBar />
<div className="register-page">
  <div className="register-form">
    <form onSubmit={submit}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
    </form>
  </div>
</div>
        </>

    );
}