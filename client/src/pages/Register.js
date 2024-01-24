import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userAction";

function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.registerUserReducer);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/home");
    }
  }, []);

  const registerSubmit = (e) => {
    e.preventDefault();

    if (pass === cpass) {
      var currentDate = new Date();

      const obj = {
        name,
        email,
        pass,
        date: currentDate.toLocaleString(),
      };
      dispatch(userRegister(obj));
      console.log(data);
      if (data.code) {
        toast.success(data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3500,
          theme: "colored",
        });

        setTimeout(function () {
          navigate("/");
        }, 3000);
      } else {
        toast.error(data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3500,
          theme: "colored",
        });
      }
    } else {
      toast.error("Passwords doesn't match", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  return (
    <div className="registerbg">
      <h1 className="text-center bg-dark py-4">
        Welcome to the world of bikes
      </h1>
      <div className="row mt-5">
        <div className="col-md-8"></div>
        <div className="col-md-4 col-sm-4">
          <div className="p-2 bg-card" style={{ marginRight: "30px" }}>
            <h2
              className="mt-2"
              style={{ textAlign: "left", marginLeft: "40px" }}
            >
              Register
            </h2>
            <form
              className="col-md-9 mt-5"
              onSubmit={registerSubmit}
              style={{ textAlign: "left", marginLeft: "40px" }}
            >
              <div className="form-group">
                <h5>Name</h5>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="form-control"
                  placeholder="Enter name"
                  autoFocus
                  required
                />
              </div>
              <div className="form-group mt-4">
                <h5>Email address</h5>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="form-control"
                  placeholder="Enter email"
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
              <div className="form-group mt-4">
                <h5>Confirm Password</h5>
                <input
                  type="password"
                  value={cpass}
                  onChange={(e) => setcpass(e.target.value)}
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Submit
              </button>
            </form>
            <div className="my-3 text-center">
              <Link
                className="text-white font-weight-bold text-decoration-none"
                to="/"
              >
                Already Registered? Click here ..
              </Link>
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Register;
