# Mattla Engineering Solutions

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set `OPENAI_API_KEY`. To exercise the chat endpoint locally, run `npx vercel dev` so that Vite and the Vercel function run together. The key is used only by the serverless function in `api/chat.js`; never expose it through a `VITE_` environment variable.

## Vercel deployment

Import this repository into Vercel as a Vite project. Vercel automatically deploys the frontend from `dist` and the `/api/chat` serverless function.

In **Project Settings → Environment Variables**, add:

| Name | Required | Value |
| --- | --- | --- |
| `OPENAI_API_KEY` | Yes | An OpenAI API key |
| `OPENAI_MODEL` | No | Defaults to `gpt-4o-mini` |

Deploy after saving the variables. The assistant has access only to the approved Mattla website knowledge defined in `api/chat.js`; update that source when the public service information changes.
