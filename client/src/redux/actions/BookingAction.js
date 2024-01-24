import axios from "axios";

export const bookingBike = (reqObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: "BOOK_REQUEST" });
    const res = await axios.post("/api/booking/bookbike", reqObj);
    dispatch({ type: "BOOK_REQUEST", payload: false });
    dispatch({ type: "BOOK_SUCCESS", payload: res.data.book });
    console.log(res.data.book);
  } catch (error) {
    console.log(error);
    dispatch({ type: "BOOK_ERROR", payload: error });
  }
};

export const getOrderById = (id) => (dispatch, getState) => {
  dispatch({ type: "GET_ORDERBYID_REQUEST" });

  axios
    .post("/api/booking/getorderbyid/", { id })
    .then((res) => {
      dispatch({ type: "GET_ORDERBYID_SUCCESS", payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERBYID_ERROR", payload: err });
    });
};

export const getOrdersByUserId = (userid) => async (dispatch) => {
  dispatch({ type: "GET_ORDERSBYUSERID_REQUEST" });
  await axios
    .post("/api/booking/getordersbyuserid/", { userid })
    .then((res) => {
      dispatch({ type: "GET_ORDERSBYUSERID_SUCCESS", payload: res.data });
      console.log(res.data);
      // console.log(userid);
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERSBYUSERID_ERROR", payload: err });
    });
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: "SAVE_PAYMENT_METHOD", payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_PAY_REQUEST" });
    const { data } = await axios.put(`/api/booking/${id}/pay`, paymentResult);
    dispatch({ type: "ORDER_PAY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ORDER_PAY_FAIL", paylod: error });
  }
};
