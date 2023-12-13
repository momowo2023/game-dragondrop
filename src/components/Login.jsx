import { useState } from "react"; // uses the useState hook to add a variable to update the value.
import { useNavigate } from "react-router-dom"; //to allow users to access different components
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // to store and display any error messages
  const navigate = useNavigate();

    const checkUser = (users) => {  // Function to validate the user
        const user = users.find((user) => user.email === email && user.password === password);
        console.log(user);
    
        if (user && user.email === email && user.password === password) {
            return user;
        } else {
            navigate("/Login");
            return null; 
        }
    };
    
    

    const handleSubmit = async (e) => {   
        e.preventDefault(); // prevent the default behavior of a form when it is submitted.

        try {  //checking if the login credentials are valid
            const response = await axios.get("http://localhost:6001/users");
            const user = checkUser(response.data);

            if (email === "" || password === "") {
                alert("All fields are required!");
                resetForm()
                return;

              } else if (user) {
                successMessage(user);

              } else {
                console.error(error);
                errorMessage("Invalid username or password. Please try again!");

              }
            } catch (error) {
              console.log(error);
            }
    };
    
    const resetForm = () => {  // to not repeat the code
        setEmail("");
        setPassword("");
    };
        
    const successMessage = (user) => {
        alert(`Hi ${user.username}` );
        navigate(`/game/${user.id}`); //  access to the user's game page after login
        
        localStorage.setItem("user", JSON.stringify(user.id))
        
        resetForm()
    };

    const errorMessage = (message) => {
        alert("Invalid username or password. Please try again!")
        setError(message); //save error message

        resetForm()
    };

    return( 
        <>  
            <form className="form-container" onSubmit={handleSubmit}>               
                <label>
                    <input 
                        value={email}  
                        type="text" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)} 
                    /> 
                </label>
                <label >
                    <input 
                        value={password} 
                        type="Password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label> 
            </form>
            <div className="Login-button-container">
                <button className="Login-button" onClick={(handleSubmit)}>Log in</button>
                <p className="Login-p">or</p>
                <button className="Login-button" onClick={() => navigate("/create-account")}>Create Account</button>
            </div>
        </>
    ); //onChange is used to listen for user input in a text input box., onFormSwitch to switch to other page
  }; // Does our project require card functionality? We only have one user information that needs to be styled
export default Login;
