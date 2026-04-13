"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/sidebar";
import { Badge, Button, Card, Input } from "@/components/ui";
import { buildings, events, obligations, daysUntil, urgencyLevel } from "@/lib/mock-data";

export default function BuildingsPage() {
  const [q, setQ] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const filtered = buildings.filter((b) => {
    if (!showArchived && b.isArchived) return false;
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      b.name.toLowerCase().includes(s) ||
      b.address.toLowerCase().includes(s) ||
      b.city.toLowerCase().includes(s)
    );
  });

  return (
    <>
      <PageHeader
        title="Zgrade"
        description={`${buildings.filter((b) => !b.isArchived).length} aktivnih zgrada pod upravom`}
        actions={<Button variant="primary">+ Nova zgrada</Button>}
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="max-w-sm flex-1">
          <Input placeholder="Pretraži po nazivu, adresi ili gradu…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} />
          Prikaži arhivirane
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((b) => {
          const openCount = events.filter((e) => e.buildingId === b.id && e.status !== "zatvoren").length;
          const dueSoon = obligations
            .filter((o) => o.buildingId === b.id && o.isActive)
            .map((o) => daysUntil(o.nextDueAt))
            .filter((d) => d <= 30).length;
          const crit = obligations
            .filter((o) => o.buildingId === b.id && o.isActive)
            .map((o) => urgencyLevel(daysUntil(o.nextDueAt)))
            .filter((u) => u === "red").length;

          return (
            <Link key={b.id} href={`/buildings/${b.id}`} className="group">
              <Card className="h-full p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight group-hover:text-blue-700">{b.name}</h3>
                      {b.isArchived ? <Badge tone="neutral">Arhivirana</Badge> : null}
                    </div>
                    <p className="mt-0.5 text-sm text-[var(--muted)]">
                      {b.address}, {b.postalCode} {b.city}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-[var(--muted)]">Jedinice</div>
                    <div className="font-semibold">{b.unitCount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted)]">Ulazi</div>
                    <div className="font-semibold">{b.entranceCount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted)]">Godina</div>
                    <div className="font-semibold">{b.constructionYear ?? "—"}</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {b.hasElevator ? <Badge tone="info">Lift</Badge> : null}
                  {b.hasCentralHeating ? <Badge tone="info">Centralno</Badge> : null}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-3">
                  {crit > 0 ? <Badge tone="danger">{crit} hitno</Badge> : null}
                  {dueSoon > 0 ? <Badge tone="warning">{dueSoon} uskoro</Badge> : null}
                  {openCount > 0 ? <Badge tone="info">{openCount} otvorenih</Badge> : null}
                  {crit === 0 && dueSoon === 0 && openCount === 0 ? (
                    <Badge tone="success">Sve u redu</Badge>
                  ) : null}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-[var(--border)] bg-white py-10 text-center text-sm text-[var(--muted)]">
          Nema rezultata za zadatu pretragu.
        </div>
      ) : null}
    </>
  );
}
