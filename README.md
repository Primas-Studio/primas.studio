# Primas Chat

A modern ChatGPT-like web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design similar to ChatGPT
- 🌙 Dark/Light theme toggle
- 💬 Real-time chat interface
- 📱 Mobile-friendly with collapsible sidebar
- ✨ Typing indicators and smooth animations
- 📝 Markdown support for rich text responses
- 🔄 Message history
- 🎯 Clean, intuitive UI/UX

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **React Markdown** - Markdown rendering
- **Framer Motion** - Smooth animations

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main chat interface
├── components/          # Reusable components
├── lib/                 # Utilities and helpers
└── public/             # Static assets
```

## Customization

To connect this to a real AI service:

1. Create an API route in `app/api/chat/route.ts`
2. Integrate with your preferred AI service (OpenAI, Anthropic, etc.)
3. Replace the mock response function with actual API calls

## Deployment

Deploy on Vercel, Netlify, or any platform that supports Next.js.

## License

MIT License
