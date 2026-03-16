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

function getTextContent(parts: { type: string; text?: string }[]): string {
  return parts
    .filter(p => p.type === "text")
    .map(p => p.text ?? "")
    .join("");
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
            parts: [{ type: "text" as const, text: m.content }],
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [sessionId, setMessages]);

  useEffect(() => {
    if (!loaded || messages.length === 0) return;

    if (!sessionCreated.current) {
      sessionCreated.current = true;
      const firstUserMsg = messages.find(m => m.role === "user");
      const title = firstUserMsg
        ? getTextContent(firstUserMsg.parts as { type: string; text?: string }[]).slice(0, 40)
        : "New Chat";

      fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sessionId, title }),
      }).catch(() => {});
    }

    const last = messages[messages.length - 1];
    if (last && (status === "ready" || status === "error")) {
      const textContent = getTextContent(last.parts as { type: string; text?: string }[]);
      fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: last.id ?? nanoid(),
          sessionId,
          role: last.role,
          content: textContent || JSON.stringify(last.parts),
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
