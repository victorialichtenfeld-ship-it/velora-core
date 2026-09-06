"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { Alert } from "@/lib/types";

export function AskVelora({ alert }: { alert: Alert }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("Why was this flagged?");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    setLoading(true);
    setAnswer("");
    const response = await fetch("/api/ai/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alertId: alert.id, alert, question }),
    });
    const json = (await response.json()) as { explanation?: string; error?: string };
    setAnswer(json.explanation ?? json.error ?? "Velora could not explain this alert.");
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button type="button" variant="outline" />}
      >
        <Sparkles className="size-4" />
        Ask Velora why this was flagged
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ask Velora</DialogTitle>
          <DialogDescription>
            Secondary to the evidence on the alert. Velora explains the decision — it does not replace it.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="min-h-20 bg-ink/5"
        />
        <Button onClick={() => void ask()} disabled={loading}>
          {loading ? "Reviewing evidence…" : "Explain"}
        </Button>
        {answer ? (
          <pre className="whitespace-pre-wrap rounded-xl bg-ink/5 p-4 font-sans text-sm leading-6 text-muted-foreground">
            {answer}
          </pre>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
