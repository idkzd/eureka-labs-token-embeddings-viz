// Mock minBPE-style tokenizer
// Based on common subword patterns similar to GPT-2's BPE vocabulary

const BPE_VOCAB = {
  // Common words/subwords with realistic GPT-2-style token IDs
  'AI': 9820,
  'is': 318,
  'simple': 2829,
  'the': 262,
  'a': 257,
  'an': 281,
  'in': 287,
  'to': 284,
  'of': 286,
  'and': 290,
  'Hello': 15496,
  'World': 2159,
  'hello': 31373,
  'world': 995,
  'The': 464,
  'Transformer': 8291,
  'attention': 3241,
  'neural': 17019,
  'network': 3127,
  'deep': 2769,
  'learning': 4673,
  'language': 3303,
  'model': 2746,
  'token': 11241,
  'embed': 11525,
  'What': 2061,
  'How': 1374,
  'Why': 4162,
  'I': 40,
  'you': 345,
  'this': 428,
  'that': 326,
  'it': 340,
  'are': 389,
  'was': 373,
  'be': 307,
  'with': 351,
  'have': 423,
  'my': 616,
  'we': 356,
  'at': 379,
  'from': 422,
  'not': 407,
};

const TOKEN_COLORS = [
  { bg: 'rgba(255,173,17,0.15)', border: '#ffad11', text: '#ffad11' },
  { bg: 'rgba(99,102,241,0.15)', border: '#818cf8', text: '#a5b4fc' },
  { bg: 'rgba(16,185,129,0.15)', border: '#10b981', text: '#34d399' },
  { bg: 'rgba(245,101,101,0.15)', border: '#f56565', text: '#fc8181' },
  { bg: 'rgba(236,72,153,0.15)', border: '#ec4899', text: '#f472b6' },
  { bg: 'rgba(20,184,166,0.15)', border: '#14b8a6', text: '#2dd4bf' },
  { bg: 'rgba(139,92,246,0.15)', border: '#8b5cf6', text: '#a78bfa' },
];

function getOrAssignId(word, cache) {
  if (BPE_VOCAB[word]) return BPE_VOCAB[word];
  if (cache[word]) return cache[word];
  // Generate a deterministic fake ID from character codes
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = ((hash << 5) - hash) + word.charCodeAt(i);
    hash |= 0;
  }
  const id = Math.abs(hash) % 40000 + 1000;
  cache[word] = id;
  return id;
}

export function tokenize(text) {
  if (!text.trim()) return [];
  const idCache = {};
  // Simple word + punctuation split
  const raw = text.match(/[\w']+|[^\s\w]/g) || [];
  return raw.map((word, i) => ({
    text: word,
    id: getOrAssignId(word, idCache),
    color: TOKEN_COLORS[i % TOKEN_COLORS.length],
  }));
}

// Mock embedding: deterministic vector from token id
export function getEmbedding(tokenId, dims = 8) {
  const vec = [];
  let seed = tokenId;
  for (let i = 0; i < dims; i++) {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    vec.push(parseFloat(((seed / 0x7fffffff) * 2 - 1).toFixed(3)));
  }
  return vec;
}

// Mock logits: top 3 predicted next tokens
const NEXT_WORD_HINTS = {
  'AI': [{ word: 'is', prob: 0.42 }, { word: 'can', prob: 0.28 }, { word: 'models', prob: 0.18 }],
  'is': [{ word: 'a', prob: 0.38 }, { word: 'not', prob: 0.25 }, { word: 'an', prob: 0.21 }],
  'simple': [{ word: 'and', prob: 0.31 }, { word: 'but', prob: 0.24 }, { word: '.', prob: 0.19 }],
  'the': [{ word: 'model', prob: 0.29 }, { word: 'attention', prob: 0.22 }, { word: 'next', prob: 0.18 }],
  'hello': [{ word: 'world', prob: 0.58 }, { word: 'there', prob: 0.22 }, { word: 'friend', prob: 0.12 }],
  'Hello': [{ word: 'World', prob: 0.55 }, { word: 'there', prob: 0.24 }, { word: 'friend', prob: 0.13 }],
  'World': [{ word: '!', prob: 0.44 }, { word: 'is', prob: 0.27 }, { word: 'of', prob: 0.17 }],
  'deep': [{ word: 'learning', prob: 0.61 }, { word: 'neural', prob: 0.19 }, { word: 'dive', prob: 0.11 }],
  'language': [{ word: 'model', prob: 0.51 }, { word: 'models', prob: 0.29 }, { word: 'understanding', prob: 0.12 }],
};

export function getLogits(lastToken) {
  if (NEXT_WORD_HINTS[lastToken]) return NEXT_WORD_HINTS[lastToken];
  // Generic fallback
  return [
    { word: 'the', prob: 0.34 },
    { word: 'a', prob: 0.22 },
    { word: 'is', prob: 0.17 },
  ];
}
