"use client";

import { defaultModel, modelID } from "@/ai/providers";
import { useChat } from "@ai-sdk/react";
import { useState, useEffect } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";
import { Header } from "./header";
import { toast } from "sonner";
import type { UIMessage } from "ai";

const STORAGE_KEY = "manibot_chat_history";

export default function Chat() {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel);
  const [initialMessages, setInitialMessages] = useState<UIMessage[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load chat history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setInitialMessages(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  const { sendMessage, messages, setMessages, status, stop } = useChat({
    initialMessages,
    onError: (error) => {
      toast.error(
        error.message.length > 0
          ? error.message
          : "An error occured, please try again later.",
        { position: "top-center", richColors: true },
      );
    },
  });

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // ignore storage errors (e.g. private browsing quota)
      }
    }
  }, [messages]);

  const isLoading = status === "streaming" || status === "submitted";

  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    toast.success("Chat history cleared.", { position: "top-center" });
  };

  // Don't render until localStorage is read to avoid hydration flicker
  if (!loaded) return null;

  return (
    <div className="h-dvh flex flex-col justify-center w-full stretch">
      <Header onClearHistory={handleClearHistory} />
      {messages.length === 0 ? (
        <div className="max-w-xl mx-auto w-full">
          <ProjectOverview />
        </div>
      ) : (
        <Messages messages={messages} isLoading={isLoading} status={status} />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input }, { body: { selectedModel } });
          setInput("");
        }}
        className="pb-8 bg-white dark:bg-black w-full max-w-xl mx-auto px-4 sm:px-0"
      >
        <Textarea
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          handleInputChange={(e) => setInput(e.currentTarget.value)}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        />
      </form>
    </div>
  );
}
