import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import type { UIMessage } from "ai";

interface HeaderProps {
  onClearHistory?: () => void;
  messages?: UIMessage[];
}

const exportChat = (messages: UIMessage[]) => {
  if (!messages.length) return;

  const lines = messages.map((m) => {
    const role = m.role === "user" ? "You" : "ManiBot";
    const parts = m.parts
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("");
    return `[${role}]\n${parts}`;
  });

  const content = `ManiBot Chat Export\n${"-".repeat(40)}\n${new Date().toLocaleString()}\n${"-".repeat(40)}\n\n${lines.join("\n\n")}`;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `manibot-chat-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

export const Header = ({ onClearHistory, messages = [] }: HeaderProps) => {
  return (
    <div className="fixed right-0 left-0 w-full top-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between items-center px-4 py-3">
        <Link
          href="/"
          className="flex flex-row items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity"
        >
          <span className="text-xl">🤖</span>
          <span className="text-base tracking-tight">ManiBot</span>
          <span className="text-xs text-zinc-400 font-normal hidden sm:inline">
            by Manitec
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {messages.length > 0 && (
            <button
              onClick={() => exportChat(messages)}
              className="text-xs text-zinc-400 hover:text-blue-400 transition-colors duration-150"
              title="Export chat as .txt"
            >
              Export
            </button>
          )}
          {onClearHistory && (
            <button
              onClick={onClearHistory}
              className="text-xs text-zinc-400 hover:text-red-400 transition-colors duration-150"
              title="Clear chat history"
            >
              Clear
            </button>
          )}
          <Link
            href="https://manitec.pw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            manitec.pw
          </Link>
        </div>
      </div>
    </div>
  );
};
