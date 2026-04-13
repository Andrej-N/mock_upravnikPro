"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/sidebar";
import { Badge, Button, Card, Input } from "@/components/ui";
import { buildings, documents, daysUntil, formatDate, formatBytes } from "@/lib/mock-data";

export default function DocumentsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const cats = ["all", "ugovor", "projekat", "garancija", "resenje", "polisa", "ostalo"];

  const filtered = documents.filter((d) => {
    if (cat !== "all" && d.category !== cat) return false;
    if (!q) return true;
    const s = q.toLowerCase();
    return d.title.toLowerCase().includes(s) || d.fileName.toLowerCase().includes(s);
  });

  return (
    <>
      <PageHeader
        title="Dokumenti"
        description="Svi dokumenti kroz sve zgrade."
        actions={<Button variant="primary">+ Upload dokument</Button>}
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="max-w-sm flex-1">
          <Input placeholder="Pretraži dokumente…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                cat === c
                  ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                  : "border-[var(--border)] bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {c === "all" ? "Sve" : c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((d) => {
          const b = buildings.find((x) => x.id === d.buildingId);
          const expDays = d.expiresAt ? daysUntil(d.expiresAt) : null;
          const expTone: "neutral" | "danger" | "warning" | "success" =
            expDays === null ? "neutral" :
            expDays < 0 ? "danger" :
            expDays <= 30 ? "warning" : "success";
          return (
            <Card key={d.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">▤</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{d.title}</div>
                      <div className="mt-0.5 text-xs text-[var(--muted)]">{d.fileName} · {formatBytes(d.fileSizeBytes)}</div>
                    </div>
                    <Badge tone="neutral">{d.category}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <Link href={`/buildings/${d.buildingId}`} className="text-blue-600 hover:underline">{b?.name}</Link>
                    <span className="text-[var(--muted)]">· {formatDate(d.documentDate)}</span>
                    {d.expiresAt ? <Badge tone={expTone}>Ističe: {formatDate(d.expiresAt)}</Badge> : null}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
