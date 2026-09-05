import { mkdir, readFile, appendFile } from "node:fs/promises";
import path from "node:path";

export type StoredKind = "leads" | "feedback" | "events" | "orders";

const dataDir = path.join(process.cwd(), "data");

function fileFor(kind: StoredKind) {
  return path.join(dataDir, `${kind}.jsonl`);
}

export async function appendRecord(kind: StoredKind, record: Record<string, unknown>) {
  await mkdir(dataDir, { recursive: true });
  await appendFile(fileFor(kind), `${JSON.stringify(record)}\n`, "utf8");
}

export async function readRecords(kind: StoredKind): Promise<Record<string, unknown>[]> {
  try {
    const raw = await readFile(fileFor(kind), "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Record<string, unknown>);
  } catch {
    return [];
  }
}

export async function forwardToSheet(kind: StoredKind, record: Record<string, unknown>) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return { forwarded: false as const };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, ...record }),
  });

  if (!response.ok) {
    throw new Error(`Sheet webhook ${response.status}`);
  }

  return { forwarded: true as const };
}

export function inboxKeyOk(provided: string | null | undefined) {
  const expected = process.env.VALIDATION_INBOX_KEY;
  if (!expected) return false;
  return Boolean(provided) && provided === expected;
}
