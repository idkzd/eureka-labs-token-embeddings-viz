# 🧠 LLM101n Visualizer (Eureka Labs)

An interactive, real-time visualization tool that demystifies the internal stages of a Large Language Model — from raw text to predicted tokens. Inspired by **Andrej Karpathy's LLM101n** course.

[🚀 View Live Demo on Vercel](https://eureka-labs-token-embeddings-viz.vercel.app)

---

## 🛠 Features

This tool visualizes the 4 critical stages of the LLM pipeline using **production-grade logic**:

1.  **Tokenization (BPE):** Real-time text splitting using the `cl100k_base` vocabulary (the same one used by GPT-4). Powered by `gpt-tokenizer`.
2.  **Embeddings:** Visualization of high-dimensional vectors representing each token.
3.  **Attention Mechanism:** A conceptual look at how tokens attend to context in a sequence.
4.  **Logits & Softmax:** Real-time prediction of the next token with actual probability distributions.

## 🚀 Technical Stack

- **Framework:** React / Vite
- **Styling:** Tailwind CSS
- **Tokenization Engine:** `gpt-tokenizer` (cl100k_base)
- **Deployment:** Vercel

## 📖 About the Project

This project was built to help students of the **Eureka Labs LLM101n** curriculum better understand the mathematical journey of a prompt. Unlike static diagrams, this visualizer allows you to input any text and see exactly how it would be processed by a modern transformer-based model.

---
Built with ♥ for the AI community. Inspired by Andrej Karpathy.
