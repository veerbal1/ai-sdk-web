"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { IconSend } from "@tabler/icons-react";

const ChatSmoothAnimationInterface = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat-smooth-animation",
  });
  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative">
      <div className="w-full h-full absolute inset-0 flex flex-col">
        {/* Chat Container */}
        <div className="w-full flex-1">
          {messages.map((message) => (
            <div key={message.id} className="w-full p-4">
              {message.role === "user" ? (
                <div className="w-full flex items-start justify-end">
                  <div className="max-w-2xl">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-sm font-semibold text-gray-600">
                        You
                      </span>
                    </div>
                    <div className="bg-blue-500 text-white rounded-lg p-4 rounded-br-sm">
                      {message.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-start justify-start">
                  <div className="max-w-2xl">
                    <div className="flex items-center justify-start mb-2">
                      <span className="text-sm font-semibold text-gray-600">
                        AI Assistant
                      </span>
                    </div>
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-4 rounded-bl-sm border">
                      {message.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Bottom Bar */}
        <div className="w-full h-20 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex items-center justify-center gap-2 px-4 max-w-2xl mx-auto"
          >
            <Input
              className="w-full rounded-full p-2 h-auto border border-black pl-4"
              placeholder="Ask me anything..."
              value={input}
              onChange={handleInputChange}
            />
            <Button size={"icon"} type="submit">
              <IconSend />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSmoothAnimationInterface;
