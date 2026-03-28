<div align="center">

# 🧠 LLM101n Visualizer

### *Step inside the mind of a Large Language Model*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-eureka--labs--viz.vercel.app-ffad11?style=for-the-badge&labelColor=0f172a)](https://eureka-labs-token-embeddings-viz.vercel.app)
[![Inspired By](https://img.shields.io/badge/Inspired_by-Andrej_Karpathy-818cf8?style=for-the-badge&labelColor=0f172a)](https://github.com/karpathy/LLM101n)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&labelColor=0f172a)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-34d399?style=for-the-badge&labelColor=0f172a)](LICENSE)

<br/>

> **An interactive, stage-by-stage visualization of how a Large Language Model processes text —**  
> from raw characters to predicted tokens. Built as a tribute to [Andrej Karpathy's LLM101n](https://github.com/karpathy/LLM101n) and the Eureka Labs mission to make AI education accessible to everyone.

<br/>

</div>

---

## ✨ What Makes This Different

Most LLM explainers show you a diagram. This one **lets you type any text** and watch the model think in real time — with real GPT-4 tokenization, not mocks.

| Feature | Description |
|---|---|
| 🔤 **Real Tokenization** | Uses `gpt-tokenizer` with the actual `cl100k_base` vocabulary (same as GPT-4) |
| 🎯 **Deterministic Embeddings** | Every token always maps to the same unique vector fingerprint |
| 👁️ **Causal Attention** | Visualizes exactly which tokens each position attends to, with weight bars |
| 📊 **Live Logits** | Top-3 next-token predictions rendered as an animated probability chart |
| ⚡ **Zero Backend** | Runs entirely in the browser — no API keys, no server |
| 🎨 **Premium UI** | Framer Motion animations, Eureka Orange accents, deep dark mode |

---

## 🗺️ The 4 Stages of an LLM

### `Stage 1` — 🔤 Tokenization

Text is not fed into a model as characters. It's first converted into **integer token IDs** using **Byte Pair Encoding (BPE)**.

This visualizer uses the real `cl100k_base` vocabulary — the exact same tokenizer used by GPT-4 and GPT-3.5-turbo. Type *"AI is simple"* and watch it become `[15836, 374, 4382]` before your eyes.

```
"AI is simple"  →  ["AI", " is", " simple"]  →  [15836, 374, 4382]
```

---

### `Stage 2` — 🧮 Embedding Space

Each token ID is looked up in a learned **embedding matrix** (shape: `vocab_size × d_model`), producing a dense vector of floating-point numbers.

This visualizer computes a **deterministic fingerprint** for each token using a golden-ratio sine function — meaning the same token always has the same visual pattern, making it easy to spot repeated tokens across different inputs.

```
token_id  →  [0.412, -0.837, 0.203, ..., 0.651]  ∈ ℝ⁵¹²
```

---

### `Stage 3` — 🔗 Self-Attention

The heart of the Transformer. Every token computes **Query, Key, and Value** projections, then attends to all previous positions via scaled dot-product attention.

Click any token in the visualizer to see its exact attention weight distribution across context — with orange arcs connecting it back through the sequence and a live weight table underneath.

```
Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V
```

> **Causal masking** ensures that token at position *i* can only attend to positions ≤ *i*, preventing information leakage from the future.

---

### `Stage 4` — 📈 Output Logits

After passing through all transformer layers, the final hidden state is projected to a **logit vector** over the full vocabulary (~100k entries for cl100k_base). Softmax converts this to a probability distribution.

The visualizer shows the **top 3 predictions** with their real vocabulary IDs, rendered as an animated gradient bar chart.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| ⚛️ Framework | React 19 + Vite 8 |
| 🎨 Styling | Tailwind CSS v4 |
| 🎞️ Animations | Framer Motion 12 |
| 🔤 Tokenizer | [`gpt-tokenizer`](https://github.com/niieani/gpt-tokenizer) — cl100k_base |
| 🖼️ Icons | Lucide React |
| 📦 Bundler | Vite with `@tailwindcss/vite` plugin |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/idkzd/llm101n-visualizer.git
cd llm101n-visualizer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🎓 Mission

This project is a small contribution to the **AI education ecosystem**.

Andrej Karpathy's [LLM101n](https://github.com/karpathy/LLM101n) sets out to explain every part of a large language model from scratch — from bytes to transformers to RLHF. LLM101n Visualizer is a companion tool for that journey: instead of reading about tokenization, you **see** it. Instead of understanding attention abstractly, you **click** on it.

> *"If you understand every line of code, you truly understand LLMs."*  
> — Andrej Karpathy

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the project
2. Create your branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add something amazing'`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

---

## ⭐ Show Your Support

If this project helped you understand how LLMs work — even a little — please consider giving it a star. It helps more people discover it.

[![Star on GitHub](https://img.shields.io/github/stars/idkzd/llm101n-visualizer?style=social)](https://github.com/idkzd/llm101n-visualizer)

---

## 📄 License

MIT © [idkzd](https://github.com/idkzd)

---

<div align="center">

Built with ♥ inspired by [Andrej Karpathy's LLM101n](https://github.com/karpathy/LLM101n) · Powered by [gpt-tokenizer](https://github.com/niieani/gpt-tokenizer)

<br/>

*Made by [**idkzd**](https://github.com/idkzd)*

</div>
