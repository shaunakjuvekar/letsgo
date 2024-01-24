import { useContext, useState } from "react";
import APIService from "./APIService";
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useContext(UserContext);

  const FormHandler = async (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;
    let body = { email: email, password: password };

    try {
      console.log("email " + email);
      console.log("password " + password);
      const loginResponse = await APIService.login(body);
      //   {
      //     "error": false,
      //     "message": "User added successfully!",
      //     "data": 21
      // }
      console.log(loginResponse);
      setLoggedIn(true);
      setUserId(loginResponse.data);
    } catch (e) {
      console.log("hmm:", e);
    }
  };

  //(response.error==false ? regState(true) : regState(false))

  return loggedIn ? (
    <Navigate to="/" />
  ) : userId ? (
    <Navigate to="/" />
  ) : (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Welcome Back!</h3>
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
                  {loggedIn == false ? (
                    <button type="submit" className="btn btn-success">
                      Login
                    </button>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "green",
                        borderRadius: 20,
                        textAlign: "center",
                      }}
                    >
                      Login successful!
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

export default Login;
