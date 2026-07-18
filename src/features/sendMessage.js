import api from "../../utils/axios.js";

export const sendMessage = async (payload) => {
  try {
    const { data } = await api.post("/api/agent/chat", payload);
    return data;
  } catch (error) {
    console.log(`Send Message Error - ${error}`);
    return null;
  }
};
