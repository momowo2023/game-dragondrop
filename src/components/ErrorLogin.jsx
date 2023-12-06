import { useNavigate } from "react-router-dom";
import "./Login.css";


const ErrorLogin = ({ message }) => { //funcrion to handle the error login
  const navigate = useNavigate();

  const backToLogin = () => {    //I doubt whether the code in lines 8 to 14 is necessary
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (   //to let users return to the login or register page.
    <div className="error-container" >
      <p>
        <span style={{ color: "red" }}>{message}</span>  
      </p>   
      <button onClick={() => navigate("/login")}>Back to Login </button>  
      <button onClick={() => navigate("/register")}>
        Create Account
      </button>  
    </div>
  ); 
};

export default ErrorLogin;
