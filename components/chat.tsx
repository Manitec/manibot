"use client";

import { defaultModel, modelID } from "@/ai/providers";
import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";
import { Header } from "./header";
import { toast } from "sonner";

const STORAGE_KEY = "manibot_chat_history";

export default function Chat() {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel);
  const [loaded, setLoaded] = useState(false);
  const hasRestored = useRef(false);

  const { sendMessage, messages, setMessages, status, stop } = useChat({
    onError: (error) => {
      toast.error(
        error.message.length > 0
          ? error.message
          : "An error occured, please try again later.",
        { position: "top-center", richColors: true },
      );
    },
  });

  useEffect(() => {
    if (hasRestored.current) return;
    hasRestored.current = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, [setMessages]);

  useEffect(() => {
    if (!loaded) return;
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch {
      // ignore storage quota errors
    }
  }, [messages, loaded]);

  const isLoading = status === "streaming" || status === "submitted";

  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    toast.success("Chat history cleared.", { position: "top-center" });
  };

  if (!loaded) return null;

  return (
    <div className="h-dvh flex flex-col justify-center w-full stretch">
      <Header onClearHistory={handleClearHistory} messages={messages} />
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
