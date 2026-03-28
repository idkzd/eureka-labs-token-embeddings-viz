import { motion, AnimatePresence } from 'framer-motion';
import { getEmbedding } from './tokenizer';

export default function StageEmbedding({ tokens }) {
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
        Each token ID is looked up in an <span className="text-orange font-semibold">embedding matrix</span>,
        producing a dense vector of <span className="text-indigo-400 font-semibold">512 dimensions</span> (shown here as 8 for clarity).
        These vectors encode semantic meaning.
      </p>

      <div className="space-y-3">
        <AnimatePresence>
          {tokens.map((token, i) => {
            const vec = getEmbedding(token.id);
            return (
              <motion.div
                key={`embed-${i}`}
                layoutId={`token-pill-${i}`}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/60"
              >
                {/* Token label */}
                <div
                  className="shrink-0 px-3 py-1.5 rounded-lg border text-sm font-semibold font-mono w-20 text-center"
                  style={{
                    background: token.color.bg,
                    borderColor: token.color.border,
                    color: token.color.text,
                  }}
                >
                  {token.text}
                </div>
                {/* Arrow */}
                <div className="shrink-0 text-slate-600 text-xs">→</div>
                {/* Vector bars */}
                <div className="flex items-end gap-1 flex-1">
                  {vec.map((val, j) => (
                    <motion.div
                      key={j}
                      className="flex-1 flex flex-col items-center gap-0.5"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: i * 0.08 + j * 0.04, duration: 0.4 }}
                      style={{ transformOrigin: 'bottom' }}
                    >
                      <div className="text-[9px] mono text-slate-600 truncate max-w-full">{val}</div>
                      <div
                        className="w-full rounded-sm min-h-[4px]"
                        style={{
                          height: `${Math.abs(val) * 24 + 4}px`,
                          background: val >= 0 ? token.color.border : '#475569',
                          opacity: 0.85,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                {/* Dimension badge */}
                <div className="shrink-0 text-xs text-slate-500 mono">d=512</div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--orange)' }} />
          Positive weight
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-slate-600" />
          Negative weight
        </div>
        <div className="ml-auto">Each token → ℝ⁵¹²</div>
      </div>
    </div>
  );
}
