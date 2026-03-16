"use client";

import { defaultModel, modelID } from "@/ai/providers";
import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";
import { Header } from "./header";
import { toast } from "sonner";
import { nanoid } from "nanoid";

interface ChatProps {
  sessionId: string;
}

export default function Chat({ sessionId }: ChatProps) {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel);
  const [loaded, setLoaded] = useState(false);
  const hasRestored = useRef(false);
  const sessionCreated = useRef(false);

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

  // Load messages from Neon when sessionId changes
  useEffect(() => {
    hasRestored.current = false;
    sessionCreated.current = false;
    setMessages([]);
    setLoaded(false);
  }, [sessionId, setMessages]);

  useEffect(() => {
    if (hasRestored.current) return;
    hasRestored.current = true;

    fetch(`/api/sessions/${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data.map((m: { id: string; role: string; content: string }) => ({
            id: m.id,
            role: m.role as "user" | "assistant",
            content: m.content,
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [sessionId, setMessages]);

  // Save messages to Neon whenever they change
  useEffect(() => {
    if (!loaded || messages.length === 0) return;

    // Create session on first message
    if (!sessionCreated.current) {
      sessionCreated.current = true;
      const firstUserMsg = messages.find(m => m.role === "user");
      const title = firstUserMsg
        ? firstUserMsg.content.slice(0, 40)
        : "New Chat";

      fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sessionId, title }),
      }).catch(() => {});
    }

    // Save latest message
    const last = messages[messages.length - 1];
    if (last && (status === "ready" || status === "error")) {
      fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: last.id ?? nanoid(),
          sessionId,
          role: last.role,
          content: typeof last.content === "string"
            ? last.content
            : JSON.stringify(last.content),
        }),
      }).catch(() => {});
    }
  }, [messages, loaded, sessionId, status]);

  const isLoading = status === "streaming" || status === "submitted";

  const handleClearHistory = async () => {
    await fetch(`/api/sessions/${sessionId}`, { method: "DELETE" });
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
