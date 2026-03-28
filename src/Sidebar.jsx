import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Cpu, Grid3x3, Zap, ExternalLink } from 'lucide-react';

const CONCEPTS = [
  {
    icon: <Cpu size={18} />,
    title: 'Token',
    color: '#ffad11',
    summary: 'The atomic unit of text for an LLM.',
    body: `A token is a chunk of text — it could be a whole word like "cat", a subword like "un" from "unhappy", or even a single character. GPT-4 uses ~100k tokens; GPT-2 uses 50,257. Byte Pair Encoding (BPE) builds this vocabulary by repeatedly merging the most frequent byte pair.`,
    link: 'https://github.com/karpathy/minbpe',
    linkLabel: 'minBPE on GitHub',
  },
  {
    icon: <Grid3x3 size={18} />,
    title: 'Embedding',
    color: '#818cf8',
    summary: 'Tokens mapped to meaningful vector space.',
    body: `An embedding is a dense vector of floating-point numbers (e.g., 512 or 4096 dimensions). Token IDs are looked up in a learned embedding matrix (shape: vocab_size × d_model). Semantically similar tokens cluster together — "king" − "man" + "woman" ≈ "queen" famously demonstrates this.`,
    link: 'https://github.com/karpathy/llm.c',
    linkLabel: 'llm.c on GitHub',
  },
  {
    icon: <Zap size={18} />,
    title: 'Transformer',
    color: '#34d399',
    summary: 'Self-attention + MLP, repeated N times.',
    body: `A Transformer block has two parts: Multi-Head Self-Attention (MHSA), which lets each token blend information from all previous tokens via learned Q, K, V projections; and a Feed-Forward Network (FFN) applied per-position. GPT-2-small has 12 such layers; GPT-4 has ~96. Layer norms + residual connections make training stable.`,
    link: 'https://github.com/karpathy/nanoGPT',
    linkLabel: 'nanoGPT on GitHub',
  },
  {
    icon: <BookOpen size={18} />,
    title: 'LLM101n',
    color: '#f472b6',
    summary: "Karpathy's course: build a GPT from scratch.",
    body: `LLM101n by Andrej Karpathy (Eureka Labs) is a planned ground-up curriculum for building and training a large language model from scratch. It covers everything from tokenization and embeddings to transformer architecture, pretraining, finetuning, RLHF, and deployment. The philosophy: if you understand every line of code, you truly understand LLMs.`,
    link: 'https://github.com/karpathy/LLM101n',
    linkLabel: 'LLM101n on GitHub',
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col"
            style={{ background: '#0f172a', borderLeft: '1px solid #1e293b' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen size={18} style={{ color: 'var(--orange)' }} />
                <span className="font-semibold text-white">Concept Library</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {CONCEPTS.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-xl border border-slate-800 overflow-hidden"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 px-4 py-3"
                    style={{ background: `${c.color}10`, borderBottom: `1px solid ${c.color}20` }}
                  >
                    <span style={{ color: c.color }}>{c.icon}</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{c.title}</div>
                      <div className="text-xs text-slate-500">{c.summary}</div>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="px-4 py-3 bg-slate-900/40">
                    <p className="text-xs text-slate-400 leading-relaxed">{c.body}</p>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                      style={{ color: c.color }}
                    >
                      <ExternalLink size={11} />
                      {c.linkLabel}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-600 text-center">
              Powered by{' '}
              <span style={{ color: 'var(--orange)' }}>Eureka Labs</span> · LLM101n Visualizer
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
