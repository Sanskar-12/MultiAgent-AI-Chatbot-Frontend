import { useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../features/getMessages";
import { setMessages } from "../redux/messageSlice";

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessagesOfConversation = async () => {
      if (selectedConversation) {
        const data = await getMessages(selectedConversation?._id);
        dispatch(setMessages(data.messages));
      }
    };
    fetchMessagesOfConversation();
  }, [selectedConversation?._id, dispatch]);

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatArea;
