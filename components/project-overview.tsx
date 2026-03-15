import NextLink from "next/link";

export const ProjectOverview = () => {
  return (
    <div className="flex flex-col items-center justify-end gap-2">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">
        🤖 ManiBot
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-sm">
        Your AI assistant by{" "}
        <Link href="https://manitec.pw">Manitec</Link>. Powered by{" "}
        <Link href="https://groq.com/">Groq</Link> and the{" "}
        <Link href="https://sdk.vercel.ai/docs">AI SDK</Link>.
      </p>
    </div>
  );
};

const Link = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <NextLink
      target="_blank"
      className="text-blue-500 hover:text-blue-600 transition-colors duration-75"
      href={href}
    >
      {children}
    </NextLink>
  );
};
