import type { Alert } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export type LlmProvider = "openai" | "anthropic" | "deterministic";

export type AiAdapter = {
  provider: LlmProvider;
  explainAlert: (alert: Alert, question?: string) => Promise<string>;
};

function deterministicExplain(alert: Alert, question?: string) {
  const questionLead = question
    ? `You asked: “${question}”\n\n`
    : "";
  return `${questionLead}Velora flagged this because the numbers do not match the rules Meridian Supply already agreed to.

What happened
${alert.summary}

Why it matters
${alert.whyItMatters} The amount at risk is ${formatCurrency(alert.dollarImpact)}.

Evidence
${alert.evidence.map((item) => `• ${item.label}: ${item.value} (${item.source})`).join("\n")}

Recommended next step
${alert.recommendedActions[0]?.label ?? "Review with Finance"}. Velora will not complete this action unless a human approves it.`;
}

async function openaiExplain(alert: Alert, question?: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return deterministicExplain(alert, question);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are Velora, an AI safety layer for finance and operations. Explain alerts in a concise, trustworthy, business-friendly tone. Never sound like a chatbot. Structure answers as: What happened, Why it matters, Evidence, What to do. Do not invent facts beyond the provided alert.",
        },
        {
          role: "user",
          content: JSON.stringify({ question, alert }),
        },
      ],
    }),
  });

  if (!response.ok) return deterministicExplain(alert, question);
  const json = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return json.choices?.[0]?.message?.content ?? deterministicExplain(alert, question);
}

async function anthropicExplain(alert: Alert, question?: string) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return deterministicExplain(alert, question);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `Explain this Velora alert to a finance leader.\n${JSON.stringify({ question, alert })}`,
        },
      ],
    }),
  });

  if (!response.ok) return deterministicExplain(alert, question);
  const json = (await response.json()) as {
    content?: { text?: string }[];
  };
  return json.content?.[0]?.text ?? deterministicExplain(alert, question);
}

export function getAiAdapter(): AiAdapter {
  if (process.env.ANTHROPIC_API_KEY) {
    return { provider: "anthropic", explainAlert: anthropicExplain };
  }
  if (process.env.OPENAI_API_KEY) {
    return { provider: "openai", explainAlert: openaiExplain };
  }
  return { provider: "deterministic", explainAlert: async (alert, question) => deterministicExplain(alert, question) };
}
