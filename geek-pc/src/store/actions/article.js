import { http } from "@/utils";

export const getChannels = () => {
  return async (dispatch) => {
    const data = await http.get("channels");
    dispatch({ type: "article/setChannels", payload: data.channels });
  };
};

export const getArticles = (params) => {
  return async (dispatch) => {
    const data = await http.get("mp/articles", { params });
    // console.log(data);
    dispatch({ type: "article/setArticles", payload: data });
  };
};

export const delArticle = (id) => {
  console.log(id, "id");
  return async () => {
    const data = await http.delete(`mp/articles/${id}`);
    console.log(data);
  };
};

export const addArticle = (data, draft = false) => {
  return async (dispatch) => {
    await http.post(`mp/articles?draft=${false}`, data);
  };
};

export const editArticle = (data, draft = false) => {
  return async (dispatch) => {
    await http.put(`mp/articles/${data.id}?draft=${draft}`, data);
  };
};

export const getArticle = (id) => {
  return async (dispatch) => {
    const data = await http.get("mp/articles/" + id);
    // console.log(data);
    return data;
  };
};
