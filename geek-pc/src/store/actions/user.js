import { setToken, http, clearToken } from "@/utils";
export const login = (mobile, code) => {
  return async (dispatch) => {
    const data = await http.post("/authorizations", {
      mobile,
      code,
    });
    setToken(data.token);
    // console.log(data);
    dispatch({ type: "user/setToken", payload: data.token });
  };
};

export const getUserInfo = () => {
  return async (dispatch, getState) => {
    // const data = await http.get("/user/profile", {
    //   headers: {
    //     Authorization: `Bearer ${getState().user.token}`,
    //   },
    // });
    const data = await http.get("/user/profile");
    dispatch({ type: "user/setName", payload: data.name });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    clearToken();
    dispatch({ type: "login/setToken", payload: "" });
    dispatch({ type: "user/setName", payload: "" });
  };
};
