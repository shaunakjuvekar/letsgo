import { useContext, useState } from "react";
import APIService from "./APIService";
import UserContext from "./UserContext";
import { Navigate, redirect } from "react-router-dom";

const Signup = () => {
  const [registered, setRegistered] = useState(false);
  const [userId, setUserId] = useContext(UserContext);

  if (userId) {
    redirect("/");
  }

  const FormHandler = async (event) => {
    event.preventDefault();
  
    let email = event.target.email.value;
    let password = event.target.password.value;
    let body = { email: email, password: password };
  
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@vt\.edu$/;
  
    if (!emailRegex.test(email)) {
      alert('Please enter a valid Virginia Tech email address.');
      return; // Prevent form submission if email is invalid
    }
  
    try {
      const response = await APIService.register(body);
      console.log(response);
  
      if (response.error === false) {
        setRegistered(true);
        // setUserId(id);
      }
    } catch (error) {
      console.log(error);
    }
  
    console.log("Registered status:", registered);
  };

  return userId ? (
    <Navigate to="/" />
  ) : (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Sign Up!</h3>
              <form onSubmit={FormHandler}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>

                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="d-grid gap-2">
                  {registered == false ? (
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "green",
                        borderRadius: 20,
                        textAlign: "center",
                      }}
                    >
                      Registered successfully!
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
