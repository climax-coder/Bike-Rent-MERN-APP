import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../redux/actions/userAction";

function Profile() {
  const userdata = JSON.parse(localStorage.getItem("auth"));
  const email = userdata.email;
  const [uname, setName] = useState(userdata.name);
  const [curpass, setcurpass] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateDetails = (e) => {
    e.preventDefault();
    if (pass == cpass) {
      const update = new Date();
      const details = {
        email,
        uname,
        curpass,
        pass,
        update: update.toLocaleString(),
      };
      console.log(details);
      dispatch(updateUserDetails(details));
      toast.success("Password successfully updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3500,
        theme: "colored",
      });
      // setTimeout(function () {
      //     navigate('/')
      // }, 5000);
    } else {
      toast.error("Password doesn't match", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3500,
        theme: "colored",
      });
    }
  };

  return (
    <Layout>
      <div style={{ marginTop: "120px" }} className="container">
        <h1 className="text-center">Check out your Profile</h1>
        <div className="row pt-4 mx-auto">
          <div className="col-md-6">
            <img
              src="https://img.freepik.com/free-vector/follow-me-social-business-theme-design_24877-50426.jpg?w=740&t=st=1677326544~exp=1677327144~hmac=8b57f9a71957f7d76a0f23bc95380f1c8ed8d257a0d73821a12e3a9b8a32e359"
              width="500"
              alt="Profile section"
            />
          </div>
          <div className="col-md-4 my-auto">
            <form onSubmit={updateDetails}>
              <div className="form-group">
                <label className="py-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  className="form-control py-2"
                  readOnly
                />
              </div>
              <div className="form-group mt-2">
                <label className="py-2">Username</label>
                <input
                  type="text"
                  class="form-control"
                  defaultValue={uname}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-2">
                <label className="py-2">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={curpass}
                  onChange={(e) => setcurpass(e.target.value)}
                  placeholder="Current Password"
                  required
                />
              </div>
              <div className="form-group mt-2">
                <label className="py-2">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="form-group mt-2">
                <label className="py-2">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={cpass}
                  onChange={(e) => setcpass(e.target.value)}
                  placeholder="Confirm New Password"
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn mt-4 btn-secondary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Profile;
