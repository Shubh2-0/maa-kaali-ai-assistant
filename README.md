<p align="center">
  <img src="public/logo.png" alt="Maa Kaali Creations" width="140" />
</p>

<h1 align="center">🛍️ Maa Kaali Creations — AI Shopping Assistant</h1>

<p align="center">
  <strong>Smart, multilingual AI chatbot for <a href="https://maakaalicreations.in">maakaalicreations.in</a> — India's trusted ethnic wear brand</strong>
</p>

<p align="center">
  <a href="https://saree-chatbot.vercel.app"><img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-E91E63?style=for-the-badge" alt="Live Demo" /></a>
  &nbsp;
  <a href="https://maakaalicreations.in"><img src="https://img.shields.io/badge/🌐_Store-maakaalicreations.in-FF6B35?style=for-the-badge" alt="Store" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/osmAPI-Qwen_3.5-FF6B35?style=flat-square" alt="osmAPI" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Products-633+-E91E63?style=flat-square" />
  <img src="https://img.shields.io/badge/Languages-7-4CAF50?style=flat-square" />
  <img src="https://img.shields.io/badge/Customers-1000+-FFB300?style=flat-square" />
  <img src="https://img.shields.io/badge/Voice_Input-Enabled-9C27B0?style=flat-square" />
  <img src="https://img.shields.io/badge/Dark_Mode-Supported-212121?style=flat-square" />
</p>

---

## 🎯 What is this?

An **AI-powered shopping assistant** built for [Maa Kaali Creations](https://maakaalicreations.in) — a real Indian ethnic wear e-commerce store with **1000+ happy customers**.

Instead of browsing through hundreds of products, customers simply **chat** with the AI — in their own language — and get personalized saree, lehenga, and suit set recommendations instantly.

> **"Show me red silk saree under ₹1500"** → AI recommends the best matching products from 633+ catalog

Powered by **osmAPI's Qwen 3.5 model** for intelligent, context-aware conversations.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI & Chat
- Conversational shopping (osmAPI + Qwen 3.5)
- ChatGPT-style typing animation
- Smart product recommendations
- Chat history saved across refreshes
- Handles API failures gracefully

</td>
<td width="50%">

### 🌍 Languages & Voice
- **7 Languages:** English, Hindi, Punjabi, Gujarati, Tamil, Bengali, Marathi
- 🎤 Voice input with language-specific recognition
- Language-aware welcome messages
- Regional script support

</td>
</tr>
<tr>
<td>

### 🛒 Shopping
- 633+ real products from live database
- Smart price filtering ("under ₹1000")
- Quick category browsing
- Product image zoom
- Direct links to product pages

</td>
<td>

### 🎨 UI/UX
- 🌙 Dark mode toggle
- Share via WhatsApp, Facebook, Twitter/X
- Copy product link
- Special info cards (Blog, Contact, Shipping)
- Fully responsive (Mobile + Desktop)

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

<table>
<tr>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
  <br><sub>React 18</sub>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
  <br><sub>Tailwind CSS</sub>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
  <br><sub>Vite</sub>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=vercel" width="48" height="48" alt="Vercel" />
  <br><sub>Vercel</sub>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=mongodb" width="48" height="48" alt="MongoDB" />
  <br><sub>MongoDB</sub>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
  <br><sub>Node.js</sub>
</td>
</tr>
</table>

| Layer | Technology |
|-------|-----------|
| **AI Model** | Qwen 3.5 via [osmAPI](https://osmapi.com) |
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **Hosting** | Vercel (Serverless Functions) |
| **Database** | MongoDB (Live API) |
| **Images** | Cloudinary CDN |
| **Voice** | Web Speech API |

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   User Input                     │
│            (Text / Voice / Category)             │
└──────────────────────┬──────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │ Special  │ │ No Match │ │  Normal  │
   │  Query   │ │ Found    │ │  Query   │
   │(blog,    │ │          │ │          │
   │ contact) │ │          │ │          │
   └────┬─────┘ └────┬─────┘ └────┬─────┘
        │             │            │
        ▼             ▼            ▼
   Show Info    Show Cheapest   Filter Products
     Card       Alternatives    from 633+ DB
                                     │
                                     ▼
                              ┌──────────────┐
                              │   osmAPI      │
                              │  Qwen 3.5    │
                              └──────┬───────┘
                                     │
                                     ▼
                              Clean Response
                              + Product Cards
                                     │
                           ┌─────────┼─────────┐
                           ▼         ▼         ▼
                        Typing    Product    Share
                        Effect    Zoom     Buttons
```

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/Shubh2-0/maa-kaali-ai-assistant.git
cd maa-kaali-ai-assistant

# Install dependencies
npm install

# Add your osmAPI key
echo "OSM_API_KEY=your_key_here" > .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `OSM_API_KEY` | Your osmAPI key — [get one here](https://osmapi.com) |

---

## 🏪 About Maa Kaali Creations

<table>
<tr>
<td>

[**maakaalicreations.in**](https://maakaalicreations.in) — A trusted Indian ethnic wear e-commerce brand.

- 🛍️ **633+ Products** — Sarees, Lehengas, Suit Sets
- 👥 **1000+ Happy Customers & Growing**
- 🚚 **Free Shipping** on every order
- 💳 **COD Available**
- ↩️ **Easy 24-Hour Returns**
- 🤖 **Entire store built using AI tools** — Backend, Frontend, Admin Panel

</td>
<td>
  <img src="public/logo.png" width="200" alt="Maa Kaali Creations" />
</td>
</tr>
</table>

### 📱 Follow Us

<p>
  <a href="https://www.instagram.com/maakaali_creations"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
  <a href="https://www.facebook.com/profile.php?id=61577363595465"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" /></a>
  <a href="https://www.youtube.com/@MaaKaali_Creations"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" /></a>
</p>

---

## 👨‍💻 Author

<table>
<tr>
<td>

### **Shubham Bhati**

Co-founder of Maa Kaali Creations

<a href="https://www.linkedin.com/in/bhatishubham"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://shubh2-0.github.io"><img src="https://img.shields.io/badge/Portfolio-000?style=for-the-badge&logo=github&logoColor=white" alt="Portfolio" /></a>
<a href="https://github.com/Shubh2-0"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="https://wa.me/916232133187"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" /></a>
<a href="mailto:shubhambhati226@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>

</td>
</tr>
</table>

---

<p align="center">
  Built with ❤️ using <strong>osmAPI</strong> for the <strong>osmAPI Hiring Task</strong><br/><br/>
  <img src="https://img.shields.io/badge/Powered_by-osmAPI_+_Qwen_AI-FF6B35?style=for-the-badge" alt="Powered by osmAPI" />
</p>
