<p align="center">
  <img src="public/logo.png" alt="Maa Kaali Creations" width="120" />
</p>

<h1 align="center">Maa Kaali Creations — AI Shopping Assistant</h1>

<p align="center">
  <strong>An intelligent, multilingual shopping chatbot for <a href="https://maakaalicreations.in">maakaalicreations.in</a></strong>
</p>

<p align="center">
  <a href="https://saree-chatbot.vercel.app">Live Demo</a> &nbsp;|&nbsp;
  <a href="https://maakaalicreations.in">Visit Store</a> &nbsp;|&nbsp;
  <a href="https://www.instagram.com/maakaali_creations">Instagram</a> &nbsp;|&nbsp;
  <a href="https://www.youtube.com/@MaaKaali_Creations">YouTube</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/osmAPI-Qwen_3.5-FF6B35?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=&logoColor=white" alt="osmAPI" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Products-500+-E91E63" alt="Products" />
  <img src="https://img.shields.io/badge/Languages-7-4CAF50" alt="Languages" />
</p>

---

## About

**Maa Kaali Creations** ([maakaalicreations.in](https://maakaalicreations.in)) is a trusted Indian ethnic wear e-commerce brand with **1000+ happy customers** selling sarees, lehengas, and suit sets.

This AI Shopping Assistant is built as a conversational chatbot that helps customers discover and shop products naturally — just like talking to a real salesperson. Powered by **osmAPI's Qwen 3.5 model**, it understands customer preferences and recommends the right products from our catalog of **500+ real products** fetched from our live database.

---

## Features

| Feature | Description |
|---------|-------------|
| **AI Chat** | Conversational shopping powered by osmAPI (Qwen 3.5) |
| **7 Languages** | English, Hindi, Punjabi, Gujarati, Tamil, Bengali, Marathi |
| **Voice Input** | Speak to search — Web Speech API with language detection |
| **500+ Products** | Real product data from live MongoDB database |
| **Smart Recommendations** | AI picks the best products based on your query |
| **Dark Mode** | Toggle between light and dark themes |
| **Typing Effect** | ChatGPT-style letter-by-letter response animation |
| **Product Share** | Share via WhatsApp, Facebook, Twitter/X, or copy link |
| **Image Zoom** | Tap any product image for fullscreen view |
| **Special Cards** | Blog, Contact, About, Shipping — beautiful info cards |
| **Quick Categories** | One-tap browsing: Sarees, Lehengas, Suit Sets, Budget |
| **Smart Fallbacks** | No blank screens ever — handles API failures gracefully |
| **Price Filtering** | "Saree under ₹1000" — understands budget queries |
| **Chat Persistence** | Conversation saved across page refreshes |
| **Responsive** | Optimized for mobile and desktop |
| **Social Links** | Instagram, Facebook, YouTube — real brand handles |

---

## Screenshots

### Light Mode
```
┌──────────────────────────────┐
│  🔴 Maa Kaali Creations     │
│     AI Shopping Assistant    │
│                              │
│  [Sarees] [Lehengas] [Suits]│
│                              │
│  🤖 Welcome! What are you   │
│     looking for today?       │
│                              │
│  ┌─────┐ ┌─────┐            │
│  │ 👗  │ │ 👗  │            │
│  │Saree│ │Saree│            │
│  │₹1299│ │₹1650│            │
│  └─────┘ └─────┘            │
│                              │
│  [🎤] Type or speak... [→]  │
│  📷 Instagram 📘 Facebook   │
└──────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| AI Model | Qwen 3.5 via osmAPI |
| Hosting | Vercel (Serverless) |
| Database | MongoDB (Live API) |
| Voice | Web Speech API |
| Images | Cloudinary CDN |

---

## Architecture

```
User Input
    │
    ├── Special Query? (blog/contact/about/shipping)
    │   └── Show Special Card (no API call)
    │
    ├── No Products Match?
    │   └── Show cheapest alternatives
    │
    └── Normal Query
        ├── Filter relevant products from 500+ catalog
        ├── Send to osmAPI (Qwen 3.5) with product context
        ├── Extract RECOMMEND: indices from AI response
        ├── Clean thinking/reasoning text
        └── Display response + product cards
            │
            └── API Fails? → Show fallback + random products
```

---

## Quick Start

```bash
# Clone
git clone https://github.com/Shubh2-0/maa-kaali-ai-assistant.git
cd maa-kaali-ai-assistant

# Install
npm install

# Add your osmAPI key
echo "OSM_API_KEY=your_key_here" > .env

# Run
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OSM_API_KEY` | Your osmAPI key ([get one here](https://osmapi.com)) |

---

## About the Store

**Maa Kaali Creations** — [maakaalicreations.in](https://maakaalicreations.in)

- Indian ethnic wear (Sarees, Lehengas, Suit Sets)
- 1000+ happy customers
- 500+ products
- Free shipping on orders above ₹999
- COD available
- Easy 7-day returns

### Connect with us

- [Instagram](https://www.instagram.com/maakaali_creations)
- [Facebook](https://www.facebook.com/profile.php?id=61577363595465)
- [YouTube](https://www.youtube.com/@MaaKaali_Creations)

---

## Author

**Shubham Bhati**
- [Portfolio](https://shubh2-0.github.io)
- [LinkedIn](https://www.linkedin.com/in/bhatishubham)
- [GitHub](https://github.com/Shubh2-0)

---

<p align="center">
  Built with osmAPI for the <strong>osmAPI Hiring Task</strong><br/>
  <sub>Powered by osmAPI + Qwen AI</sub>
</p>
