export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "LogInSight",
  slug: "loginsight",
  tagline: "Plain-English explanations for scary error logs.",
  description: "Paste a stack trace or error log and get a calm, plain-English breakdown: what happened, the likely root cause, concrete fix steps, and how to stop it recurring.",
  toolTitle: "Explain this log",
  resultLabel: "Plain-English explanation",
  ctaLabel: "Explain log",
  features: [
  "Decode stack traces into plain English",
  "Point to the likely root cause",
  "Give 2-3 concrete fix steps",
  "Suggest how to prevent it next time"
],
  inputs: [
  {
    "key": "log_text",
    "label": "Paste the error log / stack trace",
    "type": "textarea",
    "placeholder": "e.g. TypeError: Cannot read properties of undefined (reading 'map') at app.js:42"
  },
  {
    "key": "context",
    "label": "Context (optional)",
    "type": "input",
    "placeholder": "e.g. Node 20, Express API, after a dependency bump"
  },
  {
    "key": "focus",
    "label": "What you need most",
    "type": "select",
    "options": [
      "Root cause",
      "Quick fix",
      "Both"
    ]
  }
] as InputField[],
  systemPrompt: "You are a senior site-reliability engineer. Given an error log or stack trace, a short context, and what the user needs most, explain it in plain English. Always structure your response as: (1) what happened in one sentence, (2) the likely root cause, (3) 2-3 concrete fix steps, (4) one prevention tip. Be calm and specific; do not invent details you cannot see. In demo (mock) mode, return a realistic sample explanation following exactly this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "5 explanations/mo"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const log = (inputs['log_text'] || '').trim()
  const ctx = (inputs['context'] || '').trim()
  const focus = inputs['focus'] || 'Both'
  if (!log) return 'Paste an error log or stack trace to get a plain-English explanation.'
  let out = 'LOG EXPLANATION' + (ctx ? ' - ' + ctx : '') + '\n\n'
  out += 'What happened: the code tried to read a property on something that was undefined.\n\n'
  out += 'Likely root cause: a value that used to be present is now missing - often after a refactor, an API change, or a failed lookup that was not guarded.\n\n'
  out += 'Fix steps:\n'
  out += '  1. Find where the value is produced and add a guard (if (x) x.map(...)).\n'
  out += '  2. Log the actual value right before the crash to see what arrived.\n'
  out += '  3. If it comes from an API, check the response shape changed.\n\n'
  out += 'Prevention: add a type/shape check at the boundary so missing data fails loudly, not silently.\n'
  out += '\n--- (Mock demo. Paste your real log for a tailored explanation.)'
  return out
}
}
