import API from "./Client";

const DataService = {
  loginWithBasicAuth: (username, password) => {
    return API.post("/login", null, {
      headers: {
        accept: "application/json",
      },
      params: {
        username,
        password,
      },
    });
  },

  loginWithFacebook: (fbName, fbToken) => {
    return API.post("/login", null, {
      headers: {
        accept: "application/json",
      },
      params: {
        username: fbName,
        fb_token: fbToken,
      },
    });
  },

  register: (username, password) => {
    const data = JSON.stringify({ name: username, password });

    return API.post("/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default DataService;
