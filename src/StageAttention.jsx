import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function StageAttention({ tokens }) {
  const [activeIdx, setActiveIdx] = useState(tokens.length - 1);

  useEffect(() => {
    setActiveIdx(tokens.length - 1);
  }, [tokens.length]);

  if (!tokens.length) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-600 text-sm">
        Complete tokenization first...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-400">
        In the <span className="text-orange font-semibold">self-attention</span> layer, each token attends to
        all previous tokens in the context window. Lines show attention connections — click a token to inspect
        its context.
      </p>

      {/* Token row with attention lines */}
      <div className="relative">
        <AttentionCanvas tokens={tokens} activeIdx={activeIdx} />

        {/* Clickable tokens */}
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          {tokens.map((token, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIdx(i)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg border font-semibold text-sm transition-all duration-200 cursor-pointer"
              style={{
                background: activeIdx === i ? token.color.bg : 'rgba(15,23,42,0.8)',
                borderColor: activeIdx === i ? token.color.border : '#334155',
                color: activeIdx === i ? token.color.text : '#94a3b8',
                boxShadow: activeIdx === i ? `0 0 16px ${token.color.bg}` : 'none',
              }}
            >
              {token.text}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Attention weights table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-semibold uppercase tracking-widest">
          Attention Weights for "{tokens[activeIdx]?.text}"
        </div>
        <div className="divide-y divide-slate-800">
          {tokens.slice(0, activeIdx + 1).map((t, i) => {
            const weight = computeWeight(activeIdx, i, tokens.length);
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                <span
                  className="text-sm font-mono font-semibold w-20 shrink-0"
                  style={{ color: t.color.text }}
                >
                  {t.text}
                </span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${weight * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    style={{ background: tokens[activeIdx].color.border }}
                  />
                </div>
                <span className="text-xs mono text-slate-500 w-10 text-right">{weight.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-slate-600 text-center">
        Causal masking: token at position <span className="text-slate-400">{activeIdx}</span> can only attend to positions ≤ {activeIdx}
      </div>
    </div>
  );
}

function computeWeight(queryIdx, keyIdx, total) {
  // Simulate causal attention: recency bias + slight variation
  const distance = queryIdx - keyIdx;
  const seed = (queryIdx * 31 + keyIdx * 17) % 100;
  const base = Math.exp(-distance * 0.4) * 0.6 + (seed / 100) * 0.35;
  return Math.min(Math.max(base, 0.04), 1);
}

function AttentionCanvas({ tokens, activeIdx }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !tokens.length) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw arc connections from activeIdx to earlier tokens
    const n = activeIdx + 1;
    const slotW = canvas.width / tokens.length;
    const cy = canvas.height;

    for (let i = 0; i < n; i++) {
      if (i === activeIdx) continue;
      const x1 = slotW * activeIdx + slotW / 2;
      const x2 = slotW * i + slotW / 2;
      const weight = computeWeight(activeIdx, i, tokens.length);

      ctx.beginPath();
      ctx.moveTo(x1, cy);
      const cpY = cy - 40 - Math.abs(x1 - x2) * 0.35;
      ctx.quadraticCurveTo((x1 + x2) / 2, cpY, x2, cy);
      ctx.strokeStyle = `rgba(255,173,17,${weight * 0.7})`;
      ctx.lineWidth = weight * 2.5;
      ctx.stroke();
    }
  }, [activeIdx, tokens]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={80}
      className="w-full"
      style={{ maxHeight: 80 }}
    />
  );
}
