import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "animate.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getBikeById } from "../redux/actions/bikesAction";
import { useSelector, useDispatch } from "react-redux";
import { bookingBike } from "../redux/actions/BookingAction";

function Booking() {
  const [fromvalue, setfromvalue] = useState("");
  const [tovalue, settovalue] = useState("");
  const [totalhrs, settotalhrs] = useState(0);
  const { bikeid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getbikebyidstate = useSelector((state) => state.getBikeByIdReducer);
  const getbookstate = useSelector((state) => state.bookingReducer);
  const { loading, bike, error } = getbikebyidstate;
  const { book, success } = getbookstate;
  const userdata = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    dispatch(getBikeById(bikeid));
  }, []);

  var from = moment(fromvalue)._d;
  var to = moment(tovalue)._d;

  const submitTime = (e) => {
    e.preventDefault();
    function getHoursDiff(startDate, endDate) {
      const msInHour = 1000 * 60 * 60;

      return Math.ceil(Math.abs(endDate - startDate) / msInHour);
    }

    console.log(from);
    console.log(to);
    // console.log(getHoursDiff(from, to));
    settotalhrs(getHoursDiff(from, to));
  };

  const bookNow = () => {
    const reqObj = {
      userid: userdata._id,
      bikeid: bikeid,
      totalhrs: totalhrs,
      totalAmount: bike.rentPerHour * totalhrs,
      bikeimage: bike.image,
      bikename: bike.name,
      rentPerHour: bike.rentPerHour,
      fuelType: bike.fuelType,
      availableCount: bike.availableCount - 1,
      bookedSlots: {
        from,
        to,
      },
    };

    dispatch(bookingBike(reqObj));

    console.log(reqObj);
  };

  useEffect(() => {
    if (success) {
      navigate(`/payment/${book._id}`);
    }
    //eslint-disable-next-line
  }, [success]);

  return (
    <Layout>
      <div style={{ marginTop: "120px" }} className="container">
        <h1 className="text-center">Bike Details</h1>
        <div className="row mt-3 justify-content-center">
          {loading ? (
            <img
              src="https://www.atlatl.com/hubfs/NBM/arrow-motorcycle-v1/Arrow_Motorcycle_Loader.gif"
              width="100px"
              height="600px"
              alt=""
            />
          ) : error ? (
            <img
              src="https://www.atlatl.com/hubfs/NBM/arrow-motorcycle-v1/Arrow_Motorcycle_Loader.gif"
              width="100px"
              height="600px"
              alt=""
            />
          ) : (
            <div className="row text-right">
              <div className="col-md-7 mt-5">
                <img
                  src={bike.image}
                  width="800px"
                  height="800px"
                  className="img-fluid animate__animated animate__bounceInLeft animate__duration-3s"
                  alt=""
                />
              </div>
              <div className="col-md-5 mt-4">
                <h1 className="p-2">{bike.name}</h1>
                <hr />
                <h4 className="p-2">
                  Engine Capacity : <span className="specs">{bike.engine}</span>{" "}
                </h4>
                <h4 className="p-2">
                  Fuel Type : <span className="specs">{bike.fuelType}</span>
                </h4>
                <h4 className="p-2">
                  No. of Bikes available :{" "}
                  <span className="specs">{bike.availableCount}</span>
                </h4>

                <h4 className="p-2">
                  Gear : <span className="specs">{bike.gear}</span>{" "}
                </h4>
                <h5 className="p-2 my-3 bg-dark text-white rounded">
                  Select booking timeslot :{" "}
                </h5>

                <form onSubmit={submitTime}>
                  <div className="text-center">
                    <input
                      className="date-input p-2"
                      value={fromvalue}
                      onChange={(e) => setfromvalue(e.target.value)}
                      type="datetime-local"
                      id="fromtime"
                      name="fromtime"
                    />
                    <input
                      className="date-input p-2"
                      value={tovalue}
                      onChange={(e) => settovalue(e.target.value)}
                      type="datetime-local"
                      min={fromvalue}
                      id="totime"
                      name="totime"
                    />
                  </div>

                  <button
                    type="submit"
                    className="time text-center btn btn-dark my-2 float-right"
                  >
                    Confirm timeslot
                  </button>
                </form>
                {fromvalue && tovalue && totalhrs && (
                  <div>
                    <hr />

                    <h5 className="my-3">
                      Total booking hours :{" "}
                      <span className="specs">{totalhrs}</span>
                    </h5>
                    <h5 className="my-3">
                      Per Hour Cost :{" "}
                      <span className="specs">${bike.rentPerHour} /-</span>
                    </h5>
                    <h3 className="my-3">
                      Grand Total :{" "}
                      <span className="specs">
                        ${bike.rentPerHour * totalhrs} /-
                      </span>
                    </h3>
                    {bike.rentPerHour * totalhrs > 0 ? (
                      <div className="">
                        <button
                          onClick={bookNow}
                          type="submit"
                          className="time btn-lg text-center btn btn-dark my-1 float-right"
                        >
                          Book Now
                        </button>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="btn-lg time text-center btn btn-dark my-1 float-right"
                        disabled
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Booking;
