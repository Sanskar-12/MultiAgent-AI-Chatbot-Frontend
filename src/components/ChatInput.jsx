import { Mic, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { sendMessage } from "../features/sendMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../redux/messageSlice";
import { createConversation } from "../features/createConversation";
import {
  addConversation,
  setConversationTitle,
  setSelectConversation,
} from "../redux/conversationSlice";
import { updateConversation } from "../features/updateConversation";

const ChatInput = () => {
  const [value, setValue] = useState("");
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    try {
      let conversation = selectedConversation;
      let conversationId = conversation?._id;

      if (!conversation) {
        const data = await createConversation();
        conversation = data.conversation;
        conversationId = conversation._id;
        dispatch(setSelectConversation(conversation));
        dispatch(addConversation(conversation));
      }

      if (conversation.title === "New Chat") {
        const data = await updateConversation({
          conversationId,
          title: value.slice(0, 40),
        });
        dispatch(
          setConversationTitle({
            title: data.conversation.title,
            conversationId: data.conversation._id,
          }),
        );
      }

      dispatch(addMessages({ role: "user", content: value }));
      setValue("");

      const data = await sendMessage({ prompt: value, conversationId });

      dispatch(addMessages({ role: "assistant", content: data.response }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]">
      <div
        className="flex flex-col
     gap-2 bg-white/3 border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3"
      >
        <textarea
          placeholder="Ask anything..."
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50"
          rows={3}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
              <Paperclip size={16} />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
              <Mic size={16} />
            </button>
          </div>
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150 ${value.trim() ? "bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white" : "bg-white/5 text-slate-500 cursor-not-allowed"}`}
            disabled={!value}
            onClick={handleSendMessage}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
