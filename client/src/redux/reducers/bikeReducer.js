const initialData = {
  bikes: [],
};

export const bikesReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_BIKES": {
      return {
        ...state,
        bikes: action.payload,
      };
    }

    default:
      return state;
  }
};

export const getBikeByIdReducer = (state = { bike: {} }, action) => {
  switch (action.type) {
    case "GET_BIKEBYID_REQUEST":
      return {
        loading: true,
      };

    case "GET_BIKEBYID_SUCCESS":
      return {
        bike: action.payload,
        loading: false,
      };

    case "GET_BIKEBYID_ERROR":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const bookingReducer = (state = {}, action) => {
  switch (action.type) {
    case "BOOK_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };

    case "BOOK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export const getOrderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ORDERBYID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_ORDERBYID_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case "GET_ORDERBYID_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return { state };
  }
};

export const getOrdersByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ORDERSBYUSERID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_ORDERSBYUSERID_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case "GET_ORDERSBYUSERID_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return { state };
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return {
        loading: true,
      };
    case "ORDER_PAY_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ORDER_PAY_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "ORDER_PAY_RESET":
      return {};
    default:
      return state;
  }
};
