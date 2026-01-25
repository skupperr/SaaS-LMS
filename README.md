# Learnly AI  
**AI Voice Tutoring Platform for Students and Self-Learners**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Clerk](https://img.shields.io/badge/Auth%20%26%20Billing-Clerk-purple?logo=clerk)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase)
![Styling](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-black)
![Vapi](https://img.shields.io/badge/Voice%20AI-Vapi-orange)
![Sentry](https://img.shields.io/badge/Monitoring-Sentry-362D59?logo=sentry)
![License](https://img.shields.io/badge/License-MIT-green)

Learnly AI is a **production-grade SaaS learning platform** that enables students and self-learners to interact with **AI-powered voice tutors** tailored to specific subjects and teaching styles. The platform combines real-time voice conversations, subscription-based access control, and a scalable full-stack architecture built for real-world deployment.

---

## 🚀 Repository
**GitHub:** https://github.com/skupperr/SaaS-LMS

---

## 🧠 Core Idea

Most learning platforms are passive. Learnly AI is built around **active, conversational learning**:

- Real-time voice interaction with AI tutors  
- Tutors are purpose-built (subject, topic, style)  
- Access controlled via subscription tiers  
- Conversations are persistent, searchable, and reusable  

The goal is not a demo, but a **real SaaS product architecture**.

---

## ⚙️ Tech Stack

### Frontend & Framework
- **Next.js** — Server Components, App Router, API routes
- **TypeScript** — End-to-end static typing
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Accessible, composable UI components

### Authentication, Billing & Users
- **Clerk**
  - Authentication (email, Google, and more)
  - Session management
  - Subscription plans & billing
  - Secure webhook support

### Backend & Data
- **Supabase**
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Server-side admin access

### AI & Voice
- **Vapi**
  - Low-latency voice conversations
  - Speech-to-text & text-to-speech
  - Customizable AI voices
  - Multilingual support

### Observability & Validation
- **Sentry** — Error tracking & performance monitoring
- **Zod** — Runtime schema validation

---

## 🔋 Features

### 🎙 AI Voice Tutors
- Real-time voiced AI tutoring sessions  
- Subject- and style-specific tutors  
- Natural conversational flow  

### 👤 Authentication
- Secure sign-up & sign-in with Clerk  
- OAuth support (Google and more)  
- Session-aware server rendering  

### 💳 Billing & Subscriptions
- Tiered subscription system  
- Backend-enforced access limits  
- Webhook-driven plan synchronization  

#### Plans
- **Basic**
  - 3 conversations / month  
  - 3 active AI companions  
  - Basic session recap  

- **Core**
  - Everything in Basic  
  - Unlimited conversations  
  - Up to 10 active companions  
  - Saved conversation history  

### 📚 Learning Management
- Bookmark AI tutors  
- Persistent session history  
- Conversation recaps for retention  

### 🔍 Search & Discovery
- Search tutors by subject and topic  
- Filtered results for fast discovery  

### 🧩 Code Architecture
- Modular, reusable components  
- Clear separation of concerns  
- Shared utilities and hooks  

### 📱 Cross-Device Support
- Fully responsive UI  
- Optimized for desktop, tablet, and mobile  

---

## 🏗 Architecture Overview

- **Next.js App Router** with server-first rendering  
- **Server-side subscription enforcement**  
- **Webhook-driven billing state updates**  
- **Centralized validation with Zod**  
- **No client exposure of admin credentials**  

Designed to mirror **real SaaS production systems**.

---

## 🛠 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/skupperr/SaaS-LMS.git
cd SaaS-LMS
```
### 2. Install dependencies
```bash
npm install
```
### 3. Environment variables
Create a .env.local file:
```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Sentry
SENTRY_AUTH_TOKEN=
```
### 4. Run the development server
```
npm run dev
```

---
## 🔐 Security
- All privileged operations run server-side
- Subscription status enforced on the backend
- Clerk webhooks are verified before execution
- Supabase RLS prevents unauthorized access


## 🧪 Observability
- Runtime errors captured via Sentry
- Performance insights for production debugging

## 📄 License
This project is licensed under the MIT License.

## 🎯 Why This Project Stands Out

- Learnly AI is not a UI demo or tutorial project. It demonstrates:
- Real SaaS billing and subscription flows
- Production-grade authentication and security
- Voice-based AI tutoring at scale
- Clean, maintainable engineering architecture
- Built the way serious products are built.


## 📬 Contact

Developed with ❤️ by [Asif U. Ahmed](https://github.com/skupperr)