import api from "../../utils/axios.js";

export const getMessages = async (conversationId) => {
  try {
    const { data } = await api.get(`/api/chat/get/message/${conversationId}`);
    return data;
  } catch (error) {
    console.log(`Get Messages Error - ${error}`);
    return { messages: [] };
  }
};
