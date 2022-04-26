import { getToken } from "@/utils/auth";
const initialState = {
  // token: localStorage.getItem("geek-pc-token") || "",
  token: getToken(),
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case "user/setToken":
      return {
        ...state,
        token: action.payload,
      };
    case "user/setName":
      // console.log(action);
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default user;
