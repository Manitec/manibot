import Link from "next/link";

export const Header = () => {
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
  );
};
