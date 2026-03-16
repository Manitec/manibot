<a href="https://ai-sdk-starter-groq.vercel.app">
  <h1 align="center">Vercel x Groq Chatbot</h1>
</a>

<p align="center">
  An open-source AI chatbot app template built with Next.js, the AI SDK by Vercel, and Groq.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

* Streaming text responses powered by the [AI SDK by Vercel](https://sdk.vercel.ai/docs), allowing multiple AI providers to be used interchangeably with just a few lines of code.
* Built-in tool integration for extending AI capabilities (demonstrated with a weather tool example).
* Reasoning model support.
* [shadcn/ui](https://ui.shadcn.com/) components for a modern, responsive UI powered by [Tailwind CSS](https://tailwindcss.com).
* Built with the latest [Next.js](https://nextjs.org) App Router.

## Deploy Your Own

You can deploy your own version to Vercel by clicking the button below:

[!\[Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=Vercel+x+Groq+Chatbot&repository-name=ai-sdk-starter-groq&repository-url=https%253A%252F%252Fgithub.com%252Fvercel-labs%252Fai-sdk-starter-groq&demo-title=Vercel+x+Groq+Chatbot&demo-url=https%253A%252F%252Fai-sdk-starter-groq.labs.vercel.dev%252F&demo-description=A+simple+chatbot+application+built+with+Next.js+that+uses+Groq+via+the+AI+SDK+and+the+Vercel+Marketplace&products=%255B%257B%2522type%2522%253A%2522integration%2522%252C%2522protocol%2522%253A%2522ai%2522%252C%2522productSlug%2522%253A%2522api-key%2522%252C%2522integrationSlug%2522%253A%2522groq%2522%257D%255D)

## Running Locally

1. Clone the repository and install dependencies:

```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Install the [Vercel CLI](https://vercel.com/docs/cli):

```bash
   npm i -g vercel
   # or
   yarn global add vercel
   # or
   pnpm install -g vercel
   ```

   Once installed, link your local project to your Vercel project:

   ```bash
   vercel link
   ```

   After linking, pull your environment variables:

   ```bash
   vercel env pull
   ```

   This will create a `.env.local` file with all the necessary environment variables.

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view your new AI chatbot application.

   ## Authors

   This repository is maintained by the [Vercel](https://vercel.com) team and community contributors.

   Contributions are welcome! Feel free to open issues or submit pull requests to enhance functionality or fix bugs.

