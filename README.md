# 📊 Earnings Call Research Analyst

> An AI-powered full-stack research tool that analyzes earnings call transcripts and generates structured, analyst-style summaries — built to demonstrate document ingestion, structured AI summarization, judgment-based financial analysis, and clean full-stack architecture.

---

## 🚀 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | (https://earnings-call-reasearch.vercel.app/) |
| **Backend** | (https://earnings-call-reasearch.onrender.com) |

> ⏱️ **Note:** The backend is hosted on a free tier and may take ~20–30 seconds to wake up on first request.

---

## 🎯 Features

- Upload **text-based PDFs** or **.txt transcripts**
- Optional **paste-in transcript** text input
- AI-generated structured research summaries including:
  - Management tone classification
  - Confidence level assessment
  - 3–5 key positives
  - 3–5 key concerns
  - Forward guidance (Revenue, Margin, Capex)
  - Capacity utilization commentary
  - New growth initiatives
- Strict **no-hallucination prompt design**
- **JSON-structured output** with validation
- Clean, **analyst-style UI**
- **Free-tier optimized** API usage

---

## 🧠 AI Design Decisions

| Decision | Rationale |
|----------|-----------|
| Gemini Flash model | Optimized for free-tier quota limits |
| Single-call summarization | Prevents quota exhaustion from multi-call chains |
| Transcript trimming | Manages token limits for large documents |
| Anti-hallucination constraints | Enforced via explicit system-level prompt directives |
| Structured output schema | JSON validation before frontend rendering ensures reliability |

---

## 🏗️ Architecture

```
earnings-call-research/
│
├── backend/
│   ├── server.js
│   ├── services/
│   │   └── geminiService.js
│   ├── utils/
│   │   └── pdfExtractor.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── services/api.js
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Start the server

```bash
node server.js
```

The backend will be running at `http://localhost:5000`

---

## 🎨 Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Start the dev server

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`

---

## 🌍 Deployment

| Layer | Platform | Notes |
|-------|----------|-------|
| Backend | [Render](https://render.com) | Environment variables configured via dashboard |
| Frontend | [Vercel](https://vercel.com) | Auto-deploys from `main` branch |

**Security practices:**
- CORS restricted to production frontend domain
- `.env` excluded via `.gitignore`
- API keys configured as secure environment variables — never committed to source control

---

## ⚠️ Limitations

- Supports **text-based PDFs only** — image-based/scanned PDFs are detected and rejected
- OCR is not enabled on the free tier
- Transcript size is trimmed to stay within free API token limits

---

## 🧩 Key Engineering Decisions

- **Separated API layer** (`services/api.js`) for clean frontend/backend decoupling
- **JSON parsing validation** before rendering to prevent malformed output reaching the UI
- **Environment-based API URLs** for seamless local ↔ production switching
- **Controlled CORS configuration** restricting access to the production frontend
- **Single-call AI architecture** for stability and quota efficiency
- **Clear error messaging** for unsupported input types

---

## 📌 Future Improvements

- [ ] OCR support for scanned PDFs
- [ ] Streaming AI responses for faster perceived performance
- [ ] Export summary as PDF
- [ ] Multi-transcript comparison view
- [ ] Financial metrics extraction dashboard

---

## 👨‍💻 Author

Built by **[Aastik Nayyar]** as part of a technical internship assignment to demonstrate full-stack AI application development.

---

## 📄 License

This project is for demonstration and educational purposes.
