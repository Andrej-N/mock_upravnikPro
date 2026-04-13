"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/sidebar";
import { Badge, Button, Card, Table, TD, TH } from "@/components/ui";
import { buildings, obligations, daysUntil, urgencyLevel, formatDate } from "@/lib/mock-data";

type Filter = "all" | "red" | "yellow" | "green";

export default function ObligationsPage() {
  const [f, setF] = useState<Filter>("all");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("filter");
    if (q === "red" || q === "yellow" || q === "green" || q === "all") setF(q);
  }, []);

  const rows = obligations
    .filter((o) => o.isActive)
    .map((o) => {
      const days = daysUntil(o.nextDueAt);
      return { o, days, level: urgencyLevel(days) };
    })
    .filter((r) => f === "all" || r.level === f)
    .sort((a, b) => a.days - b.days);

  const counts = {
    red: obligations.filter((o) => o.isActive && urgencyLevel(daysUntil(o.nextDueAt)) === "red").length,
    yellow: obligations.filter((o) => o.isActive && urgencyLevel(daysUntil(o.nextDueAt)) === "yellow").length,
    green: obligations.filter((o) => o.isActive && urgencyLevel(daysUntil(o.nextDueAt)) === "green").length,
  };

  const filters: { key: Filter; label: string; count?: number; tone: "neutral" | "danger" | "warning" | "success" }[] = [
    { key: "all", label: "Sve", tone: "neutral" },
    { key: "red", label: `Hitno (${counts.red})`, tone: "danger" },
    { key: "yellow", label: `Uskoro (${counts.yellow})`, tone: "warning" },
    { key: "green", label: `U redu (${counts.green})`, tone: "success" },
  ];

  return (
    <>
      <PageHeader
        title="Servisi i obnove"
        description="Sve obaveze kroz sve zgrade — sortirano po hitnosti."
        actions={<Button variant="primary">+ Nova obaveza</Button>}
      />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {filters.map((x) => (
          <button
            key={x.key}
            onClick={() => setF(x.key)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              f === x.key
                ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                : "border-[var(--border)] bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <Card>
        <Table>
          <thead>
            <tr>
              <TH>Obaveza</TH>
              <TH>Zgrada</TH>
              <TH>Kategorija</TH>
              <TH>Izvršilac</TH>
              <TH>Sledeći rok</TH>
              <TH>Status</TH>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ o, days, level }) => {
              const b = buildings.find((x) => x.id === o.buildingId);
              const tone = level === "red" ? "danger" : level === "yellow" ? "warning" : "success";
              const label =
                days < 0 ? `Kasni ${Math.abs(days)} d` : days === 0 ? "Danas" : `Za ${days} d`;
              return (
                <tr key={o.id} className="hover:bg-gray-50">
                  <TD><span className="font-medium">{o.title}</span></TD>
                  <TD>
                    <Link href={`/buildings/${o.buildingId}`} className="text-blue-600 hover:underline">
                      {b?.name}
                    </Link>
                  </TD>
                  <TD><Badge tone="neutral">{o.category}</Badge></TD>
                  <TD>{o.responsibleSupplier ?? "—"}</TD>
                  <TD>{formatDate(o.nextDueAt)}</TD>
                  <TD><Badge tone={tone}>{label}</Badge></TD>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
