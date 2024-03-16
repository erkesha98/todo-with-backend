import { apiCaller } from "./apiCaller";
export const getTodo = async () => {
  const url = process.env.REACT_APP_BASE_URL + "/todo";
  const params = {};

  const response = await apiCaller(url, "get",params);
  return response;
};
