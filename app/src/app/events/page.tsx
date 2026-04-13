"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/sidebar";
import { Badge, Button, Card, Input } from "@/components/ui";
import { buildings, events, formatDateTime, type EventStatus, type EventPriority } from "@/lib/mock-data";

export default function EventsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<EventStatus | "all">("all");

  const filtered = events
    .filter((e) => status === "all" || e.status === status)
    .filter((e) => {
      if (!q) return true;
      const s = q.toLowerCase();
      return e.title.toLowerCase().includes(s) || (e.description ?? "").toLowerCase().includes(s);
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const statusFilters: { key: EventStatus | "all"; label: string }[] = [
    { key: "all", label: "Svi" },
    { key: "otvoren", label: "Otvoreni" },
    { key: "u_toku", label: "U toku" },
    { key: "zatvoren", label: "Zatvoreni" },
  ];

  return (
    <>
      <PageHeader
        title="Dnevnik događaja"
        description="Hronološka evidencija kroz sve zgrade."
        actions={<Button variant="primary">+ Novi događaj</Button>}
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="max-w-sm flex-1">
          <Input placeholder="Pretraži događaje…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex gap-1.5">
          {statusFilters.map((s) => (
            <button
              key={s.key}
              onClick={() => setStatus(s.key)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                status === s.key
                  ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                  : "border-[var(--border)] bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((e) => {
          const b = buildings.find((x) => x.id === e.buildingId);
          const statusTone = e.status === "otvoren" ? "warning" : e.status === "u_toku" ? "info" : "success";
          const prioTone: Record<EventPriority, "neutral" | "info" | "warning" | "danger"> = {
            niska: "neutral",
            srednja: "info",
            visoka: "warning",
            hitna: "danger",
          };
          return (
            <Card key={e.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">{e.title}</h4>
                    <Badge tone={statusTone}>{e.status.replace("_", " ")}</Badge>
                    <Badge tone={prioTone[e.priority]}>{e.priority}</Badge>
                  </div>
                  {e.description ? <p className="mt-1.5 text-sm text-gray-700">{e.description}</p> : null}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
                    <Link href={`/buildings/${e.buildingId}`} className="text-blue-600 hover:underline">
                      {b?.name}
                    </Link>
                    <span>Kreiran: {formatDateTime(e.createdAt)}</span>
                    {e.assignedContractor ? <span>Izvođač: {e.assignedContractor}</span> : null}
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
