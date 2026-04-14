# 🤖 ManiBot

**ManiBot** is the public-facing AI for the [Manitec](https://manitec.pw) brand — a streaming chatbot built with Next.js, the Vercel AI SDK (v5), and Groq. It lives at [chat.manitec.pw](https://chat.manitec.pw).

ManiBot handles general-purpose AI conversations on behalf of the Manitec brand: helping users, answering questions, and representing the public voice of the empire. It is not an internal tool — that's what HexBot is for.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| AI SDK | [Vercel AI SDK v5](https://sdk.vercel.ai) |
| AI Provider | [Groq](https://groq.com) |
| UI | shadcn/ui + Tailwind CSS v4 |
| Database | [Neon](https://neon.tech) (serverless Postgres) |
| Auth | Cookie-based gate (`GATE_PASSWORD`) |
| Deploy | [Vercel](https://vercel.com) |
| Package Manager | pnpm |

---

## Models

All models are served through Groq. The **default model is `kimi-k2`**.

| Model ID | Notes |
|---|---|
| `kimi-k2` ⭐ | Moonshot AI — default |
| `meta-llama/llama-4-scout-17b-16e-instruct` | Llama 4 Scout |
| `llama-3.1-8b-instant` | Fast, lightweight |
| `deepseek-r1-distill-llama-70b` | Reasoning model (chain-of-thought) |
| `llama-3.3-70b-versatile` | Strong general-purpose model |

Models are configured in [`ai/providers.ts`](./ai/providers.ts).

---

## Features

- **Streaming responses** powered by Vercel AI SDK
- **Session persistence** — chat history saved to Neon Postgres per session
- **Multi-model selector** — switch between Groq models in the UI
- **Reasoning support** — DeepSeek R1 sends chain-of-thought reasoning blocks
- **PWA support** — installable on Android/iOS, offline page, TWA-ready
- **Mobile-first** — collapsible sidebar, `100dvh` layout, hamburger toggle
- **Branded system prompt** — loaded from [`prompts/manibot-system.md`](./prompts/manibot-system.md)
- **Cookie-based auth gate** — protects the UI, login page excluded
- **Weather tool** — example tool integration via `ai/tools.ts`

---

## Project Structure

```
manibot/
├── ai/
│   ├── providers.ts         # Groq model registry + default
│   └── tools.ts             # AI tool definitions (weather, etc.)
├── app/
│   ├── api/
│   │   ├── chat/            # POST /api/chat — main streaming endpoint
│   │   ├── login/           # POST /api/login — sets auth cookie
│   │   ├── messages/        # GET/POST /api/messages
│   │   └── sessions/        # GET/POST/DELETE /api/sessions
│   ├── login/               # Login page
│   └── page.tsx             # Main chat UI
├── components/              # shadcn/ui components
├── docs/                    # Internal documentation
├── lib/
│   ├── db.ts                # Neon Postgres client + queries
│   └── hooks/               # Custom React hooks
├── prompts/
│   └── manibot-system.md    # ManiBot's system prompt (edit this to change behavior)
├── public/                  # Static assets, PWA icons, manifest, service worker
├── middleware.ts            # Auth gate — protects all routes except /login + assets
└── instrumentation.ts       # OpenTelemetry setup
```

---

## Local Setup

### 1. Clone & install

```bash
git clone https://github.com/Manitec/manibot.git
cd manibot
pnpm install
```

### 2. Set up environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```env
GROQ_API_KEY=          # Your Groq API key — https://console.groq.com
DATABASE_URL=          # Neon Postgres connection string
GATE_PASSWORD=         # Password for the ManiBot login gate
```

> **Tip:** If you have the [Vercel CLI](https://vercel.com/docs/cli) installed and this project linked, you can pull env vars directly:
> ```bash
> vercel link
> vercel env pull
> ```

### 3. Initialize the database

The DB schema is auto-created on first request via `initDB()` in `lib/db.ts`. No manual migration needed.

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with your `GATE_PASSWORD`.

---

## Deployment

ManiBot deploys automatically to Vercel on every push to `main`.

- **Production URL:** [chat.manitec.pw](https://chat.manitec.pw)
- **Vercel Project:** [vercel.com/manitecs-projects/mani_bot](https://vercel.com/manitecs-projects/mani_bot)
- **Vercel Team:** manitec's projects

Required environment variables on Vercel: `GROQ_API_KEY`, `DATABASE_URL`, `GATE_PASSWORD`.

---

## Customization

### Changing ManiBot's personality or behavior

Edit [`prompts/manibot-system.md`](./prompts/manibot-system.md). This file is loaded at runtime by the chat API route. No rebuild needed — just push the change.

### Adding a new AI model

Add the model to the `languageModels` map in [`ai/providers.ts`](./ai/providers.ts):

```ts
"my-new-model": groq("model-id-from-groq"),
```

It will automatically appear in the model selector UI.

### Adding a new AI tool

Define the tool in [`ai/tools.ts`](./ai/tools.ts) and register it in the `tools` object in [`app/api/chat/route.ts`](./app/api/chat/route.ts).

---

## Related Projects

| Project | Description | Repo |
|---|---|---|
| **HexBot** | Internal-ops AI (admin/dev-facing) | Private |
| **Manitec Command Hub** | FastAPI orchestration API (KB, tasks, deploy triggers) | Private |
| **Manitec Control Hub** | Internal dashboard | Private |
| **Banjoshire** | Social chat app — Discord-style community platform | [banjoshire.vercel.app](https://banjoshire.vercel.app) |
| **Joe's Faves** | Personal hub & project index | [joesfaves.com](https://joesfaves.com) |

---

## Contributing

This is a Manitec internal project. Issues and PRs from the team are welcome. External contributions are not currently accepted.

---

*Built by [Manitec](https://manitec.pw)*
