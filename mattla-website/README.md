# Mattla Engineering Solutions

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set `GROQ_API_KEY`. To exercise the chat endpoint locally, run `npx vercel dev` so that Vite and the Vercel function run together. The key is used only by the serverless function in `api/chat.js`; never expose it through a `VITE_` environment variable.

## Vercel deployment

Import this repository into Vercel as a Vite project and set **Root Directory** to `Mattla/mattla-website`. This is required because the website is in that repository subdirectory. Vercel then deploys the frontend from `dist` and the `/api/chat` serverless function together.

In **Project Settings → Environment Variables**, add:

| Name | Required | Value |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes | A Groq API key |
| `GROQ_MODEL` | No | Defaults to `llama-3.3-70b-versatile` |

Deploy after saving the variables. The assistant has access only to the approved Mattla website knowledge defined in `api/chat.js`; update that source when the public service information changes. Ollama is not used in production because Vercel serverless functions cannot host a persistent local model.
