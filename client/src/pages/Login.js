import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userAction";

function Login() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.loginUserReducer);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/home");
    }
  }, []);

  const loginsubmit = (e) => {
    e.preventDefault();
    const obj = {
      email,
      pass,
    };
    dispatch(userLogin(obj));
    if (data.code) {
      toast.success(data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3500,
        theme: "colored",
      });

      localStorage.setItem("auth", JSON.stringify(data.user));

      navigate("/home");
    } else {
      toast.error(data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3500,
        theme: "colored",
      });
    }
    // console.log(obj);
  };
  return (
    <div className="loginbg">
      <h1 className="text-center bg-dark py-4">
        Welcome to the world of bikes
      </h1>
      <div className="row">
        <div className="col-lg-4 col-md-3 col-sm-4 py-5 mt-3">
          <div className=" p-1 mx-1 bg-card">
            <h2
              className="mt-2"
              style={{ textAlign: "left", marginLeft: "40px" }}
            >
              Login
            </h2>
            {/* {error && (
                        toast.error("Error Notification !", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2500,
                            theme: "colored"
                        })
                    )}
                    {success && (
                        toast.success("Successful login !", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2500,
                            theme: "colored"
                        })
                    )} */}
            <form
              onSubmit={loginsubmit}
              className="col-md-9 mt-5 mx-4"
              style={{ textAlign: "left" }}
            >
              <div className="form-group">
                <h5>Email address</h5>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="form-control"
                  placeholder="Enter email"
                  autoFocus
                  required
                />
              </div>
              <div className="form-group mt-4">
                <h5>Password</h5>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary mt-5">
                Submit
              </button>
              <br />
            </form>
            <div className="my-3 text-center">
              <Link
                className="text-white font-weight-bold text-decoration-none"
                to="/register"
              >
                Not Registered? Click here ..
              </Link>
            </div>
          </div>
          <ToastContainer />
        </div>
        <div className="col-sm-7 col-md-5"></div>
      </div>
    </div>
  );
}

export default Login;
