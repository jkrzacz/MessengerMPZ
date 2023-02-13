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

  me: (token) => {
    return API.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAllUsers: (token) => {
    return API.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getChats: (token) => {
    return API.get("/chats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createChat: (token, chatName) => {
    const data = JSON.stringify({ name: chatName });
    return API.post("/chat", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  addChatReader: (token, chatId, userId) => {
    const data = JSON.stringify({
      chat_id: chatId,
      user_id: userId,
    });

    return API.post("/chat/reader", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getChatReaders: (token, chatId) => {
    return API.get("/chat/readers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        chat_id: chatId,
      },
    });
  },

  sendMessage: (token, chatId, messageSender, message) => {
    const data = JSON.stringify({
      chat_id: chatId,
      user_id: messageSender,
      message,
    });

    return API.post("/chat/message", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default DataService;
