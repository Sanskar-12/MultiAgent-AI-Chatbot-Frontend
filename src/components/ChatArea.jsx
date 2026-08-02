import { useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../features/getMessages";
import { setArtifacts, setMessages } from "../redux/messageSlice";

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessagesOfConversation = async () => {
      if (selectedConversation) {
        const data = await getMessages(selectedConversation?._id);
        dispatch(setMessages(data.messages));

        const latestArtifactMessage = [...data.messages]
          .reverse()
          .find((msg) => msg.artifacts && msg.artifacts.length > 0);

        // always dispatch, even when nothing was found
        dispatch(setArtifacts(latestArtifactMessage?.artifacts ?? []));
      } else {
        // optional: clear artifacts when no conversation is selected
        dispatch(setArtifacts([]));
      }
    };
    fetchMessagesOfConversation();
  }, [selectedConversation?._id, dispatch]);

  return (
    <div className="flex-1 flex min-w-0 flex-col">
      <Navbar />
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatArea;
