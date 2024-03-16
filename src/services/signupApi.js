import { apiCaller } from "./apiCaller";

export const signupApi = async (name, email, password) => {
  //const url = process.env.REACT_APP_BASE_URL + "/auth/signup";
  const url = "https://x8ki-letl-twmt.n7.xano.io/api:nMIYN26C/auth/signup";
  const params = {
    name: name,
    email: email,
    password: password,
  };

  const response = await apiCaller(url, "post", params);
  return response;
};
